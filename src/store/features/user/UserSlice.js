import Cookies from 'universal-cookie';

const { createSlice } = require("@reduxjs/toolkit");

const cookies = new Cookies();

const UserSlice = createSlice({
    name: "UserSlice",
    initialState: cookies.get("user") ? [cookies.get("user")] : [],
    reducers: {
        SIGNIN: (state, action) => {
            state.push(action.payload);
        },
        LOGOUT: (state) => {
            state.length = [];
        },
        UPDATE_AVATAR: (state, action) => {
            state[0].user_avatar = action.payload;
        },
        UPDATE_DESC: (state, action) => {
            state[0].user_desc = action.payload;
        },
        SET_TRANSGROUP_ID: (state, action) => {
            if (action.payload === null) {
                delete state[0].user_transgroup_id
            } else {
                state[0].user_transgroup_id = action.payload;
            }
        },

        /////////////// notifications >>> [1]: list, [2]: fromRow 
        UPDATE_NOTI_LIST: (state, action) => {
            state[1] = action.payload
        },
        SET_FROM_POSITION: (state, action) => {
            state[2] = action.payload
        },
    
    }
});

const { actions, reducer } = UserSlice;
export const { SIGNIN, LOGOUT, UPDATE_AVATAR, UPDATE_DESC, SET_TRANSGROUP_ID } = actions;

export default reducer;