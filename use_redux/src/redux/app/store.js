import { configureStore } from '@reduxjs/toolkit'
import choiceReducer from '../slices/choiceSlice'

export const store = configureStore({
    reducer: {
        choice: choiceReducer,
    },
})