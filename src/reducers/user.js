// @flow

type State = {|
  +id: ?string
|};

const getInitialState = (): State => ({
  id: null
});

// User id is pre-populated in entry point
const user = (state: State = getInitialState()): State => state;

export default user;
