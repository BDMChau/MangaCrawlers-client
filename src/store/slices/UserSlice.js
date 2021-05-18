import Cookies from 'universal-cookie';

const { createSlice } = require("@reduxjs/toolkit");

const cookies = new Cookies()

const UserSlice = createSlice({
    name: "UserSlice",
    initialState: cookies.get("user") ? [cookies.get("user")] : [],
    reducers: {
        SIGNIN: (state, action) => {
            state.push(action.payload)
        },
        LOGOUT: (state) => {
            state.length = [];
        }
    }
})

const { actions, reducer } = UserSlice;
export const { SIGNIN, LOGOUT } = actions;

export default reducer;