import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        fetchSingleJob: null, // aa aapdu che
        searchJobByText: "",
        allAppliedJobs: [],
        fetchId:[], // aa aapdu che
        searchQuery:"",
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload
        },
        setfetchSingleJob: (state, action) => { // aa aapdu che
            state.fetchSingleJob = action.payload
        },
        setallAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload
        },
        setSearchQuery: (state,action) => {
            state.searchQuery = action.payload;
        },
        setfetchId: (state,action) => { // aa aapdu che
            state.fetchId = action.payload;
        }

    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setfetchSingleJob,
    setallAppliedJobs,
    setSearchQuery,
    setfetchId
 }
    = jobSlice.actions;
export default jobSlice.reducer;