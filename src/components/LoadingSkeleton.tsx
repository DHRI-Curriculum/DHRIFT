'use client'

import { Box, Container, Skeleton, Paper } from '@mui/material'

/**
 * Loading skeleton for workshop pages
 */
export function WorkshopSkeleton() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Title skeleton */}
        <Skeleton variant="text" width="60%" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mb: 4 }} />

        {/* Chips skeleton */}
        <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
          <Skeleton variant="rounded" width={100} height={32} />
          <Skeleton variant="rounded" width={120} height={32} />
          <Skeleton variant="rounded" width={80} height={32} />
        </Box>

        {/* Content skeleton */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Sidebar skeleton */}
          <Box sx={{ width: '25%', display: { xs: 'none', md: 'block' } }}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Skeleton variant="text" width="60%" height={30} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="95%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="85%" height={20} sx={{ mb: 1 }} />
            </Paper>
          </Box>

          {/* Main content skeleton */}
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="50%" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="95%" height={20} sx={{ mb: 3 }} />

            <Skeleton variant="rounded" width="100%" height={200} sx={{ mb: 3 }} />

            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="85%" height={20} sx={{ mb: 1 }} />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

/**
 * Loading skeleton for institute page
 */
export function InstituteSkeleton() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 6 }}>
        {/* Header skeleton */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Skeleton variant="text" width="60%" height={60} sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="text" width="40%" height={30} sx={{ mx: 'auto', mb: 1 }} />
          <Skeleton variant="text" width="30%" height={20} sx={{ mx: 'auto' }} />
        </Box>

        {/* Title */}
        <Skeleton variant="text" width="40%" height={40} sx={{ mb: 3 }} />

        {/* Workshop cards grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Paper key={i} elevation={1} sx={{ p: 2 }}>
              <Skeleton variant="text" width="70%" height={30} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={20} />
            </Paper>
          ))}
        </Box>
      </Box>
    </Container>
  )
}
