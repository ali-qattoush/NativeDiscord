import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { lastSelectedServer } from '../redux/reducers/userSlice';
import { channelSelector } from '../redux/reducers/serverSlice';
import ChannelTemplate from '../components/ChannelTemplate';

const Stack = createStackNavigator();

export default function ChannelsStack({ printNavigationState }) {
  const currentServerID = useSelector(lastSelectedServer);
  const channelsArray = useSelector(state =>
    channelSelector(state, currentServerID),
  );

  useEffect(() => {
    printNavigationState();
  }, [channelsArray]); 

  return (
    <Stack.Navigator>
      {channelsArray &&
        channelsArray.map(obj => (
          <Stack.Screen
            key={obj.channelID}
            name={`channel-${obj.channelID}`}
            component={ChannelTemplate}
            // initialParams={{ ...obj }}
            options={{ headerShown: false }}
          />
        ))}
    </Stack.Navigator>
  );
}
