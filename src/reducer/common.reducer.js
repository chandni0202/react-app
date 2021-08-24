import { GET_DATA, GET_UNIQUE_DATA} from "../types/common_action_type";

const initialState = {
  data : null,
  uniqueData: null,
};

// function to return new status (action + initial state)
export default function dashboardReducer (state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: action.payload
      };
      case GET_UNIQUE_DATA:
      return {
        ...state,
        uniqueData: action.payload
      };
    default:
      return state;
  }
};