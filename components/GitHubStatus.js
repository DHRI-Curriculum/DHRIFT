import { Alert } from '@mui/material';

export function GitHubStatus({ validationStatus }) {
  if (!validationStatus?.messages?.length) return null;

  return (
    <div style={{ 
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 9999,
      maxWidth: '400px'
    }}>
      {validationStatus.messages.map((message, i) => (
        <Alert 
          key={i}
          severity={validationStatus.isValid ? "success" : "error"}
          sx={{ mb: 1 }}
        >
          {message}
        </Alert>
      ))}
    </div>
  );
}