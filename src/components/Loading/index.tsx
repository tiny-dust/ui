import * as React from 'react'
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Theme } from '../../constants/theme'

type LoadingProps = {
  duration?: string
  className?: string
  width?: string
  backgroudColor?: ((theme: Theme) => string) | string
  color?: ((theme: Theme) => string) | string
  borderWidth?: string
  css?: (theme: Theme) => React.CSSProperties
}

type RuleNames = 'loading' | '@keyframes spin'

const useStyles = createUseStyles<RuleNames, LoadingProps, Theme>(theme => ({
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  loading: ({ borderWidth, width, duration, color, backgroudColor, css }) => ({
    border: `${borderWidth} solid ${typeof backgroudColor == 'string' ? backgroudColor : backgroudColor?.(theme)}`,
    borderTop: `${borderWidth} solid ${typeof color == 'string' ? color : color?.(theme)}`,
    borderRadius: '50%',
    width: width,
    height: width,
    animation: `$spin ${duration} linear infinite`,
    ...css?.(theme),
  }),
}))
const Loading = ({
  duration = '1s',
  width = '4em',
  borderWidth = '2px',
  color = '#555',
  backgroudColor = '#f3f3f3',
  css,
  className,
}: LoadingProps & React.ComponentPropsWithoutRef<'div'>) => {
  const classes = useStyles({
    backgroudColor,
    color,
    borderWidth,
    width,
    css,
    duration,
  })
  const computedClassNames = classnames(classes.loading, className)
  return <div className={computedClassNames} />
}

export default Loading
