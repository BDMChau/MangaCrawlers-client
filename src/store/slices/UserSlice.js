const { createSlice } = require("@reduxjs/toolkit");


const UserSlice = createSlice({
    name: "UserSlice",
    initialState: [],
    reducers:{
        LOGIN: (state, action) => {

        },
        LOGOUT: (state) => {

        }
    }
})

const {actions, reducer} = UserSlice;
export const {LOGIN, LOGOUT} = actions;
export default reducer;