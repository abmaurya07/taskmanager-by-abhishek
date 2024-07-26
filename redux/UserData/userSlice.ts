import { createSlice } from "@reduxjs/toolkit";


interface UserState {
    username: string,
    loggedIn: boolean
}


const initialState: UserState = {
    username: '',
    loggedIn: false
}



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername(state, action) {
            state.username = action.payload;
        },
        setLoggedIn(state, action) {
            state.loggedIn = action.payload;
        }
    }
})


export const { setUsername, setLoggedIn } = userSlice.actions;
export default userSlice.reducer