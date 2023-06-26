import { configureStore } from '@reduxjs/toolkit'
import choiceReducer from '../redux/slices/choiceSlice'

export const store = configureStore({
    reducer: {
        choice: choiceReducer,
    },
})