import { Link } from 'gatsby';
import * as React from 'react';
import isAbsoluteUrl from 'is-absolute-url';

const AnchorTag = ({ children: link, ...props }) => {
  if (link) {
    if (isAbsoluteUrl(props.href)) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      );
    } else {
      return <Link to={props.href}>{link}</Link>;
    }
  } else {
    return null;
  }
};

export default AnchorTag;
