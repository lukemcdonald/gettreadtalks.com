import { useCallback, useReducer } from 'react'
import type { Nullable } from '~/utils/types/shared'
import { useSafeDispatch } from './safeDispatch'

enum AsyncActionType {
  IDLE = 'idle',
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

interface AsyncState<TData = unknown> {
  data: TData | null
  error: typeof Error | null
  status: AsyncActionType
}

type AsyncReducer<T> = (state: AsyncState<T>, action: AsyncAction<T>) => AsyncState<T>

interface AsyncAction<TData> extends AsyncState<TData> {
  type: AsyncActionType
}

interface AsyncValue<TData = unknown> {
  isIdle: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  data: TData | null
  error: typeof Error | null
  status: AsyncActionType
  run: (promise: any) => void
  setData: (data: AsyncState<TData>['data']) => void
  setError: (error: AsyncState<TData>['error']) => void
}

function asyncReducer<TData>(state: AsyncState<TData>, action: AsyncAction<TData>) {
  switch (action.type) {
    case AsyncActionType.PENDING: {
      return {
        data: null,
        error: null,
        status: AsyncActionType.PENDING,
      }
    }
    case AsyncActionType.RESOLVED: {
      return {
        data: action.data,
        error: null,
        status: AsyncActionType.RESOLVED,
      }
    }
    case AsyncActionType.REJECTED: {
      return {
        data: null,
        error: action.error,
        status: AsyncActionType.REJECTED,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync<TData>(initialData: Nullable<TData> = null): AsyncValue<TData> {
  const initialState: AsyncState<TData> = {
    data: initialData,
    error: null,
    status: AsyncActionType.IDLE,
  }
  const [state, unsafeDispatch] = useReducer<AsyncReducer<TData>>(asyncReducer, initialState)
  const dispatch = useSafeDispatch(unsafeDispatch)

  const setData = useCallback(
    (data: AsyncState<TData>['data']) => dispatch({ type: AsyncActionType.RESOLVED, data }),
    [dispatch],
  )

  const setError = useCallback(
    (error: AsyncState<TData>['error']) => dispatch({ type: AsyncActionType.REJECTED, error }),
    [dispatch],
  )

  const run = useCallback(
    (promise: any) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        )
      }

      dispatch({ type: AsyncActionType.PENDING })

      return promise.then(
        (data: AsyncState<TData>['data']) => {
          setData(data)
        },
        (error: AsyncState<TData>['error']) => {
          setError(error)
        },
      )
    },
    [dispatch, setData, setError],
  )

  return {
    // using the same names that react-query uses for convenience
    isIdle: state.status === AsyncActionType.IDLE,
    isLoading: state.status === AsyncActionType.PENDING,
    isError: state.status === AsyncActionType.REJECTED,
    isSuccess: state.status === AsyncActionType.RESOLVED,

    data: state.data,
    error: state.error,
    status: state.status,
    run,
    setData,
    setError,
  }
}

export { useAsync }
