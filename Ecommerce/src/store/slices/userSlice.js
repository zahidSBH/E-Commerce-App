import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { fetchUserProfile, updateUserProfile } from "@/services/userService";
import createUserModel, { DEFAULT_USER_MODEL } from "@/models/userModel";
import SliceStatus from "@/enums/SliceStatus";

const initialState = {
  profile: createUserModel(),
  status: SliceStatus.IDLE,
  error: null,
};

const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async ({ uid }, { rejectWithValue }) => {
    const { data, error } = await fetchUserProfile({ uid });
    if (error) return rejectWithValue(error);
    return data;
  },
);

const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ uid, payload }, { rejectWithValue }) => {
    const { error } = await updateUserProfile({ uid, payload });
    if (error) return rejectWithValue(error);
    return payload;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = createUserModel(action.payload);
    },
    clearProfile: (state) => {
      state.profile = createUserModel();
      state.status = SliceStatus.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;
        state.profile = createUserModel(action.payload);
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = SliceStatus.SUCCEEDED;
        state.profile = createUserModel({
          ...state.profile,
          ...action.payload,
        });
      })

      .addMatcher(
        isAnyOf(fetchProfile.pending, updateProfile.pending),
        (state) => {
          state.status = SliceStatus.LOADING;
          state.error = null;
        },
      )

      .addMatcher(
        isAnyOf(fetchProfile.rejected, updateProfile.rejected),
        (state, action) => {
          state.status = SliceStatus.FAILED;
          state.error = action.payload;
        },
      );
  },
});

const selectUserProfile = (state) => state.user.profile;
const selectUserStatus = (state) => state.user.status;
const selectUserError = (state) => state.user.error;
const selectUserUid = (state) => state.user.profile.uid;
const selectIsProfileLoaded = (state) =>
  state.user.profile.uid !== DEFAULT_USER_MODEL.uid;

export const { setProfile, clearProfile } = userSlice.actions;
export {
  fetchProfile,
  updateProfile,
  selectUserProfile,
  selectUserStatus,
  selectUserError,
  selectUserUid,
  selectIsProfileLoaded,
};
export default userSlice.reducer;
