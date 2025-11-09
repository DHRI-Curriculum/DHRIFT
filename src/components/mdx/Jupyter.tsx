'use client'

import { Box, Paper, Typography, Alert, Button } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { useState } from 'react'

interface JupyterProps {
  notebook?: string
  height?: string | number
}

/**
 * Jupyter notebook component
 * Can either embed JupyterLite or link to external notebooks
 */
export function Jupyter({ notebook, height = '600px' }: JupyterProps) {
  const [mode, setMode] = useState<'embed' | 'link'>('embed')

  // JupyterLite base URL (can be hosted separately or use public instance)
  const jupyterLiteUrl = 'https://jupyter.org/try-jupyter/lab/'

  return (
    <Box sx={{ my: 2 }}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2">
            Jupyter Notebook
          </Typography>
          <Button
            size="small"
            startIcon={<OpenInNewIcon />}
            onClick={() => window.open(jupyterLiteUrl, '_blank')}
          >
            Open in New Tab
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 2 }}>
          This embeds JupyterLite - a full Jupyter environment running in your browser via WebAssembly.
          First load may take 30-60 seconds.
        </Alert>

        {mode === 'embed' ? (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height,
              bgcolor: '#fff',
              borderRadius: 1,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <iframe
              src={jupyterLiteUrl}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="JupyterLite"
              sandbox="allow-scripts allow-same-origin allow-downloads"
            />
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<OpenInNewIcon />}
              onClick={() => window.open(jupyterLiteUrl, '_blank')}
            >
              Launch Jupyter
            </Button>
          </Box>
        )}

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Powered by JupyterLite - runs entirely in your browser, no server needed
        </Typography>
      </Paper>
    </Box>
  )
}
