// @flow

import './GroupEdit.scss';

import React from 'react';

// import Button from '../Button/Button';
import GroupEditor from '../GroupEditor/GroupEditor';
import type {Group} from '../../types';


type Props = {|
  group: Group,
  onSave: (name: string) => *,
  onCancel: () => *,
  onDelete: () => *
|};

const GroupEdit = ({group, onSave, onCancel, onDelete}: Props) => (
  <div className="group-edit">
    <GroupEditor
      name={group.name}
      showDelete={true}
      onSave={onSave}
      onCancel={onCancel}
      onDelete={onDelete} />
  </div>
);

export default GroupEdit;
