/** @jsxImportSource @emotion/react */

import clsx from 'clsx';
import { css, useTheme } from '@emotion/react';
import { Theme } from '../../constants/theme';
import React, { ReactNode, useState } from 'react';
import { Step, StepProps } from './Step';

type StepsProps = {
  type?: 'default' | 'navigation';
  className?: string;
  current?: number;
  direction?: 'horizontal' | 'vertical';
  iconPrefix?: string;
  initial?: number;
  labelPlacement?: 'horizontal' | 'vertical';
  prefixCls?: string;
  responsive?: boolean;
  size?: 'default' | 'small';
  status?: 'wait' | 'process' | 'finish' | 'error';
  children?: ReactNode;
  dashed?: boolean;
  co?: ((theme: Theme) => React.CSSProperties) | React.CSSProperties;
  onChange?: ((num: any) => void) | undefined;
};

const Steps = ({
  co,
  className,
  current = 0,
  direction = 'horizontal',
  initial = 0,
  labelPlacement = 'horizontal',
  children,
  dashed = false,
  onChange,
  ...props
}: StepsProps & React.ComponentPropsWithoutRef<'div'>) => {
  const theme = useTheme() as Theme;
  const color = theme.color.primary;
  let n: number = 0;
  const styles = css({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    '& .icon': {
      position: 'relative',
      boxSizing: 'border-box',
      top: -4,
    },
    '& .circle': {
      width: 25,
      height: 25,
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: '50%',
      position: 'absolute',
      left: -8,
      top: -4,
    },
    '& .wait': {
      borderColor: 'gray',
    },
    '& .finish': {
      borderColor: color,
    },
    '& .process': {
      borderColor: color,
    },
    '& .error': {
      borderColor: 'red',
    },
    '& .text-finish': {
      color: color,
    },
    '& .text-process': {
      color: color,
    },
    '& .text-wait': {
      color: 'gray',
    },
    '& .text-error': {
      color: 'red',
    },
    '& .text-pos': {
      position: 'absolute',
      top: '-3px',
    },
    ...(typeof co == 'function' ? co(theme) : co),
  });
  const computedClassNames = clsx(className);
  const handleClick = ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => {
    if (currentTarget) {
      n = Number(currentTarget.value) + 1;
      onChange?.(n);
    }
  };
  const nat = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    const props = child.props as StepProps;
    let status = props.status || 'wait';
    let isDashed = props.isDashed || dashed;
    if (index + 1 < current) {
      status = props.status || 'finish';
    } else if (index + 1 === current) {
      status = props.status || 'process';
    }

    const icon =
      props.icon ??
      (onChange ? (
        <button className={`circle ${status}`} value={index} onClick={handleClick}>
          <span className={`text-${status}`}>{index + 1}</span>
        </button>
      ) : (
        <label>
          <span className={`circle ${status}`} />
          <span className={`text-${status} text-pos`}>{index + 1}</span>
        </label>
      ));
    return React.cloneElement(child, {
      status,
      icon,
      isDashed,
    });
  });
  return (
    <div css={styles} className={computedClassNames} {...props}>
      {nat}
    </div>
  );
};
Steps.Step = Step;
export default Steps;