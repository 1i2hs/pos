import { combineReducers } from "redux";
import {
  ADD_MENU_IN_ORDER,
  DELETE_MENU_IN_ORDER,
  DELETE_ALL_MENU_IN_ORDER,
  INCREMENT_MENU_COUNT,
  DECREMENT_MENU_COUNT,
  RECEIVE_MENU,
  ADD_MENU,
  MODIFY_MENU,
  DELETE_MENU
} from "../actions";

const order = (state = [], action) => {
  switch (action.type) {
    case ADD_MENU_IN_ORDER:
      const newMenu = action.menu;
      let isDuplicateMenu = false;
      let stateClone = state.map(menu => {
        if (menu.mno === newMenu.mno) {
          menu.mcount++;
          menu.mnetsales = menu.mcount * menu.mprice;
          isDuplicateMenu = true;
        }
        return menu;
      });
      return isDuplicateMenu
        ? stateClone
        : stateClone.concat([
            Object.assign({}, action.menu, {
              key: action.menu.mno,
              mcount: 1,
              mnetsales: action.menu.mprice
            })
          ]);
    case DELETE_MENU_IN_ORDER:
      return state.filter(menu => menu.mno !== action.menu.mno);
    case DELETE_ALL_MENU_IN_ORDER:
      return [];
    case INCREMENT_MENU_COUNT:
      return state.map(menu => {
        if (menu.mno === action.menu.mno) {
          menu.mcount++;
          menu.mnetsales = menu.mcount * menu.mprice;
        }
        return menu;
      });
    case DECREMENT_MENU_COUNT:
      return state.map(menu => {
        if (menu.mno === action.menu.mno && menu.mcount - 1 > 0) {
          menu.mcount--;
          menu.mnetsales = menu.mcount * menu.mprice;
        }
        return menu;
      });
    default:
      return state;
  }
};

const menu = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_MENU:
      return action.menu;
    case ADD_MENU:
      return [...state, action.menu];
    case MODIFY_MENU:
      return state.map(menu => {
        if (menu.mno === action.menu.mno) {
          return action.menu;
        }
        return menu;
      });
    case DELETE_MENU:
      return state.filter(menu => menu.mno !== action.menu.mno);
    default:
      return state;
  }
};

export default combineReducers({
  order,
  menu
});
