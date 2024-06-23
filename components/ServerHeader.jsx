import { View, Text, Pressable } from 'react-native';
import { serverSelector } from '../redux/reducers/serverSlice';
import { lastSelectedServer } from '../redux/reducers/userSlice';
import { useSelector } from 'react-redux';

export default function ServerHeader({ setChannelVisible }) {
  const currentServerID = useSelector(lastSelectedServer);
  const serverInfo = useSelector(state =>
    serverSelector(state, currentServerID),
  );
  const {name} = serverInfo;

  return (
    <View>
      <Pressable onPress={() => setChannelVisible(true)}>
        <Text className="font-bold mt-4 ml-4 text-xl text-white">{name}</Text>
        <Text className="justify-end ml-2 text-white mt-4">Create New Channel</Text>
      </Pressable>
    </View>
  );
}
