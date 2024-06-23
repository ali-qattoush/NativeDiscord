import { createSlice } from '@reduxjs/toolkit';
import ChannelModal from '../../components/ChannelModal';

type Category = {
  categoryID: string;
  categoryName: string;
  channels: Channel[];
};

type Message = {
  messageID: string;
  content: string;
  timestamp: Date;
  userID: string;
};

type Channel = {
  channelID: string;
  channelName: string;
  messages: Message[];
};

type Server = {
  serverID: string;
  name: string;
  usersID: string[];
  channels: (Channel | Category)[];
};

type UserServerInfo = {
  serverID: string;
  name: string;
};

type ServerState = {
  servers: { [serverID: string]: Server };
  userServers: { [userId: string]: UserServerInfo[] };
};

const initialState: ServerState = {
  servers: {},
  userServers: {},
};

const serverSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    addServer: (state, action) => {
      const server = action.payload;
      state.servers[server.serverID] = server;
      server.usersID.forEach(userId => {
        if (!state.userServers[userId]) {
          state.userServers[userId] = [];
        }
        state.userServers[userId].push({
          serverID: server.serverID,
          name: server.name,
        });
      });
    },
    addChannel: (state, action) => {
      const { serverID, channelName, channelID } = action.payload;

      if (state.servers[serverID]) {
        // if serverID exists
        state.servers[serverID].channels.push({
          channelID,
          channelName,
          messages: [],
        });
      } else {
        console.error(`Server with ID ${serverID} does not exist`);
      }
    },
    addMessage: (state, action) => {
      const { currentServerID, channelID, newMessage } = action.payload;
      const channelIndex = state.servers[currentServerID].channels.findIndex(
        channel => channel.channelID === channelID,
      );

      state.servers[currentServerID].channels[channelIndex].messages.unshift(
        newMessage,
      );
    },
  },
});

export const { addServer, addChannel, addMessage } = serverSlice.actions;

export const serversMap = state => state.serverSlice?.userServers;
export const serverSelector = (state, serverID) =>
  state.serverSlice?.servers[serverID];
export const channelSelector = (state, serverID) =>
  state.serverSlice?.servers[serverID]?.channels.map(channel => ({
    channelID: channel.channelID,
    channelName: channel.channelName,
  }));

export const messageSelector = (state, serverID, channelID) => {
  const channel = state.serverSlice?.servers[serverID]?.channels.find(
    channel => channel.channelID === channelID,
  );
  //   console.log(channel.messages)
  return channel.messages;
};

export default serverSlice.reducer;
