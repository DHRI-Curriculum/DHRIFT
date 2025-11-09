'use client'

import { useEffect, useRef } from 'react'
import { Box, Paper, Typography, Alert } from '@mui/material'

/**
 * WebVM Terminal - Full Linux environment in the browser
 * Uses CheerpX/WebVM for x86 virtualization with WebAssembly
 */
export function WebVM() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  return (
    <Box sx={{ my: 2 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Linux Terminal (WebVM)
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          This is a full Alpine Linux environment running in your browser via WebAssembly.
          It may take 10-30 seconds to load.
        </Alert>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '600px',
            bgcolor: '#000',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <iframe
            ref={iframeRef}
            src="/webvm/index.html"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title="WebVM Linux Terminal"
          />
        </Box>
      </Paper>
    </Box>
  )
}
