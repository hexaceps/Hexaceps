import { createSlice } from '@reduxjs/toolkit'
import { loginPost } from '../api/memberApi'
import { createAsyncThunk } from '@reduxjs/toolkit'


const initState = {

        email: localStorage.getItem('email') || ''
      
}



//createAsyncThuck('이름', () => {})
export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) =>{
    console.log("파람",param)
        return loginPost(param)
})

const loginSlice = createSlice({
    name:'LoginSlice',
    initialState:  initState,
    reducers:{/*
        login: (state, action) => {
            console.log("login.....")
           const data = action.payload
            return {email : data.email}
        },*/
        logout: (state, action) => {
            console.log("logout...")
            localStorage.removeItem('email');  

            return { ...initState}

        }
    } ,
    extraReducers:(builder) => {
        builder
        .addCase(loginPostAsync.pending, (state,action) => {
            //데이터 오는중

            
            console.log("Pending : 데이터 오는중")
         
          })

          .addCase(loginPostAsync.fulfilled, (state, action) => {
                  //데이터 다받음 성공
            console.log("fulfilled : 성공",action)
            const { email } = action.meta.arg;

            state.email = email;

          // Save to localStorage
          localStorage.setItem('email', email);

          })
          .addCase(loginPostAsync.rejected, (state, action) => {
            //데이터 받기 실패

            state.error = action.error.message;
            console.log("rejected : 실패")
    })
}
})

export const {login, logout } = loginSlice.actions

export default loginSlice.reducer



