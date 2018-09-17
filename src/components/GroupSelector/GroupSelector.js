// @flow

import './GroupSelector.scss';

import * as React from 'react';
import autobind from 'autobindr';
import classNames from 'classnames';

import lang from '../../services/lang';
import Icon from '../Icon/Icon';
import type {Group} from '../../types';

type Props = {
  groups: Array<Group>,
  defaultSelected?: ?Group,
  onSelect: (group: Group) => void
};
type State = {
  selected: ?Group,
  open: boolean
};

class GroupSelector extends React.Component<Props, State> {
  constructor (props: Props) {
    super();
    this.state = {
      selected: props.defaultSelected || null,
      open: false
    };
    autobind(this);
  }

  componentWillUpdate (nextProps: Props, nextState: State) {
    if (nextState.open && !this.state.open) {
      document.addEventListener('click', this.onDocumentClick);
    } else if (!nextState.open && this.state.open) {
      document.removeEventListener('click', this.onDocumentClick);
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.onDocumentClick);
  }

  onDocumentClick () {
    this.setState({open: false});
  }

  onSelect (group: Group) {
    this.setState({selected: group, open: false});
    this.props.onSelect(group);
  }

  onLabelClick () {
    this.setState(state => ({open: !state.open}));
  }

  getLabel () {
    const {selected} = this.state;
    return selected ? selected.name : lang.t('groupsSelectGroup');
  }

  getGroupOptions () {
    const {selected} = this.state;
    return this.props.groups.map(group => (
      <div
        key={group.id}
        className={classNames('group-selector__option', {
          'group-selector__option--selected': selected && group.id === selected.id
        })}
        onClick={this.onSelect.bind(this, group)}>
        {group.name}
      </div>
    ));
  }

  render () {
    return (
      <div
        className={classNames('group-selector', {
          'group-selector--open': this.state.open
        })}>
        <div className="group-selector__content" onClick={this.onLabelClick}>
          <div className="group-selector__label">{this.getLabel()}</div>
          <div className="group-selector__icon">
            <Icon name="chevron-down" />
          </div>
        </div>
        <div className="group-selector__options">{this.getGroupOptions()}</div>
      </div>
    );
  }
}

export default GroupSelector;
