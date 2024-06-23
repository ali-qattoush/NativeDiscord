// import store from '../redux/store/reduxStore';
import { Text, View, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ServerModal from '../components/ServerModal';
import ServerTemplate from '../components/ServerTemplate';
import { serversMap } from '../redux/reducers/serverSlice';
import { selectUser } from '../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { updateLastServer } from '../redux/reducers/userSlice';

function Main() {
  const [serverModal, setServerModal] = useState(false);
  const dispatch = useDispatch();
  const serverInfo = useSelector(serversMap);
  const userUID = useSelector(selectUser);

  // const storeState = store.getState();
  // const jsonString = JSON.stringify(storeState, null, 2);
  // console.log(jsonString);

  function lastServerHandler(server) {
    dispatch(
      updateLastServer({
        lastServer: { serverID: server.serverID, name: server.name },
      }),
    );
  }

  function serverRenderer() {
    return (
      <>
        {serverInfo[userUID].map(server => (
          <Pressable
            key={server.serverID}
            onPress={() => lastServerHandler(server)}
            className="justify-center my-1 mx-2 bg-rasinblack rounded-full w-12 h-12">
            <Text className="text-center text-shamrockgreen text-xs">
              {server.name}
            </Text>
          </Pressable>
        ))}
      </>
    );
  }

  return (
    <View className="w-full h-full flex-row">
      <View className="w-16 h-full bg-serverbg items-center ">
        <View className="mt-2 h-full mr-1 justify-center rounded-full w-full">
          <ScrollView className=" ">
            {serverInfo[userUID] ? serverRenderer() : null}
            <Pressable
              className=" bg-rasinblack my-1 mx-2 justify-center rounded-full w-12 h-12"
              onPress={() => setServerModal(true)}>
              <Text className="text-center text-shamrockgreen text-4xl">+</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
      <ServerModal
        visible={serverModal}
        onClose={() => setServerModal(false)}
      />
      <View className="flex-1">
        <ServerTemplate />
      </View>
    </View>
  );
}

export default Main;
