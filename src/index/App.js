import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../backend/firebase'

import UnsignedLoginScreen from '../screens/unsignedLogin/UnsignedLogin';
import HomeScreen from '../screens/home/home';
import LoginScreen from '../screens/login/Login'
import RegisterScreen from '../screens/register/Register';
import SelectedRegister from '../screens/register/SelectedRegister';
import { useState } from 'react';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [user, setUser] = useState();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUser(uid)
      setIsSignedIn(true)
    } else {
      setUser('')
      setIsSignedIn(false)
    }
});

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {
          isSignedIn ? 
          (
            <>
            <Stack.Screen name="Home" component={HomeScreen} />
            </>
          )

          :

          (
            <>
            <Stack.Screen name="UnsignedLogin" component={UnsignedLoginScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="SelectedRegister" component={SelectedRegister} />
            </>
          ) 
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'blue',
    fontSize: 25,
  }
});
