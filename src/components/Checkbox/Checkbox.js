import './Checkbox.scss';

import React from 'react';


const Checkbox = ({children, ...props}) => (
  <label className="checkbox">
    <input
      className="checkbox__input"
      type="checkbox"
      {...props} />
    <span className="checkbox__text">
      {children}
    </span>
  </label>
);

Checkbox.propTypes = {};

Checkbox.defaultProps = {};

export default Checkbox;
