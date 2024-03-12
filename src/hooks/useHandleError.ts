import { useEffect } from 'react'

interface Params {
  onError: ({ error }: ErrorEvent) => void
}

export const useHandleError = ({ onError }: Params) => {
  useEffect(() => {
    window.addEventListener('error', onError)
    return () => window.removeEventListener('error', onError)
  }, [onError])
}
