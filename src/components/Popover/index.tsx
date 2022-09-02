/** @jsxImportSource @emotion/react */

import React from 'react';
import { useCSS, useTheme, useFunctionLikeValue } from '../../styles/css';
import { Theme } from '../../styles/themes';
import { Base } from '../props';

type PopoverProps = Base & {
  hover?: boolean;
};
type PopoverContentProps = Base & {
  position?: 'top' | 'left' | 'right' | 'bottom';
  show?: boolean;
};

/**
 * A Popover can be used to display some content on top of another.
 * @param boolean hover
 * @returns Popover
 */
const Popover = ({ hover = false, css, children, ...props }: React.ComponentPropsWithoutRef<'div'> & PopoverProps) => {
  const theme = useTheme() as Theme;
  const [isContentShow, setIsContentShow] = React.useState(false);
  const styles = useCSS({
    position: 'relative',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...useFunctionLikeValue(theme, css),
  });

  const handleChildrenRender = () => {
    return React.Children.map(children, (child: any, i) => {
      const element = child as React.DetailedReactHTMLElement<any, HTMLElement>;
      if (child.type.name == 'PopoverContent') {
        return React.cloneElement(element, {
          show: isContentShow,
        });
      }
      return React.cloneElement(element, {
        ...(hover && {
          onMouseOver: () => {
            setIsContentShow(true);
          },
          onMouseOut: () => {
            setIsContentShow(false);
          },
        }),
        onFocus: () => {
          setIsContentShow(true);
        },
        onBlur: () => {
          setIsContentShow(false);
        },
      });
    });
  };
  return (
    <div css={styles} {...props}>
      {handleChildrenRender()}
    </div>
  );
};
const PopoverContent = ({
  show = false,
  position = 'bottom',
  css,
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & PopoverContentProps) => {
  const theme = useTheme() as Theme;
  const [cp, setCp] = React.useState({});
  const styles = useCSS({
    position: 'absolute',
    ...cp,
    display: show ? 'block' : 'none',

    ...useFunctionLikeValue(theme, css),
  });
  const [usePropsShow, setUsePropsShow] = React.useState(true);
  const handleMouseOver = (e: any) => {
    if (usePropsShow) setUsePropsShow(false);
  };
  const handleMouseOut = (e: any) => {
    setUsePropsShow(true);
  };

  React.useEffect(() => {
    switch (position) {
      case 'top':
        setCp({
          top: 0,
          transform: 'translate3d(0,-105%,0)',
        });
        break;
      case 'left':
        setCp({
          left: 0,
          transform: 'translate3d(-105%,0,0)',
        });
        break;
      case 'bottom':
        setCp({
          bottom: 0,
          transform: 'translate3d(0,105%,0)',
        });
        break;
      case 'right':
        setCp({
          right: 0,
          transform: 'translate3d(105%,0,0)',
        });
        break;
      default:
        break;
    }
  }, [position]);
  return (
    <div
      css={styles}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={'popover-content ' + className}
      {...props}>
      {children}
    </div>
  );
};

Popover.Content = PopoverContent;

export default Popover;
