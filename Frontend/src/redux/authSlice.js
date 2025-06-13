import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null
    },
    reducers:{
        // actions hase
        setLoading:(state,action) => {
            state.loading = action.payload; // payload etle addidtional information thay,ema aapde value pass karvani hpy
                                           // ema thi je value aavse e state ma loading che uper ema store thai jase
        },
        setUser:(state,action) => {
            state.user = action.payload
        }
    }
});

export const {setLoading,setUser} = authSlice.actions; // setLoading name nu ek function che e export karie che

export default authSlice.reducer;