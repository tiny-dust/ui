/** @jsxImportSource @emotion/react */

import { Theme } from '../../constants/theme';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTheme, css, keyframes } from '@emotion/react';

type CountDownProps = {
  h?: number;
  m?: number;
  s?: number;
  time?: number;
  label?: React.ReactNode;
  animation?: boolean;
  co?: ((theme: Theme) => React.CSSProperties) | React.CSSProperties;
};

const CountDown = ({
  h = 0,
  m = 0,
  s = 0,
  time = 0,
  label,
  animation,
  co,
  className,
  ...props
}: CountDownProps & React.ComponentPropsWithoutRef<'div'>) => {
  const theme = useTheme() as Theme;
  let end: number = h * 3600 + m * 60 + s;
  let timeEnd: number = time;
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);
  const [num, setNum] = useState(end);
  const [timeNum, setTimeNum] = useState(timeEnd);
  const [ho, setHours] = useState<any>(''); //小时
  const [mi, setMinutes] = useState<any>(''); //分钟
  const [se, setSeconds] = useState<any>(''); //秒
  const [moveS, setMoveS] = useState(s * 1.25);
  useEffect(() => {
    let timer: any;
    timer = 0;
    if (num !== 0) {
      timer = setInterval(() => {
        setNum(n => {
          let hours =
            Math.floor((n / 60 / 60) % 24) < 10 ? `0${Math.floor((n / 60 / 60) % 24)}` : Math.floor((n / 60 / 60) % 24);
          let minutes = Math.floor(n / 60);
          // let minutes = Math.floor((n / 60) % 60) < 10 ? `0${Math.floor((n / 60) % 60)}` : Math.floor((n / 60) % 60)
          let seconds = Math.floor(n % 60) < 10 ? `0${Math.floor(n % 60)}` : Math.floor(n % 60);
          setHours(() => hours);
          setMinutes(() => minutes);
          setSeconds(() => seconds); //函数写法保证值在setInterval里更新，避免useEffect的bug
          setLoading(true);
          setStart(true);
          if (n === 0) {
            setStart(false);
            setMoveS(0);
            clearInterval(timer);
          }
          return n - 1;
        });
      }, 1000);
    }
    if (timeNum !== 0) {
      timer = setInterval(() => {
        setTimeNum(n => {
          let hours =
            Math.floor((n / 60 / 60) % 24) < 10 ? `0${Math.floor((n / 60 / 60) % 24)}` : Math.floor((n / 60 / 60) % 24);
          let minutes = Math.floor((n / 60) % 60) < 10 ? `0${Math.floor((n / 60) % 60)}` : Math.floor((n / 60) % 60);
          let seconds = Math.floor(n % 60) < 10 ? `0${Math.floor(n % 60)}` : Math.floor(n % 60);
          setHours(() => hours);
          setMinutes(() => minutes);
          setSeconds(() => seconds); //函数写法保证值在setInterval里更新，避免useEffect的bug
          setLoading(true);
          setStart(true);
          if (n === 0) {
            clearInterval(timer);
            setMoveS(0);
            setStart(false);
          }
          return n - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, []);

  const move = keyframes({
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  });
  const styles = css({
    display: 'flex',
    ...(typeof co == 'function' ? co(theme) : co),
    '.text': {
      marginLeft: '5px',
      marginTop: '-1px',
    },
    '.circle': {
      border: `9px solid ${theme.color.greyLight}`,
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      '.slice': {
        overflow: 'hidden',
        width: '50%',
        border: 'solid 9px transparent',
        borderRightColor: `${theme.color.primary}`,
        borderRadius: '50%',
        animation: `${move} ${moveS}s linear infinite`,
        position: 'relative',
        top: '-8.9px',
        left: '-8.9px',
        transform: 'rotate(-44deg)',
      },
      '.noslice': {
        overflow: 'hidden',
        width: '50%',
        border: 'solid 9px transparent',
        borderRightColor: `${theme.color.primary}`,
        borderRadius: '50%',
        animation: `${move} ${moveS}s linear infinite`,
        position: 'relative',
        top: '-8.9px',
        left: '-8.9px',
        transform: 'rotate(-44deg)',
      },
    },
  });
  const computedClassNames = clsx(className);
  return animation ? (
    <div css={styles} className={computedClassNames} {...props}>
      <div className={`circle`}>
        <div className={!start ? `circle noslice` : `circle slice`} />
      </div>
      {!loading ? <div className='text'>{label}</div> : <div className={`text`}>{`${mi}:${se}`}</div>}
    </div>
  ) : (
    <div>{!loading ? label : <span>{`${mi}:${se}`}</span>}</div>
  );
};
export default CountDown;
