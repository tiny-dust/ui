/** @jsxImportSource @emotion/react */

import { Theme } from '../../styles/themes';
import { Base } from '../props';

import { useFunctionLikeValue, useTheme, useCSS } from '../../styles/css';

type SegmentItemProps = Base &
  Partial<{
    itemkey: React.Key | null | undefined;
    currentKey: React.Key | null | undefined;
    onClickItem: (key: React.Key | null | undefined) => void;
  }>;
const SegmentItem = ({
  itemkey,
  currentKey,
  onClickItem,
  css,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & SegmentItemProps) => {
  const theme = useTheme() as Theme;
  const styles = useCSS({
    padding: '0 .4em',
    flex: 1,
    textAlign: 'center',
    color: itemkey == currentKey ? theme.color.primary : theme.color.black,
    transition: '.3s all',
    fontWeight: itemkey == currentKey ? 700 : 500,
    ...useFunctionLikeValue(theme, css),
  });

  const handleClickSegmentItem = () => {
    onClickItem?.(itemkey);
  };

  return (
    <div css={styles} {...props} onClick={handleClickSegmentItem}>
      {children}
    </div>
  );
};

export default SegmentItem;
