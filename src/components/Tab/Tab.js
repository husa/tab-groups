import './Tab.scss';

import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobindr';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Checkbox from '../Checkbox/Checkbox';


class Tab extends React.Component {
  constructor () {
    super();
    autobind(this);
  }

  onRemoveClick () {
    this.props.onRemove(this.props.tab);
  }

  getCheckbox () {
    if (!this.props.showCheckbox) return null;
    return (
      <Checkbox
        className="tab__checkbox"
        checked={this.props.checked}
        onChange={this.props.onCheck} />
    );
  }

  getFavIcon () {
    const {tab} = this.props;
    if (tab.favIconUrl) {
      return (
        <img src={tab.favIconUrl} alt={tab.title} />
      );
    }
    return (
      <span className="tab__icon__placeholder" />
    );
  }

  getTabActions () {
    if (!this.props.showActions) return null;
    return (
      <div className="tab__actions">
        <Button
          type="secondary"
          outline
          onClick={this.onRemoveClick}>
          <Icon name="delete-forever" />
          Remove
        </Button>
      </div>
    );
  }

  render () {
    const {tab} = this.props;
    return (
      <div className="tab">
        {this.getCheckbox()}
        <div className="tab__info">
          <div className="tab__icon">
            {this.getFavIcon()}
          </div>
          <div className="tab__title">
            {tab.title}
          </div>
          <div className="tab__url">
            {tab.url}
          </div>
        </div>
        {this.getTabActions()}
      </div>
    );
  }
}

Tab.propTypes = {
  tab: PropTypes.object.isRequired,
  showActions: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  checked: PropTypes.bool,
  onCheck: PropTypes.func
};

Tab.defaultProps = {
  showActions: false,
  showCheckbox: false
};

export default Tab;
