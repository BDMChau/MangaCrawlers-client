const { createSlice } = require("@reduxjs/toolkit");


const userSlice = createSlice({
    name: "usersSlice",
    initialState: [],
    reducers:{
        LOGIN: (state, action) => {

        },
        LOGOUT: (state) => {

        }
    }
})

const {actions, reducer} = userSlice;
export const {LOGIN, LOGOUT} = actions;
export default reducer;