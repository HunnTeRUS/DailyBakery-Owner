import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Notifications from 'expo-notifications';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify, { Analytics } from 'aws-amplify';
import Config from './src/aws-config/Config2';

// Get the aws resources configuration parameters
import awsconfig from './mobile/src/aws-exports';

Amplify.configure(awsconfig);
Analytics.disable(); // disabled analytics otherwise you get annoying messages

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Config />
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
