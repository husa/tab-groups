// @flow

import './GroupEditor.scss';

import * as React from 'react';
import autobind from 'autobindr';

import Input from '../Input/Input';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';


type Props = {
  name?: string,
  showDelete?: boolean,
  onSave: (name: string) => *,
  onCancel: () => *,
  onDelete?: () => *
};

type State = {
  name: string
};

class GroupEditor extends React.Component<Props, State> {
  static defaultProps = {
    name: '',
    showDelete: false
  }

  constructor (props: Props) {
    super(props);
    this.state = {
      name: props.name || ''
    };
    autobind(this);
  }

  onChange (e: SyntheticInputEvent<>) {
    this.setState({name: e.target.value});
  }

  onSaveClick () {
    this.props.onSave(this.state.name);
  }

  onCancelClick () {
    this.props.onCancel();
  }

  onDeleteClick () {
    if (typeof this.props.onDelete === 'function') this.props.onDelete();
  }

  render () {
    return (
      <div className="group-editor">
        <Input
          className="group-editor__input"
          placeholder="Group Name"
          value={this.state.name}
          onChange={this.onChange} />
        <Button
          type="primary"
          disabled={this.state.name === ''}
          onClick={this.onSaveClick}>
          <Icon name="checkmark" />
          Save
        </Button>
        <Button
          type="secondary"
          onClick={this.onCancelClick}>
          <Icon name="close" />
          Cancel
        </Button>
        {this.props.showDelete && <Button
          type="secondary"
          outline
          onClick={this.onDeleteClick}>
          Delete
        </Button>}
      </div>
    );
  }
}

export default GroupEditor;
