import './Checkbox.scss';

import React from 'react';


const Checkbox = ({children, ...props}) => (
  <div className="checkbox">
    <label>
      <input
        className="checkbox__input"
        type="checkbox"
        {...props} />
      {children}
    </label>
  </div>
);

Checkbox.propTypes = {};

Checkbox.defaultProps = {};

export default Checkbox;
