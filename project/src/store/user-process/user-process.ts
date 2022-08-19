import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isLogoutProcessing: false,
  isLogoutError: false,
  isLoginError: false
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    clearLogoutError: (state) => {
      state.isLogoutError = false;
    },
    clearLoginError: (state) => {
      state.isLoginError = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });

    builder
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoginError = !!action.error;
      });

    builder
      .addCase(logoutAction.pending, (state) => {
        state.isLogoutProcessing = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLogoutProcessing = false;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.isLogoutProcessing = false;
        state.isLogoutError = true;
      });
  }
});

export const { clearLogoutError, clearLoginError } = userProcess.actions;
