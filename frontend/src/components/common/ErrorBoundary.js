import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
          <ErrorOutline sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" onClick={this.handleReset}>
              Try Again
            </Button>
            <Button variant="outlined" onClick={this.handleReload}>
              Reload Page
            </Button>
          </Box>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box sx={{ mt: 4, p: 2, backgroundColor: 'grey.100', borderRadius: 1, textAlign: 'left' }}>
              <Typography variant="h6" gutterBottom>
                Error Details (Development)
              </Typography>
              <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontSize: '0.75rem' }}>
                {this.state.error.toString()}
                {this.state.errorInfo.componentStack}
              </Typography>
            </Box>
          )}
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;