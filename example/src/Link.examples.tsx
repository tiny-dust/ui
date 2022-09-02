import APITable, { APIs } from './common/APITable';
import { Link, Container } from '../build';

import Example from './common/Example';
const img =
  'data:image/png;base64,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';
const apis: APIs = [
  {
    attributes: 'to',
    type: 'string',
    acceptedValues: '-',
    description: "link's destination",
    defaultValue: '-',
  },
  {
    attributes: 'textColor',
    type: 'string / (t:Theme)=>string',
    acceptedValues: '-',
    description: 'link text color',
    defaultValue: 'vars.color.black',
  },
  {
    attributes: 'disabled',
    type: 'boolean',
    acceptedValues: 'true / false',
    description: 'Disable link',
    defaultValue: 'false',
  },
  {
    attributes: 'indicatorColor',
    type: 'string / (t:Theme)=>string',
    acceptedValues: '-',
    description: 'link underline color',
    defaultValue: 'vars.color.black',
  },
  {
    attributes: 'indicatorSize',
    type: 'string',
    acceptedValues: '-',
    description: 'link underline size',
    defaultValue: '1px',
  },
  {
    attributes: 'indicatorAction',
    type: 'string',
    acceptedValues: "'always' | 'none' | 'hover'",
    description: 'link indicator triger way',
    defaultValue: 'always',
  },
  {
    attributes: 'blank',
    type: 'boolean',
    acceptedValues: 'true / false',
    description: 'open url with new window',
    defaultValue: 'false',
  },
  {
    attributes: 'backTop',
    type: 'boolean',
    acceptedValues: 'true / false',
    description: 'click to back top',
    defaultValue: 'fase',
  },
];
const LinkExamples = () => {
  return (
    <Container pa='1em'>
      <Example
        title='Default'
        desc='The Link component allows you to easily customize anchor elements with your theme colors and indicator
      styles.'>
        <Link to='#'>default</Link>

        <Link to='#' indicatorAction='none'>
          no indicator
        </Link>
      </Example>
      <Example title='Disabled' desc="The Link that can't touch.">
        <Link disabled>Disabled</Link>
      </Example>
      <Example title='Target Blank' desc='Jump to a link (modify target to "_blank" to change the opening method)'>
        <Link blank to={img}>
          blank
        </Link>
      </Example>
      <Example
        title='Download'
        desc='Let the to address become download instead of open, and also have the function of renaming'>
        <Link to={img} download='image.png'>
          download
        </Link>
      </Example>
      <Example title='Custom' desc='Use props such as indicator XX to change the underline style'>
        <Link to='#' indicatorColor='red'>
          custom ind
        </Link>
        <Link to='#' indicatorSize='8px'>
          custom size
        </Link>
        <Link to='#' indicatorAction='none' textColor='green'>
          no indicator
        </Link>
        <Link to='#' textColor='red'>
          red
        </Link>
      </Example>
      <Example title='Back Top' desc='click link to back top'>
        <Link backTop>back top</Link>
      </Example>

      <APITable apis={apis} />
    </Container>
  );
};

export default LinkExamples;
