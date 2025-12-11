import React, { ReactNode, ErrorInfo } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// Error Boundary untuk menangkap error runtime (mencegah layar putih)
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', color: '#333' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#dc2626' }}>
            Terjadi Kesalahan (Application Error)
          </h1>
          <p style={{ marginBottom: '20px' }}>
            Aplikasi mengalami crash saat memuat. Kemungkinan masalah konfigurasi atau browser.
          </p>
          <div style={{ background: '#f1f5f9', padding: '20px', borderRadius: '8px', overflowX: 'auto', marginBottom: '20px' }}>
            <p style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{this.state.error?.toString()}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '10px 20px', background: '#0f172a', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
          >
            Refresh Halaman
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);