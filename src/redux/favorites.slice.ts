import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FavoriteUsers } from "../interfaces/favUser.interface";
import { loadState } from "./storage";

export const FAVORITES_STORAGE_STATE = 'favoritesData';

export interface FavoritesState {
  favoriteUsers: FavoriteUsers[];
}

const initialState: FavoritesState = loadState<FavoritesState>(FAVORITES_STORAGE_STATE) ?? {
  favoriteUsers: []
} 

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<FavoriteUsers>) => {
      const isUserFavorite = state.favoriteUsers.find(obj => obj.userId === action.payload.userId);
      if (isUserFavorite) {
        state.favoriteUsers = state.favoriteUsers.filter(obj => obj.userId !== action.payload.userId);
      } else {
        state.favoriteUsers.push(action.payload);
      }
    },
    clearFavorites: (state) => {
      state.favoriteUsers = [];
    }
  }
});

export const { addToFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
console.log(favoritesSlice.reducer);
