import React, { useState } from 'react';
import { View, Pressable, Text, Button, TextInput, Modal } from 'react-native';
import { addChannel } from '../redux/reducers/serverSlice';
import { useDispatch, useSelector } from 'react-redux';
import { lastSelectedServer } from '../redux/reducers/userSlice';
import uuid from 'react-native-uuid';


const ChannelModal = ({ isVisible , onClose }) => {
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();
  const lastServerID = useSelector(lastSelectedServer);

  const handleSubmit = () => {
    dispatch(
      addChannel({ serverID: lastServerID, channelName: inputText, channelID: uuid.v4()}),
    );

    onClose()
  };

  function textHandler(text) {
    setInputText(text);
  }

  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center">
        <TextInput onChangeText={text => textHandler(text)} value={inputText} />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </Modal>
  );
};

export default ChannelModal;
