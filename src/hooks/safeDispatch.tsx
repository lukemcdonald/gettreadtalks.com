import type { Dispatch } from 'react'
import { useCallback, useLayoutEffect, useRef } from 'react'

import type { TAny } from '~/utils/types/shared'

function useSafeDispatch(dispatch: Dispatch<TAny>) {
  const mounted = useRef(false)

  useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  return useCallback((action: TAny) => (mounted.current ? dispatch(action) : void 0), [dispatch])
}

export { useSafeDispatch }
