/** @jsxImportSource @emotion/react */

import { Theme } from '../../styles/themes';
import vars from '../../styles/vars';
import { useMemo } from 'react';
import { Base } from '../props';
import { useFunctionLikeValue, useTheme, useCSS } from '../../styles/css';

type LinkProps = Base & {
  indicatorColor?: string;
  indicatorSize?: string;
  indicatorAction?: 'always' | 'none' | 'hover';
  textColor?: string;
  blank?: boolean;
  disabled?: boolean;
  backTop?: boolean;
  to?: string;
  download?: string;
};

/**
 * @description
 * Links allow users to navigate to a different location. 
 * 
 * They can be presented inline inside a paragraph or as standalone text.
 * @examples
 * ```
 * <Link href='#' indicatorAction='none' color='green'>
      customr link
   </Link>
 * ```
 * 
 * @param indicatorColor link's underline color.
 * @param textColor link's text color.
 * @param indicatorAction link's underline triger way.
 * @param indicatorSize link's underline coarseness.
 * @param blank open url with new window.
 * @param backTop click to return the top of page.
 * @param download change open way to download & set file name by download value.
 * @param to destination url.
 * @returns <a> tag 
 */
const Link = ({
  disabled,
  indicatorColor,
  indicatorAction = 'always',
  textColor,
  blank = false,
  to,
  indicatorSize = '1px',
  css,
  backTop,
  children,
  ...props
}: LinkProps) => {
  const theme = useTheme() as Theme;
  const memoedIndicatorStyles = useMemo(
    () =>
      indicatorAction == 'always'
        ? {
            borderBottom: `${indicatorSize} solid 
        ${indicatorColor || (theme ? theme.color.black : vars.color.black)}`,
          }
        : indicatorAction == 'hover'
        ? {
            ':hover': {
              borderBottom: `${indicatorSize} solid 
        ${indicatorColor || (theme ? theme.color.black : vars.color.black)}`,
            },
          }
        : {},
    [indicatorSize, indicatorColor, indicatorAction],
  );

  const styles = useCSS({
    cursor: !disabled ? 'pointer' : 'initial',
    color: textColor || (theme ? theme.color.black : vars.color.black),
    ...memoedIndicatorStyles,
    opacity: disabled ? 0.25 : 1,
    ...useFunctionLikeValue(theme, css),
  });

  return (
    <a {...(!disabled && { target: blank ? '_blank' : '_self', href: backTop ? '#' : to })} css={styles} {...props}>
      {children}
    </a>
  );
};

export default Link;
