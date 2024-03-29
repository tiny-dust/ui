/** @jsxImportSource @emotion/react */

import { keyframes, useTheme } from '@emotion/react';
import { Theme } from '../../styles/themes';

import { ComponentBaseProps, Padding } from '../props';
import { useCSS, useThemedCSS } from '../../styles/css';
import { ReactNode } from 'react';

type ListItem = {
  id?: string | number;
  key?: ReactNode;
  avator?: ReactNode;
  title?: ReactNode;
  content?: ReactNode;
  extra?: ReactNode;
};

type ListProps = ComponentBaseProps & {
  divider?: boolean | ReactNode;
  data: ListItem[];
  renderItem?: (item: ListItem) => ReactNode;
  gap?: string;
  innerGap?: string;
};

const List = ({ data, renderItem, gap, innerGap, css, divider, children, ...props }: ListProps) => {
  const theme = useTheme();
  const listStyles = useCSS({
    display: 'flex',
    flexDirection: 'column',
    gap,
  });
  const itemStyles = useCSS({
    display: 'flex',
    alignItems: 'center',
    innerGap,
    borderBottom: divider ? '1px solid #F4F5F7' : '',
    ...useThemedCSS(theme, css),
  });

  const defaulRenderItem = ({ id, avator, title, content, extra }: ListItem) => {
    return (
      <li key={id} css={itemStyles}>
        {avator && (
          <div
            css={useCSS({
              flex: 'none',
            })}>
            {avator}
          </div>
        )}
        {(title || content) && (
          <div
            css={useCSS({
              flex: 'auto',
            })}>
            <div>{title}</div>
            <div>{content}</div>
          </div>
        )}
        {extra && (
          <div
            css={useCSS({
              marginLeft: 'auto',
            })}>
            {extra}
          </div>
        )}
      </li>
    );
  };

  return (
    <ul css={listStyles} {...props}>
      {data.map(v => (renderItem ? renderItem(v) : defaulRenderItem(v)))}
    </ul>
  );
};

export default List;
