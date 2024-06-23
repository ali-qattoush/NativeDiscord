import React, { useEffect, useState, useRef } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import BottomTab from './navigation/BottomTab';
import { useDispatch } from 'react-redux';
import { loginUser } from './redux/reducers/userSlice';

const Stack = createStackNavigator();

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initial, setInitial] = useState(true);
  const navigationRef = useRef();

  const userAuthState = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (user) {
      dispatch(loginUser({ uid: user.uid }));
    }
    if (initial) setInitial(false);
  };

  const printNavigationState = () => {
    const state = navigationRef.current?.getRootState();
    console.log('Navigation State:', JSON.stringify(state, null, 2));
  };

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(userAuthState);
    return subscribe;
  }, []);

  if (initial) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      {user ? (
        <BottomTab printNavigationState={printNavigationState} />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignUpForm" component={SignUp} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
