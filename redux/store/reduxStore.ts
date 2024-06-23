import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/userSlice'
import serverReducer from '../reducers/serverSlice'


const store = configureStore({
    reducer: {
        userSlice: userReducer,
        serverSlice: serverReducer
    }
})

export default store;