import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../helpers/API";
import { AuthResponse } from "../interfaces/auth.interface";
import { loadState } from "./storage";

export const JWT_STATE = 'userData';

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  registerErrorState?: string;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_STATE)?.jwt ?? null
}

// # TODO: Изменить API для регистрации Пользователя
export const registerUser = createAsyncThunk('user/register', 
  async (params: {email: string, password: string}) => {
    try {
      const { data } = await axios.post<AuthResponse>(`${PREFIX}/register`, {
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          id: 1,
          token: "some-random-token"
        }
      }
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearRegisterError: (state) => {
      state.registerErrorState = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.token;
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerErrorState = action.error.message;
    })
  }
})

export const { logout, clearRegisterError } = userSlice.actions;
export default userSlice.reducer;