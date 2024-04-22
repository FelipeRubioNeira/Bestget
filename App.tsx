
import React from 'react';
import MainNavigator from './src/navigation/mainNavigator/MainNavigator';
import { GlobalContextProvider } from './src/data/globalContext/GlobalContext';


const App = () => {
  return (
    <GlobalContextProvider>
      <MainNavigator />
    </GlobalContextProvider>
  )
}

export default App;
