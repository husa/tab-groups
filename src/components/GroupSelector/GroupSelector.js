import './GroupSelector.scss';

import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobindr';
import classNames from 'classnames';

import Icon from '../Icon/Icon';


class GroupSelector extends React.Component {
  constructor () {
    super();
    this.state = {
      selected: {
        id: null
      },
      open: false
    };
    autobind(this);
  }

  onSelect (group) {
    this.setState({selected: group, open: false});
    this.props.onSelect(group);
  }

  onLabelClick () {
    this.setState(state => ({open: !state.open}));
  }

  getLabel () {
    const {selected} = this.state;
    return selected.id ? selected.name : 'Select Group';
  }

  getGroupOptions () {
    const {selected} = this.state;
    return this.props.groups.map(group => (
      <div
        key={group.id}
        className={classNames('group-selector__option', {
          'group-selector__option--selected': group.id === selected.id
        })}
        onClick={this.onSelect.bind(this, group)}>
        {group.name}
      </div>
    ));
  }

  render () {
    return (
      <div className={classNames('group-selector', {
        'group-selector--open': this.state.open
      })}>
        <div className="group-selector__content" onClick={this.onLabelClick}>
          <div className="group-selector__label">{this.getLabel()}</div>
          <div className="group-selector__icon">
            <Icon name="chevron-down" />
          </div>
        </div>
        <div className="group-selector__options">
          {this.getGroupOptions()}
        </div>
      </div>
    );
  }
}

GroupSelector.propTypes = {
  groups: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

GroupSelector.defaultProps = {};

export default GroupSelector;
