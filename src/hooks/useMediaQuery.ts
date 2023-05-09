import { useCallback, useEffect, useState } from 'react'

export const useMediaQuery = () => {
  const [size, setSize] = useState<SIZES | undefined>(window.matchMedia('(max-width: 639px)').matches ? 'sm' : undefined)

  const detectSize = useCallback(() => {
    if (!window.matchMedia('(max-width: 639px)').matches) {
      setSize('md')
    } else {
      setSize('sm')
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', detectSize)
    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [])

  return size
}