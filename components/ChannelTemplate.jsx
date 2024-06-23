import { useState } from 'react';
import { Text, View, FlatList, TextInput, Button } from 'react-native';
import uuid from 'react-native-uuid';
import { lastSelectedServer, selectUser } from '../redux/reducers/userSlice';
import { useSelector } from 'react-redux';
import { messageSelector } from '../redux/reducers/serverSlice';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/reducers/serverSlice';

export default function ChannelTemplate({ route }) {
  const { channelID } = route.params;
  const currentServerID = useSelector(lastSelectedServer);
  const dispatch = useDispatch();

  const messages = useSelector(state =>
    messageSelector(state, currentServerID, channelID),
  );

  const [inputField, setInputField] = useState('');
  const [totalData, setTotalData] = useState(messages);
  const [pagination, setPagination] = useState({
    startIndex: 0,
    endIndex: 15,
    endOfData: false,
  });

  const userID = useSelector(selectUser);

  function onTextChange(text) {
    setInputField(text);
  }

  function addText() {
    const newMessage = {
      messageID: uuid.v4(),
      content: inputField,
      timestamp: new Date().toISOString(),
      userID: userID,
    };
    // console.log(totalData);
    setPagination(index => ({ ...index, endIndex: index.endIndex + 1 }));
    setTotalData(lastPage => [newMessage, ...lastPage]);

    dispatch(
      addMessage({
        currentServerID: currentServerID,
        channelID: channelID,
        newMessage: newMessage,
      }),
    );

    setInputField('');
  }

  function renderMore() {
    if (pagination.endOfData) return;
    
    if (totalData.length >= 15) {
      if (pagination.endIndex + 15 >= totalData.length) {
        setPagination(index => ({
          ...index,
          endOfData: true,
          endIndex: totalData.length,
        }));
        return;
      }

      setPagination(index => ({
        ...index,
        endIndex: Math.min(index.endIndex + 15, totalData.length),
      }));
    }
  }

  return (
    <View className="flex-1 bg-rasinblack ">
      <View className="flex-1 ">
        <FlatList
          data={totalData.slice(pagination.startIndex, pagination.endIndex)}
          keyExtractor={item => item.messageID}
          onEndReached={renderMore}
          onEndReachedThreshold={0.1}
          inverted={true}
          renderItem={({ item }) => (
            <Text className="text-white text-xl ml-4 my-2">{item.content}</Text>
          )}></FlatList>
      </View>

      <View className="flex-shrink-0">
        <TextInput
          value={inputField}
          onChangeText={onTextChange}
          className="text-white"
          placeholder="Type your message"
        />
        <Button title="Send Message" onPress={addText} />
      </View>
    </View>
  );
}
