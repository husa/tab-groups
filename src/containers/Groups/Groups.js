// @flow

import {connect} from 'react-redux';

import {selectGroups} from '../../selectors';
import {
  renameGroup,
  deleteGroup,
  deleteTab
} from '../../actions/groups';

import Groups from '../../components/Groups/Groups';


const mapStateToProps = state => ({
  groups: selectGroups(state)
});

const mapDispatchToProps = dispatch => ({
  renameGroup (...args) {
    return dispatch(renameGroup(...args));
  },

  deleteGroup (...args) {
    return dispatch(deleteGroup(...args));
  },

  deleteTab (...args) {
    return dispatch(deleteTab(...args));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);
