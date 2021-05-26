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
        },
        UPDATE_AVATAR: (state, action) => {
            state[0].user_avatar = action.payload;
        }
    }
})

const { actions, reducer } = UserSlice;
export const { SIGNIN, LOGOUT, UPDATE_AVATAR } = actions;

export default reducer;