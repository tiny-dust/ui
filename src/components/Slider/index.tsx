/** @jsxImportSource @emotion/react */
/**
 * In webkit based browsers, the track is styled with a special pseudo selector ::-webkit-slider-runnable-track, and the thumb with ::webkit-slider-thumb.
 */
import { css, useTheme } from '@emotion/react';
import { memo } from 'react';
import { Theme } from '../../styles/themes';
import { Base } from '../props';

type SliderProps = Base & {
  disable?: boolean;
  defaultValue?: number;
  step?: number;
  value?: string;
  onChange?: (value: string) => void;
  max?: number;
  min?: number;
  trackColor?: string;
  thumbColor?: string;
  trackSize?: number;
  thumbSize?: number;
};

const Slider = ({
  max = 1,
  min = 0,
  step = 0.05,
  value,
  defaultValue = 0.3,
  onChange,
  trackColor,
  thumbColor,
  trackSize = 10,
  thumbSize = 20,
  ...props
}: SliderProps) => {
  console.log('slider update');
  const theme = useTheme() as Theme;

  const handleOnChange = (e: { target: { value: string } }) => {
    onChange?.(e.target.value);
  };

  const thumbDefaultStyles = `
  display:relative;
    width: ${thumbSize}px;
    border-radius: 50%;
    box-shadow: 0px 0px 2px 0px ${theme.color.black};
    background: ${thumbColor || theme.color.white};
    height: ${thumbSize}px;
    margin-top: -${(thumbSize - trackSize) / 2}px;
    &::after:
    `;

  const trackDefaultStyles = `
    height: ${trackSize}px;
    background: linear-gradient(to right, ${theme.color.primary}, ${theme.color.primary}), ${theme.color.grey};
    background-size: ${(Number(value) / max) * 100}%, 100%;
    background-repeat: no-repeat;
    border-radius: 16px;`;

  const sliderStyles = css`
    input[type='range'] {
      -webkit-appearance: none;
      -moz-appearance: none;
      outline: none;
      border: none;
      cursor: pointer;
      display: block;
      width: 100%;
    }

    input[type='range']::-webkit-slider-runnable-track {
      ${trackDefaultStyles}
    }

    input[type='range']::-moz-range-track {
      ${trackDefaultStyles}
    }

    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      ${thumbDefaultStyles}
    }

    input[type='range']::-moz-range-thumb {
      -moz-appearance: none;
      ${thumbDefaultStyles}
    }

    input[type='range']:focus {
      outline: none;
    }

    input[type='range']:focus::-moz-range-thumb {
    }

    input[type='range']:focus::-webkit-slider-thumb {
    }
  `;

  return (
    <div css={sliderStyles}>
      <input
        min={min}
        max={max}
        step={step}
        // defaultValue={defaultValue}

        value={value}
        type='range'
        onChange={handleOnChange}
        {...props}
      />
    </div>
  );
};

export default Slider;
