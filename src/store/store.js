
import { createStore, applyMiddleware ,compose} from 'redux';
import dashboardReducer from "../reducer/common.reducer";
import thunkMiddleware from 'redux-thunk';

const store = createStore(
  dashboardReducer,
    compose(
        applyMiddleware(thunkMiddleware)
    )
);

export default store;