import { createSlice } from "@reduxjs/toolkit";
// import convertToDateFormat from "utils/convertToDateFormat";

const initialState = {
  display_name: null,
  email: null,
  username: null,
  password: null,
  confirm_password: null,
  organization_name: null,
  organization_email: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateFormdata(state, action) {
      const values = action.payload;
      let newState = { ...state };
      Object.assign(newState, values);
      return newState;
    },
    clearFormData(state) {
      let newState = { ...state };
      newState.display_name = null;
      newState.email = null;
      newState.username = null;
      newState.password = null;
      newState.confirm_password = null;
      newState.organization_name = null;
      newState.organization_email = null;
      return newState;
    },
  },
});

export const { updateFormdata, clearFormData } = registerSlice.actions;
export default registerSlice.reducer;
