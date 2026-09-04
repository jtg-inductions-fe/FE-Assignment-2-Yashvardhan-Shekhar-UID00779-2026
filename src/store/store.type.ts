import { store } from '@store';

/** Represents the complete Redux store state. */
export type RootState = ReturnType<typeof store.getState>;

/** Represents the Redux store's dispatch function. */
export type AppDispatch = typeof store.dispatch;

/** Represents the type of the Redux store instance. */
export type AppStore = typeof store;
