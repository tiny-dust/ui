/** @jsxImportSource @emotion/react */

import * as React from 'react';
import { Base } from '../props';
import { useCSS, useTheme, useFunctionLikeValue } from '../../styles/css';
import { Theme } from '../../styles/themes';
type TextareaProps = Base & {
  showCount?: boolean | ((length: number, maxLength?: number) => React.ReactNode);
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

/**
 * The <textarea> HTML element represents a multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text, for example a comment on a review or feedback form.
 * @param props React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
 * @returns Textarea
 */
const Textarea = ({
  css,
  showCount,
  className,
  onChange,
  ...props
}: Omit<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'onChange'> &
  TextareaProps) => {
  const theme = useTheme() as Theme;
  const styles = useCSS({
    width: '100%',
    padding: '12px',
    backgroundColor: theme.mode == 'light' ? theme.color.greyLight : theme.color.white,
    color: theme.mode == 'light' ? theme.color.black : theme.color.white,
    ...useFunctionLikeValue(theme, css),
  });

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value, e);
  };

  return <textarea {...props} css={styles} className={className} onChange={handleTextAreaChange} />;
};

export default Textarea;
