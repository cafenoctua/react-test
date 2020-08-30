import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import customCounterReducer from '../features/customcounter/customCounterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    customCounter: customCounterReducer,
  },
});
