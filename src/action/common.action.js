import { GET_DATA, GET_UNIQUE_DATA} from "../types/common_action_type";

export const getUserData =  () => {return  async dispatch => {
    const url = "https://jsonplaceholder.typicode.com/users";
    const data = await fetch(url);
    const resp = await data.json();
      dispatch({
        type: GET_DATA,
        payload: resp,
      })
}
};

export const getUniqueUserData =  (userID) => {return  async dispatch => {
  const url = `https://jsonplaceholder.typicode.com/users/${userID}`;
  const data = await fetch(url);
  const resp = await data.json();
    dispatch({
      type: GET_UNIQUE_DATA,
      payload: resp,
    })
}
};