/** @jsxImportSource @emotion/react */

import clsx from 'clsx';
import { css, useTheme } from '@emotion/react';
import { Theme } from '../../constants/theme';
import * as React from 'react';

type DividerProps = Partial<{
  size: number;
  vertical: boolean;
  color: string;
  doubleLine: boolean;
  dashed: boolean;
  className: string;
  co: ((theme: Theme) => React.CSSProperties) | React.CSSProperties;
}>;

/**
 * A divider is a thin line that groups content in lists and layouts.
 * common renders as an <hr> by default.
 *
 * example:
 * ```js
 * <Divider color="red" size={6} />
 * ```
 * main props:
 * @param size Thickness of dividing line.
 */
const Divider = ({
  size = 1,
  vertical = false,
  dashed = false,
  doubleLine = false,
  color,
  co,
  className,
  ...props
}: DividerProps) => {
  const theme = useTheme() as Theme;
  // Use border properties in different positions to easily and concisely simulate dividing lines
  const styles = css({
    border: 'none',
    ...(vertical
      ? {
          display: 'inline',
          borderLeft: `${size}px ${dashed ? 'dashed' : 'solid'}  ${
            color || (theme.mode == 'light' ? theme.color.greyLight : theme.color.grey)
          }`,
        }
      : {
          borderTop: `${size}px ${dashed ? 'dashed' : 'solid'}  ${
            color || (theme.mode == 'light' ? theme.color.greyLight : theme.color.grey)
          }`,
        }),
    ...(co && (typeof co == 'function' ? co(theme) : co)),
  });
  return <hr css={styles} className={clsx(className)} {...props} />;
};

export default Divider;
