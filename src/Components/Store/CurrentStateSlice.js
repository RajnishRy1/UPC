import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetching: false,
  uploaded: false,
  vendor: "",
  value: 0,
  completed: false,
};

const CurrentStateSlice = createSlice({
  name: "CurrentState",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    setFetching(state, action) {
      state.fetching = action.payload.fetching;
    },
    setUploaded(state, action) {
      state.uploaded = action.payload.uploaded;
    },
    setVendor(state, action) {
      state.vendor = action.payload.vendor;
    },
    setProgressValue(state, action) {
      state.value = action.payload.value;
    },
    setCompletion(state, action) {
      state.completed = action.payload.completed;
    },
  },
});

export default CurrentStateSlice;
export const CurrentStateActions = CurrentStateSlice.actions;
