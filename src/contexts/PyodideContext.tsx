'use client'

import React, { createContext, useContext, useRef, useState, useCallback } from 'react'

export type PyodideInstance = any // Type from pyodide package

interface PyodideContextValue {
  pyodide: PyodideInstance | null
  isLoading: boolean
  error: string | null
  initializePyodide: () => Promise<PyodideInstance>
  executePython: (code: string, namespace?: string) => Promise<string>
}

const PyodideContext = createContext<PyodideContextValue | undefined>(undefined)

export function PyodideProvider({ children }: { children: React.ReactNode }) {
  const pyodideRef = useRef<PyodideInstance | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const initPromiseRef = useRef<Promise<PyodideInstance> | null>(null)

  // Store namespace-specific globals to isolate REPL state
  const namespacesRef = useRef<Map<string, Record<string, any>>>(new Map())

  const initializePyodide = useCallback(async (): Promise<PyodideInstance> => {
    // If already initialized, return existing instance
    if (pyodideRef.current) {
      return pyodideRef.current
    }

    // If currently loading, return the existing promise
    if (initPromiseRef.current) {
      return initPromiseRef.current
    }

    // Start new initialization
    console.log('[PyodideContext] Starting Pyodide initialization...')
    setIsLoading(true)
    setError(null)

    const promise = (async () => {
      try {
        // Check if loadPyodide is available globally
        if (typeof globalThis.loadPyodide !== 'function') {
          throw new Error('Pyodide not loaded. Make sure the script tag is in layout.tsx')
        }

        const pyodide = await globalThis.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
        })

        pyodideRef.current = pyodide
        console.log('[PyodideContext] Pyodide initialized successfully')
        setIsLoading(false)
        return pyodide
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load Pyodide'
        console.error('[PyodideContext] Initialization error:', err)
        setError(errorMessage)
        setIsLoading(false)
        initPromiseRef.current = null
        throw err
      }
    })()

    initPromiseRef.current = promise
    return promise
  }, [])

  const executePython = useCallback(
    async (code: string, namespace = 'default'): Promise<string> => {
      // Ensure Pyodide is initialized
      const pyodide = pyodideRef.current || (await initializePyodide())

      try {
        // Get or create namespace globals
        if (!namespacesRef.current.has(namespace)) {
          namespacesRef.current.set(namespace, {})
        }
        const namespaceGlobals = namespacesRef.current.get(namespace)!

        // Execute code in isolated namespace
        const result = await pyodide.runPythonAsync(code, {
          globals: namespaceGlobals,
        })

        // Convert result to string
        if (result === undefined || result === null) {
          return ''
        }
        return String(result)
      } catch (err) {
        // Format Python errors nicely
        if (err instanceof Error) {
          return `Error: ${err.message}`
        }
        return `Error: ${String(err)}`
      }
    },
    [initializePyodide]
  )

  const value: PyodideContextValue = {
    pyodide: pyodideRef.current,
    isLoading,
    error,
    initializePyodide,
    executePython,
  }

  return <PyodideContext.Provider value={value}>{children}</PyodideContext.Provider>
}

export function usePyodide() {
  const context = useContext(PyodideContext)
  if (context === undefined) {
    throw new Error('usePyodide must be used within a PyodideProvider')
  }
  return context
}
