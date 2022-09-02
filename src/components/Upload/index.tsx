/** @jsxImportSource @emotion/react */
import { Base } from '../props';
import { useCSS, useTheme, useFunctionLikeValue } from '../../styles/css';
import { Theme } from '../../styles/themes';

type UploadProps = Base &
  Partial<{
    onlyImg?: boolean;
    className: string;
    children: React.ReactNode;
    onFileChange: (file: Blob, preview: string, e: React.ChangeEvent<HTMLInputElement>) => any;
  }>;

const Upload = ({
  onlyImg,
  accept,
  onFileChange,
  children,
  css,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & UploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    onFileChange?.(file, URL.createObjectURL(file), e);
  };
  const theme = useTheme() as Theme;

  const styles = useCSS({
    cursor: ' pointer',
    ...useFunctionLikeValue(theme, css),
  });

  return (
    <label css={styles} aria-label='file upload input'>
      <input
        accept={accept || (onlyImg ? 'image/png,image/jpeg,image/jpg' : '')}
        hidden
        type='file'
        onChange={handleFileChange}
        {...props}
      />
      {children}
    </label>
  );
};

export default Upload;
