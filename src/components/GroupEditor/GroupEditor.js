// @flow

import './GroupEditor.scss';

import * as React from 'react';
import autobind from 'autobindr';

import lang from '../../services/lang';
import Input from '../Input/Input';
import Button from '../Button/Button';

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
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      name: props.name || ''
    };
    autobind(this);
  }

  onChange(e: SyntheticInputEvent<>) {
    this.setState({name: e.target.value});
  }

  onKeyPress(e: SyntheticInputEvent<>) {
    if (e.key === 'Enter') this.props.onSave(this.state.name);
  }

  onSaveClick() {
    this.props.onSave(this.state.name);
  }

  onCancelClick() {
    this.props.onCancel();
  }

  onDeleteClick() {
    if (typeof this.props.onDelete === 'function') this.props.onDelete();
  }

  render() {
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
        <Button type="secondary" flat compact icon="close" onClick={this.onCancelClick}>
          {lang.t('generalCancel')}
        </Button>
        {this.props.showDelete && (
          <Button type="secondary" flat compact icon="delete-forever" onClick={this.onDeleteClick}>
            {lang.t('generalDelete')}
          </Button>
        )}
      </div>
    );
  }
}

export default GroupEditor;
