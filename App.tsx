
import React from 'react';
import MainNavigator from './src/navigation/mainNavigator/MainNavigator';
import { GlobalContextProvider } from './src/data/globalContext/GlobalContext';
import { EventBusProvider } from './src/data/globalContext/events/EventBus';


const App = () => {

  return (

    <EventBusProvider>
      <GlobalContextProvider>

        <MainNavigator />

      </GlobalContextProvider>
    </EventBusProvider>

  )
  
}

export default App;
