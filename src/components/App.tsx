import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store'
import RepositoriesList from './RepositoriesList'
const App = () => {

  
  
  return (
   <Provider store={store}>
    <div className='absolute top-20 left-1/2 -translate-x-1/2 -translate-y-10'>
      <h1 className="text-3xl font-bold">Search For a NPM Package</h1>
      <RepositoriesList/>
    </div>
   </Provider>
  );
};

export default App;