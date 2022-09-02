import React, { CSSProperties } from 'react';
import { css, CSSObject } from '@emotion/react';
import { Theme } from '../styles/themes';

export type CSS = Parameters<typeof css>;
export type ColorFormat = 'rgb' | 'rgba' | 'hsl' | 'hsla';
export type Themed<T> = ((theme: Theme) => T) | T;

export type Padding = Partial<{
  pt: string;
  pb: string;
  pl: string;
  pr: string;
  px: string;
  py: string;
  pa: string;
}>;

export type Margin = Partial<{
  mt: string;
  mb: string;
  ml: string;
  mr: string;
  mx: string;
  my: string;
  ma: string;
}>;

export type Position = Partial<{
  relative: boolean;
  absolute: boolean;
  fixed: boolean;
  sticky: boolean;
  static: boolean;
}>;
export type Radius = Partial<{
  radius: number;
}>;
export type Base = Partial<{
  onClick: () => any;
  className: string;
  children: React.ReactNode;
  css: Themed<CSSObject>;
}>;

export interface ColorObject {
  type: ColorFormat;
  values: any[];
}
