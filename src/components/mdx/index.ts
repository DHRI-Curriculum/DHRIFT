/**
 * Export all custom MDX components
 *
 * Components with error boundaries are exported as default.
 * Base components without boundaries are also available for direct use.
 */

export { Info } from './Info'
export { Secret } from './Secret'
export { Quiz, QuizWithErrorBoundary } from './Quiz'
export { Keywords, KeywordsWithErrorBoundary } from './Keywords'
export { PythonREPL } from './PythonREPL'
export { RREPL } from './RREPL'
export { CodeEditor } from './CodeEditor'
export { Terminal } from './Terminal' // Simple simulated terminal
export { CommandLine } from './CommandLine' // Enhanced bash simulation with history
export { JSTerminal } from './JSTerminal' // JavaScript execution via jquery.terminal
export { WebVM } from './WebVM' // Full Linux via WASM (CheerpX)
export { Jupyter } from './Jupyter' // JupyterLite integration
export { Download } from './Download'
export { Link } from './Link'
export { ImageZoom, img } from './ImageZoom'

// Error boundary component for manual wrapping
export { ComponentErrorBoundary, ErrorFallback } from '../ComponentErrorBoundary'
