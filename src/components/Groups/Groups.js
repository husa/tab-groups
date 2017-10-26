import './Groups.scss';

import React from 'react';

import Group from '../Group/Group';


const Groups = ({groups, ...rest}) => {
  const list = groups.map(group => (
    <Group key={group.id} group={group} {...rest} />
  ));

  if (!list.length) {
    return (
      <div className="groups groups--empty">
        You don&#39;t have any groups yet. <br />
        Go ahead, and create your first group.
      </div>
    );
  }

  return (
    <div className="groups">
      {list}
    </div>
  );
};

export default Groups;
