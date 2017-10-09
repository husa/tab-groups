import React from 'react';

import Header from '../../components/Header/Header';
import Actions from '../../containers/Actions/Actions';
import Groups from '../../containers/Groups/Groups';

const App = () => (
  <div id="app">
    <Header />
    <Actions />
    <Groups />
  </div>
);

export default App;
