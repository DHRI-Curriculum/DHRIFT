import { createContext, useRef, useState } from 'react'

export const PyodideContext = createContext()

export default function PyodideProvider({ children }) {
  const pyodide = useRef(null)
  const hasLoadPyodideBeenCalled = useRef(false)
  const [isPyodideLoading, setIsPyodideLoading] = useState(true)
  const [isPyodideReady, setIsPyodideReady] = useState(false)

  return (
    <PyodideContext.Provider
      value={{
        pyodide,
        hasLoadPyodideBeenCalled,
        isPyodideLoading,
        setIsPyodideLoading,
        isPyodideReady,
        setIsPyodideReady,
      }}
    >
      {children}
    </PyodideContext.Provider>
  )
}