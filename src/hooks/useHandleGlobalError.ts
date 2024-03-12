import { useEffect } from 'react'

interface Params {
  onError: ({ error }: ErrorEvent) => void
}

export const useHandleGlobalError = ({ onError }: Params) => {
  useEffect(() => {
    window.addEventListener('error', onError)
    return () => window.removeEventListener('error', onError)
  }, [onError])
}
