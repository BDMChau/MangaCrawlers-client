const { createSlice } = require("@reduxjs/toolkit");


const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: [],
    reducers: {
        CLOSE_SIGN_UP_FORM: (state, action) => {
            state.push(action.payload);
        },
        CLOSE_SIGN_IN_FORM: (state, action) => {
            state.push(action.payload);
        },
        OPEN_SIGN_UP_FORM_FROMSIGN_IN: (state, action) => {
            state.push(action.payload);
        },
        RESET: (state) => {
            state.length = 0;
        }
    }
})

const { actions, reducer } = AuthSlice;
export const { CLOSE_SIGN_UP_FORM, CLOSE_SIGN_IN_FORM, RESET } = actions;
export default reducer;