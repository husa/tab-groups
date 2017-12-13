// @flow

import './GroupEditor.scss';

import * as React from 'react';
import autobind from 'autobindr';

import lang from '../../services/lang';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Confirm from '../Confirm/Confirm';


type Props = {
  name?: string,
  showDelete?: boolean,
  onSave: (name: string) => *,
  onCancel: () => *,
  onDelete?: () => *
};

type State = {
  name: string,
  showDeleteConfirmation: boolean
};

class GroupEditor extends React.Component<Props, State> {
  static defaultProps = {
    name: '',
    showDelete: false
  }

  constructor (props: Props) {
    super(props);
    this.state = {
      name: props.name || '',
      showDeleteConfirmation: false
    };
    autobind(this);
  }

  onChange (e: SyntheticInputEvent<>) {
    this.setState({name: e.target.value});
  }

  onKeyPress (e: SyntheticInputEvent<>) {
    if (e.key === 'Enter') this.props.onSave(this.state.name);
  }

  onSaveClick () {
    this.props.onSave(this.state.name);
  }

  onCancelClick () {
    this.props.onCancel();
  }

  onDeleteClick () {
    this.setState({showDeleteConfirmation: true});
  }

  onDeleteConfirm () {
    this.setState({showDeleteConfirmation: false});
    if (typeof this.props.onDelete === 'function') this.props.onDelete();
  }

  onDeleteCancel () {
    this.setState({showDeleteConfirmation: false});
  }

  render () {
    return (
      <div className="group-editor">
        <Input
          className="group-editor__input"
          placeholder={lang.t('groupsInputPlaceholder')}
          value={this.state.name}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          autoFocus />
        <Button
          type="primary"
          flat
          compact
          disabled={this.state.name === ''}
          icon="checkmark"
          onClick={this.onSaveClick}>
          {lang.t('generalSave')}
        </Button>
        <Button
          type="secondary"
          flat
          compact
          icon="close"
          onClick={this.onCancelClick}>
          {lang.t('generalCancel')}
        </Button>
        {this.props.showDelete && <Button
          type="secondary"
          flat
          compact
          icon="delete-forever"
          onClick={this.onDeleteClick}>
          {lang.t('generalDelete')}
        </Button>}
        {this.state.showDeleteConfirmation && (
          <Confirm
            okTitle="Delete"
            cancelTitle="Cancel"
            title="Delete group?"
            onOk={this.onDeleteConfirm}
            onCancel={this.onDeleteCancel}>
            This will permanently delete {this.state.name} group and all its tabs
          </Confirm>
        )}
      </div>
    );
  }
}

export default GroupEditor;
