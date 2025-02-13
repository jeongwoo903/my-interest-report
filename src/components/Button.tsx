import { css, Theme } from '@emotion/react';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import THEME from 'styles/Theme/tokens/theme.ts';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
}

export default function Button({ children, disabled = false, ...rest }: ButtonProps) {
  return (
    <button css={buttonCss(disabled, THEME)} {...rest}>
      {children}
    </button>
  );
}

const buttonCss = (disabled: boolean, theme: Theme) => css`
  ${theme.typography.title3}
  padding: 9px 22px;
  border-radius: 4px;
  color: white;
  font-weight: 400;
  background-color: ${disabled ? '#888' : theme.color.primary};
  box-shadow: 0 0 4px ${theme.color.boxShadow};

  &:hover {
    filter: brightness(90%);
  }
`;
