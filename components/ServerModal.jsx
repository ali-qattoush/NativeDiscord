import React, { useState } from 'react';
import { View, Pressable, Modal, Text, Button, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addServer,  } from '../redux/reducers/serverSlice'; // Adjust the import path as needed
import { selectUser, updateLastServer } from '../redux/reducers/userSlice'; // Adjust the import path as needed
import uuid from 'react-native-uuid';

const ServerModal = ({ visible, onClose }) => {
    const dispatch = useDispatch();
    const userID = useSelector(selectUser);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        let newServerID = uuid.v4();
        let newServerObject = {
            serverID: newServerID,
            name: inputValue,
            usersID: [userID],
            channels: [] // Initialize channels as an empty array since it's required in the Server type
        };
        dispatch(addServer(newServerObject));
        dispatch(updateLastServer({ lastServer: {serverID: newServerID, name:inputValue} }));
        
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setInputValue(text)}
                        value={inputValue}
                    />
                    <Button
                        title="Submit"
                        onPress={handleSubmit}
                    />

                    <Pressable onPress={onClose}>
                        <Text>Close Modal</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default ServerModal;
