/** @jsxImportSource @emotion/react */
import clsx from 'clsx';
import { css, useTheme } from '@emotion/react';
import { Theme } from '../../constants/theme';
import * as React from 'react';
import { fade } from '../../constants/style';

type OverlayProps = Partial<{
  color: string;
  show: boolean;
  blur: boolean;
  opacity: number;
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  co: ((theme: Theme) => React.CSSProperties) | React.CSSProperties;
  className: string;
}>;

const Overlay = ({
  opacity = 0.4,
  blur = false,
  color,
  show = false,
  children,
  onClick,
  co,
  className,
}: OverlayProps) => {
  const theme = useTheme() as Theme;
  const styles = css({
    display: show ? 'flex' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: fade(color || theme?.color?.greyLight || '#F3F4F6', opacity),
    backdropFilter: blur ? 'blur(4px)' : '',
    transform: show ? 'scale(1)' : '',
    '& > *': {
      margin: 'auto',
    },

    ...(typeof co == 'function' ? co(theme) : co),
  });
  const computedOverlayClassNames = clsx(className);
  const handleClickOverlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick?.(e);
  };
  return (
    <aside css={styles} className={computedOverlayClassNames} onClick={handleClickOverlay}>
      {children}
    </aside>
  );
};

export default Overlay;
