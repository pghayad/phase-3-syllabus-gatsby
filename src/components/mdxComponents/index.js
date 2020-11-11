import React from 'react';
import styled from '@emotion/styled';

import CodeBlock from './codeBlock';
import AnchorTag from './anchor';
import YoutubeEmbed from './YoutubeEmbed';
import Sandbox from '../sandbox';

const StyledPre = styled('pre')`
  border-radius: 6px;
  background: ${props => props.theme.colors.preFormattedText};
`;

const getNodeText = node => {
  if (['string', 'number'].includes(typeof node)) return node;
  if (node instanceof Array) return node.map(getNodeText).join('');
  if (typeof node === 'object' && node) return getNodeText(node.props.children);
};

function makeId(children) {
  const content = typeof children === 'string' ? children : getNodeText(children[0]);

  return content.replace(/\s+/g, '').toLowerCase();
}

export default {
  h1: props => <h1 className="heading1" id={makeId(props.children)} {...props} />,
  h2: props => <h2 className="heading2" id={makeId(props.children)} {...props} />,
  h3: props => <h3 className="heading3" id={makeId(props.children)} {...props} />,
  h4: props => <h4 className="heading4" id={makeId(props.children)} {...props} />,
  h5: props => <h5 className="heading5" id={makeId(props.children)} {...props} />,
  h6: props => <h6 className="heading6" id={makeId(props.children)} {...props} />,
  p: props => <p className="paragraph" {...props} />,
  pre: props => (
    <StyledPre>
      <pre {...props} />
    </StyledPre>
  ),
  code: CodeBlock,
  a: AnchorTag,
  YoutubeEmbed,
  Sandbox,
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  // TODO add `table`
};
