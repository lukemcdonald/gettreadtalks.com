import type { Dispatch } from 'react'
import { useCallback, useLayoutEffect, useRef } from 'react'

function useSafeDispatch(dispatch: Dispatch<any>) {
  const mounted = useRef(false)

  useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  return useCallback((action: any) => (mounted.current ? dispatch(action) : void 0), [dispatch])
}

export { useSafeDispatch }
