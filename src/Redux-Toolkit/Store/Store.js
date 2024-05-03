import { configureStore } from '@reduxjs/toolkit'
import contentReducer from '../Slice/contentSlice'
import adminReducer from '../Slice/AdminSlice'

// eslint-disable-next-line import/prefer-default-export

export const store = configureStore({
    reducer: {
        content: contentReducer,
        admin: adminReducer,
    },
})
