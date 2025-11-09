'use client'

import { Box, LinearProgress, Typography } from '@mui/material'

interface ProgressBarProps {
  current: number
  total: number
}

/**
 * Progress bar component
 * Shows workshop completion progress
 */
export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        <Box sx={{ flex: 1, mr: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {current} / {total}
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">
        {Math.round(progress)}% complete
      </Typography>
    </Box>
  )
}
