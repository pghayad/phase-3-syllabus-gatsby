import React from 'react';
import { Link } from 'gatsby';

const FourOhFour = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>
        Could not find that one! <Link to="/">Go home</Link>
      </p>
    </div>
  );
};

export default FourOhFour;
