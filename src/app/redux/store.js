import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit";

import ticketsTypeReducer from "./AdminSlices/TicketsTypeSlice"

const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

const reducer = combineReducers({
    ticketsTypeReducer: ticketsTypeReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export default store