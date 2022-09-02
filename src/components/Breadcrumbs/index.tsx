/** @jsxImportSource @emotion/react */

import { Theme } from '../../styles/themes';
import { Base, Themed } from '../props';

import { useFunctionLikeValue, useCSS, useTheme } from '../../styles/css';

type BreadcrumbsItem = Base &
  Partial<{
    link: boolean;
    title: string;
    onClick: () => any;
  }>;
type BreadcrumbsProps = Base &
  Partial<{
    divider: React.ReactNode;
    items: BreadcrumbsItem[];
  }>;

const Breadcrumbs = ({ divider = '/', items = [], className, css }: BreadcrumbsProps) => {
  const theme = useTheme() as Theme;
  const sliderStyles = useCSS({
    display: 'inline-flex',
    alignItems: 'center',
    '& > *': {
      display: 'inline-flex',
    },
    ...useFunctionLikeValue(theme, css),
  });

  return (
    <nav css={sliderStyles} className={'breadcrumbs ' + className}>
      {items.map((v, i) => {
        return (
          <div key={v.title}>
            <div onClick={v?.onClick}>{v.title}</div>
            {i != items.length - 1 &&
              (typeof divider == 'string' ? (
                <div
                  style={{
                    margin: '0em .4em',
                  }}>
                  {divider}
                </div>
              ) : (
                divider
              ))}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
