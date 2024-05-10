
import React from 'react';
import MainNavigator from './src/navigation/mainNavigator/MainNavigator';
import { GlobalContextProvider } from './src/data/globalContext/GlobalContext';
import { EventBusProvider } from './src/data/globalContext/events/EventBus';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


// ------------------- google sign in ------------------- //
GoogleSignin.configure({
  scopes: ['email'],
  webClientId: '104630043190-8u6epmlanp20gl2ka9e50ep95295a6r9.apps.googleusercontent.com',
  offlineAccess: false,
  profileImageSize: 400,
});


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
