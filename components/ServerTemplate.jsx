import { View, Text, Pressable } from 'react-native';
import { lastSelectedServer } from '../redux/reducers/userSlice';
import { useSelector } from 'react-redux';
import { serverSelector, channelSelector } from '../redux/reducers/serverSlice';
import ChannelModal from './ChannelModal';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// import { selectUser } from '../redux/reducers/userSlice';
import ServerHeader from './ServerHeader';


export default function ServerTemplate() {
  const navigation = useNavigation()
  const [channelVisible, setChannelVisible] = useState(false);
  const currentServerID = useSelector(lastSelectedServer);
  const serverObj = useSelector(state =>
    serverSelector(state, currentServerID),
  );

  const channelsArray = useSelector(state =>
    channelSelector(state, currentServerID),
  );

  // const userID = useSelector(selectUser);

  function serverChannelsRender() {
    return channelsArray.map(channel => {
      return (
        <Pressable
          key={channel.channelID}
          className="ml-2"
          onPress={() => navigation.navigate(`channel-${channel.channelID}`, channel)}>
          <View className="flex-row">
            <Text className="text-gray-400 text-2xl"># {channel.channelName}</Text>
            
          </View>
          
        </Pressable>
      );
    });
  }

  return (
    <View className="bg-rasinblack flex-1 ">
      <View className="min-h-[13vh]">
        {serverObj && (<ServerHeader setChannelVisible={setChannelVisible} />)}
      </View>
      
      <ChannelModal
        isVisible={channelVisible}
        onClose={() => setChannelVisible(false)}
      />
      <View className="min-h-[87vh] ">
        {serverObj && serverChannelsRender()}
      </View>
    </View>
  );
}
