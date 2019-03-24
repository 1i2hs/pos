export const ADD_MENU_IN_ORDER = "ADD_MENU_IN_ORDER";
export const DELETE_MENU_IN_ORDER = "DELETE_MENU_IN_ORDER";
export const DELETE_ALL_MENU_IN_ORDER = "DELETE_ALL_MENU_IN_ORDER";
export const INCREMENT_MENU_COUNT = "INCREMENT_MENU_COUNT";
export const DECREMENT_MENU_COUNT = "DECREMENT_MENU_COUNT";

export const ADD_MENU = "ADD_MENU";
export const MODIFY_MENU = "MODIFY_MENU";
export const DELETE_MENU = "DELETE_MENU";
export const RECEIVE_MENU = "RECEIVE_MENU";

export const addMenuInOrder = menu => ({
  type: ADD_MENU_IN_ORDER,
  menu
});

export const deleteMenuInOrder = menu => ({
  type: DELETE_MENU_IN_ORDER,
  menu
});

export const deleteAllMenuInOrder = () => ({
  type: DELETE_ALL_MENU_IN_ORDER
});

export const incrementMenuCount = menu => ({
  type: INCREMENT_MENU_COUNT,
  menu
});

export const decrementMenuCount = menu => ({
  type: DECREMENT_MENU_COUNT,
  menu
});

// must be asynchronous
export const addMenu = menu => ({
  type: ADD_MENU,
  menu
});

// must be asynchronous
export const modifyMenu = menu => ({
  type: MODIFY_MENU,
  menu
});

// must be asynchronous
export const deleteMenu = menu => ({
  type: DELETE_MENU,
  menu
});

// must be asynchronous
export const receiveMenu = menu => ({
  type: RECEIVE_MENU,
  menu
});

const fetchMenu = () => {};

const shouldFetchMenu = state => {};

export const fetchMenuIfNeeded = () => {};
