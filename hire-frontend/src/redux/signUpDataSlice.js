import { createSlice } from "@reduxjs/toolkit"; // Corrected the import statement for redux toolkit

const initialState = {
  resumeUrl: "",
  profile: null,
  userCategories: "",
  userSkills: "",
  budget: "",
  linkUrl: "",
  selectedFile: null,
};

const signUpDetails = createSlice({
  name: "signUpDetails",
  initialState,
  reducers: {
    setResumeUrl: (state, action) => {
      state.resumeUrl = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setUserCategories: (state, action) => {
      state.userCategories = action.payload;
    },
    setUserSkills: (state, action) => {
      state.userSkills = action.payload;
    },
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    setBudget: (state, action) => {
      state.budget = action.payload;
    },
    setLinkUrl: (state, action) => {
      state.linkUrl = action.payload;
    },
  },
});

// Exporting the action creators
export const {
  setResumeUrl,
  setProfile,
  setUserCategories,
  setUserSkills,
  setSelectedFile,
  setBudget,
  setLinkUrl,
} = signUpDetails.actions;

export default signUpDetails.reducer;
