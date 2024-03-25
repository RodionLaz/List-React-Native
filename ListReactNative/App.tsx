/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState} from 'react';
import type {PropsWithChildren} from 'react';
import firebase  from '@react-native-firebase/app';
import List from './Components/List';
import firebaseConfig from './firebaseConfig';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;  


function App(): React.JSX.Element {

  const [loading, setLoading] = useState(false);

  let app;
  if (firebase.apps.length === 0) {
      app = firebase.initializeApp(firebaseConfig)
  } else {
      app = firebase.app()
  }
  return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" /> 
                  ) : (
                    <View style={{ flex: 1 }}>
                    <List 
                    loading={loading}
                    setLoading={setLoading}
                    />
                  </View>
                  )}
        </View>
      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
