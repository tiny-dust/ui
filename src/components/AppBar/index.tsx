import { useState } from 'react'
import * as React from 'react'
import classnames from 'classnames'

import { Theme } from '../../constants/theme'
import { createUseStyles } from 'react-jss'

type AppBarProps = {
  shy?: boolean
  fixed?: boolean
  css?: (theme: Theme) => React.CSSProperties
} & React.ComponentPropsWithoutRef<'div'>

type RuleNames = 'app-bar'

const useStyles = createUseStyles<RuleNames, AppBarProps, Theme>(theme => ({
  'app-bar': ({ css, fixed }) => ({
    height: theme?.appBar?.height || '3em',
    backgroundColor: theme ? (theme.mode == 'light' ? theme.color.white : theme.color.black) : '#fff',
    ...(fixed
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme?.zIndex?.appBar || 700,
        }
      : {}),
    ...css?.(theme),
  }),
}))
const AppBar = ({ fixed = false, css, className, children, ...props }: AppBarProps) => {
  const classes = useStyles({ fixed, css })
  const computedClassNames = classnames(classes['app-bar'], className)
  return (
    <header className={computedClassNames} {...props}>
      {children}
    </header>
  )
}

export default AppBar
