/** @jsxImportSource @emotion/react */

import { useState, ReactNode, useLayoutEffect, useRef, ReactEventHandler, SyntheticEvent } from 'react';
import { Theme } from '../../styles/themes';
import { Base, Themed } from '../props';

import { useFunctionLikeValue, useCSS, useTheme } from '../../styles/css';

type ImageProps = Base & {
  mask?: ReactNode;
  circle?: boolean;
  lazy?: boolean;
  cover?: boolean;
  scale?: boolean;
  contain?: boolean;
  backdropFilter?: string;
  width?: string;
  loadingImg?: ReactNode;
  errorImg?: ReactNode;
  onError?: ReactEventHandler<HTMLImageElement>;
  onLoad?: ReactEventHandler<HTMLImageElement>;
  height?: string;
};
const Image = ({
  circle = false,
  mask,
  lazy = true,
  cover,
  scale,
  contain,
  width = '100%',
  errorImg,
  backdropFilter,
  height,
  onError,
  onLoad,
  css,
  loadingImg,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'img'>, 'onLoad' | 'onError'> & ImageProps) => {
  const ref = useRef(null);
  const theme = useTheme() as Theme;
  const [loadingState, setLoadingState] = useState<'error' | 'success' | 'loading'>('loading');
  const styles = useCSS({
    verticalAlign: 'middle',
    background: 'transparent',
    borderRadius: ((circle as boolean) && '50%') || '',
    objectFit: (cover && 'cover') || (scale && 'scale-down') || (contain && 'contain') || 'initial',
    width: width,
    imageRendering: 'initial',
    imageOrientation: 'initial',
    height: height,
    ...useFunctionLikeValue(theme, css),
  });

  const containerStyles = useCSS({
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  });

  const maskStyles = useCSS({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    inset: 0,
    backdropFilter,
  });
  const handleImgLoadError = (e: SyntheticEvent<HTMLImageElement>) => {
    setLoadingState('error');
    onError && onError(e);
  };
  const handleImgLoadFinish = (e: SyntheticEvent<HTMLImageElement>) => {
    onLoad && onLoad(e);
  };

  useLayoutEffect(() => {
    (ref.current as any).complete && setLoadingState('success');
  }, [ref.current]);

  const img = (
    <img
      ref={ref}
      onError={handleImgLoadError}
      onLoad={handleImgLoadFinish}
      css={styles}
      loading={(lazy && 'lazy') || 'eager'}
      {...props}
    />
  );

  const renderRightImg = () => {
    return (
      <div css={containerStyles}>
        {loadingState == 'loading' && loadingImg}
        {loadingState == 'error' ? errorImg : img}
        {loadingState == 'success' && mask && <div css={maskStyles}>{mask}</div>}
      </div>
    );
  };

  return renderRightImg();
};

export default Image;
