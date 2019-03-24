import axios from "axios";

const BASE_URL = "";
export const getMenu = () =>
  axios(`${BASE_URL}/`).catch(error => console.error(error));
