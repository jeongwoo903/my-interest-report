import { Component, PropsWithChildren, ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import Space from 'components/Space.tsx';
import Button from 'components/Button.tsx';
import ErrorIcon from 'assets/svg/error-icon.svg?react';

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
        <section css={errorCss}>
          <div css={errorContentCss}>
            <div css={errorTitleCss}>
              <ErrorIcon />
              <h6>에러가 발생했어요!</h6>
            </div>
            <Space size={12} />
            {errorMsg && (
              <div css={errorDescCss}>
                <p>--- 에러 사유 ----</p>
                <p>{errorMsg}</p>
              </div>
            )}
            <Space size={26} />
            <div css={errorToolcss}>
              <Button role="link" onClick={() => (window.location.href = '/')}>
                홈으로
              </Button>
            </div>
          </div>
        </section>
      );
    }

    return children;
  }
}

const errorCss = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100dvh - ${theme.layout.header_height});
`;

const errorContentCss = css`
  padding: 0 1rem;
`;

const errorTitleCss = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  > svg {
    transform: scale(1.5);
  }

  > h6 {
    ${theme.typography.title1};
    font-weight: 500;
    color: ${theme.color.black};
  }
`;

const errorDescCss = (theme: Theme) => css`
  ${theme.typography.caption1};
  max-width: 300px;
  text-align: center;
  color: ${theme.color.subText};
  font-weight: 200;
`;

const errorToolcss = css`
  width: fit-content;
  margin: 0 auto;
`;
