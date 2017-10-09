import './Tab.scss';

import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobindr';

import Button from '../Button/Button';


const defaultFavIcon = 'http://placehold.it/20x20';

class Tab extends React.Component {
  constructor () {
    super();
    this.state = {};
    autobind(this);
  }

  onRemoveClick () {
    this.props.onRemove(this.props.tab);
  }

  getCheckbox () {
    if (!this.props.showCheckbox) return null;
    return (
      <div className="tab__checkbox">
        <input type="checkbox" checked={this.props.checked} onChange={this.props.onCheck} />
      </div>
    );
  }

  getTabActions () {
    if (!this.props.showActions) return null;
    return (
      <div className="tab__actions">
        <Button onClick={this.onRemoveClick}>Remove</Button>
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
            <img src={tab.favIconUrl || defaultFavIcon} alt={tab.title} />
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
