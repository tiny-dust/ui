/** @jsxImportSource @emotion/react */
import { useFunctionLikeValue, useCSS, useTheme } from '../../styles/css';
import { Theme } from '../../styles/themes';
import { Base } from '../props';
type CenterProps = Base;

const Center = ({ css, children, ...props }: CenterProps) => {
  const theme = useTheme() as Theme;
  const styles = useCSS({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...useFunctionLikeValue(theme, css),
  });

  return (
    <div css={styles} {...props}>
      {children}
    </div>
  );
};

export default Center;
