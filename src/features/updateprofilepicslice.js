import { createAsyncThunk,createSlice, } from "@reduxjs/toolkit";
import axios from "axios";

export const updateprofilepic=createAsyncThunk(
    "profile/updatePicture",
    async (formData, { getState , rejectWithValue})=>{
        try{
            const token= getState().user.user.token;
            const response = await axios.put(
                'http://127.0.0.1:8000/api/update-profile-pic/',formData,{
                    headers:{
                        Authorization: `Token ${token}`,
                        "Content-Type": "multipart/form-data",
                    },

                }
            );
            return response.data
        }catch (error){
            return rejectWithValue(error.response?.data?.error)

        }
        
    }

);

const updateprofileslice=createSlice({
    name:"updateProfile",
    initialState:{
        loading:false,
        error:false,
        message:null,
    },
    reducers:{
        clearProfileUpdateStatus:(state)=>{
            state.error=null;
            state.message=null;
        },
    },

    extraReducers:(builder)=>{
        builder
        .addCase(updateprofilepic.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.message=null;
        })
        .addCase(updateprofilepic.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
          })
          .addCase(updateprofilepic.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }

})
export const {clearProfileUpdateStatus}=updateprofileslice.actions;
export default updateprofileslice.reducer;