import './Icon.scss';

import React from 'react';
import PropTypes from 'prop-types';


const Icon = ({name}) => (
  <svg className="icon" viewBox="0 0 24 24" widht="24" height="24">
    <use xlinkHref={`#${name}`} />
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Icon;
