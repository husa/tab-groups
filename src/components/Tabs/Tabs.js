import React from 'react';

import Tab from '../Tab/Tab';


const Tabs = ({tabs, ...rest}) => {
  const list = tabs.map((tab, i) => (
    <Tab key={i} tab={tab} {...rest} />
  ));

  return (
    <div className="tabs">
      {list}
    </div>
  );
};

export default Tabs;
