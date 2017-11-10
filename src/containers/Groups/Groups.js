// @flow

import {connect} from 'react-redux';

import {selectGroups} from '../../selectors';
import {deleteTab} from '../../actions/groups';

import Groups from '../../components/Groups/Groups';


const mapStateToProps = state => ({
  groups: selectGroups(state)
});

const mapDispatchToProps = dispatch => ({
  onTabRemove (...args) {
    return dispatch(deleteTab(...args));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);
