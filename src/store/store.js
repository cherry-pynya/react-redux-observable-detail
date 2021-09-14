import { configureStore } from '@reduxjs/toolkit';
import listSlice, {requestDataEpic, requestDataByIdEpic} from '../reducer/listSlice';
import { createEpicMiddleware } from "redux-observable";

const epiccEpicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    list: listSlice,
  },
  middleware: [
    epiccEpicMiddleware,
  ],
})

epiccEpicMiddleware.run(requestDataEpic);
epiccEpicMiddleware.run(requestDataByIdEpic);
