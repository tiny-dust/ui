/** @jsxImportSource @emotion/react */

import * as React from 'react';
import { ComponentBaseProps } from '../props';
import { useCSS, useTheme, useThemedCSS } from '../../styles/css';
import { Theme } from '../../styles/themes';
type TimePickerProps = ComponentBaseProps &
  Partial<{
    min: string;
    max: string;
    onChange: (time: any) => any;
  }>;

const TimePicker = ({
  min,
  max,
  onChange,
  children,
  css,
  ...props
}: React.ComponentPropsWithoutRef<'label'> & TimePickerProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const theme = useTheme();
  const styles = useCSS({
    ...useThemedCSS(theme, css),
  });
  return (
    <label css={styles} {...props}>
      <input min={min} max={max} hidden={!!children} type='time' onChange={handleChange} />
      {children}
    </label>
  );
};

export default TimePicker;
