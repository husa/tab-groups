// @flow
import './Confirm.scss';

import * as React from 'react';

import Button from '../Button/Button';

type Props = {
  okTitle?: string,
  cancelTitle?: string,
  children: React.Node,
  title: string,
  onOk: () => void,
  onCancel: () => void
};

const Confirm = ({
  okTitle = 'Ok',
  cancelTitle = 'Cancel',
  title,
  onOk,
  onCancel,
  children
}: Props) => (
  <div className="confirm__overlay">
    <div className="confirm__message">
      <div className="confirm__message__title">
        {title}
      </div>
      <div className="confirm__message__content">
        {children}
      </div>
      <div className="confirm__message__actions">
        <Button
          flat
          onClick={onCancel}>
          {cancelTitle}
        </Button>
        <Button
          type="secondary"
          flat
          onClick={onOk}>
          {okTitle}
        </Button>
      </div>
    </div>
  </div>
);

export default Confirm;
