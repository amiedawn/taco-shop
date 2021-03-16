import { useReducer } from 'react';
import {
  UPDATE_ITEMS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of `UPDATE_ITEMS`, return a new state object with an updated items array
    case UPDATE_ITEMS:
      return {
        ...state,
        items: [...action.items],
      };

    // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    default:
      return state;
  }
};

export function useItemReducer(initialState) {
  return useReducer(reducer, initialState);
}