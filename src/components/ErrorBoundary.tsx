import { Component, PropsWithChildren, ReactNode } from 'react';
import Button from 'components/Button.tsx';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMsg: string | null;
}

/**
 * React 공식 가이드 수정
 * https://ko.legacy.reactjs.org/docs/error-boundaries.html
 */
export class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    errorMsg: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error: Error) {
    console.error('Uncaught error:', error.message);
  }

  render() {
    const { hasError, errorMsg } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <section>
          <div>
            <h6>에러가 발생했습니다!</h6>
            <h6>error : {errorMsg}</h6>
          </div>
          <Button role="link" onClick={() => (window.location.href = '/')}>
            홈으로
          </Button>
        </section>
      );
    }

    return children;
  }
}
