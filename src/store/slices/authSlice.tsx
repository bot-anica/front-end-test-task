import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginCredentials, IUserInfo } from "../../entities";

type AuthStatus = "idle" | "loading" | "succeeded" | "failed";

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUserInfo | null;
  error: string | null;
  status: AuthStatus;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  status: "idle",
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: ILoginCredentials) => {
    await new Promise((r) => setTimeout(r, 1000));

    if (
      credentials.email !== "test@test.test" ||
      credentials.password !== "password"
    ) {
      throw new Error("Invalid email or password");
    }

    return {
      email: credentials.email,
      name: "Test User",
      id: 1,
      role: "user",
    } as IUserInfo;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      Object.assign(state, initialState);
    },
    updateUserInfo(state, { payload }: PayloadAction<Partial<IUserInfo>>) {
      if (!state.user) return;

      state.user = {
        ...state.user,
        ...payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isAuthenticated = true;
        state.user = payload;
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error =
          action.error.message || "An error occurred during sign in";
        state.status = "failed";
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, updateUserInfo } = authSlice.actions;

export const selectAuth = (state: { auth: IAuthState }) => state.auth;

export default authSlice.reducer;
