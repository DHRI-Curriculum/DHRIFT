import { Container, Typography, Box, Button } from '@mui/material'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The workshop or page you&apos;re looking for doesn&apos;t exist.
        </Typography>
        <Button
          component={Link}
          href="/inst"
          variant="contained"
          size="large"
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  )
}
