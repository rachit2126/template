import React from 'react';
import { RefreshCw, RotateCcw, AlertTriangle } from 'lucide-react';
import { DEFAULT_STORY_CONFIG } from './StoryPages';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Memory Vault ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    try {
      localStorage.removeItem('memory_vault_story');
    } catch (e) {}
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          width: '100vw',
          background: '#0F172A',
          color: '#F8FAFC',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          textAlign: 'center'
        }}>
          <div style={{
            background: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '16px',
            padding: '32px 24px',
            maxWidth: '480px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
          }}>
            <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '8px', color: '#FFF' }}>
              Story Builder Recovery
            </h2>
            <p style={{ fontSize: '0.75rem', color: '#F87171', background: '#0F172A', padding: '8px 12px', borderRadius: '6px', marginBottom: '16px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
              {this.state.error?.toString() || 'Unknown Error'}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '24px' }}>
              An unexpected issue occurred while rendering. You can reload or reset to default story data.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={this.handleReload}
                style={{
                  background: '#334155',
                  color: '#FFF',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RefreshCw className="w-4 h-4" /> Reload Page
              </button>

              <button
                onClick={this.handleReset}
                style={{
                  background: '#10B981',
                  color: '#FFF',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RotateCcw className="w-4 h-4" /> Reset Story Data
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
