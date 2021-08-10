const { createSlice } = require("@reduxjs/toolkit");


const ApiSlice = createSlice({
    name: "ApiSlice",
    initialState: [],
    reducers: {
        SET_ARRAY_WEEKLY_MANGA: (state, action) => {
            state.push(action.payload);
        },
      
    }
});

const { actions, reducer } = ApiSlice;
export const { SET_ARRAY_WEEKLY_MANGA } = actions;
export default reducer;