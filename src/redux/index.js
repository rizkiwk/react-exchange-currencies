import { combineReducers, createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';

import { 
  BaseListRedux, BaseRateListRedux, 
  RateAmountRedux, CurrencyListRedux
} from './Actions';

const appReducer = combineReducers({
  base_list: BaseListRedux,
  base_rate_list: BaseRateListRedux,
  rate_amount: RateAmountRedux,
  currency_list: CurrencyListRedux,
});

// const loggerMiddleware  = createLogger();

const AppStore = () => {
  return createStore (
    appReducer,
    applyMiddleware(
    //   middleware,
      thunkMiddleware,
    //   loggerMiddleware,
    )
  );
}

export default AppStore;
