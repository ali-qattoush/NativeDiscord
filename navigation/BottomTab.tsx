import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from '../screens/Main';
import UserProfile from '../screens/UserProfile';
import Messages from '../screens/Messages';
import Notifications from '../screens/Notifications';
import Logout from '../utils/Logout';
import { useSelector } from 'react-redux';
import { lastSelectedServer } from '../redux/reducers/userSlice';
import { channelSelector } from '../redux/reducers/serverSlice';
import ChannelTemplate from '../components/ChannelTemplate';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  //{ printNavigationState }
  const currentServerID = useSelector(lastSelectedServer);
  const channelsArray = useSelector(state =>
    channelSelector(state, currentServerID),
  );
  // useEffect(() => {
  //   printNavigationState();
  // }, [channelsArray]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="messages" component={Messages} />
      <Tab.Screen name="notifications" component={Notifications} />
      <Tab.Screen
        name="userprofile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Logout" component={Logout} />

      {channelsArray &&
        channelsArray.map(obj => (
          <Tab.Screen
            key={obj.channelID}
            name={`channel-${obj.channelID}`}
            component={ChannelTemplate}
            options={{ tabBarStyle: {display: 'none'} ,headerShown: false, tabBarButton: () => null}}
          />
        ))}
    </Tab.Navigator>
  );
}
