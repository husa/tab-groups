// @flow

import './Icon.scss';

import React from 'react';

type Props = {
  name: string
};

const Icon = ({name}: Props) => (
  <svg className="icon" viewBox="0 0 24 24" widht="24" height="24">
    <use xlinkHref={`#${name}`} />
  </svg>
);

export default Icon;
