import { useState, useEffect } from 'react'

function getSize(el) {
  if (!el) {
    return {
      width: 0,
      height: 0,
    }
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  }
}

function useComponentSize(ref) {
  const [componentSize, setComponentSize] = useState(getSize(ref.current))

  useEffect(() => {
    if (!ref.current) { return null }
    setComponentSize(getSize(ref.current))
  }, [ref.current])

  return componentSize
}

export default useComponentSize
