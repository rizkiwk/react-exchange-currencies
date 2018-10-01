import * as Types from './Types';

export function BaseListRedux(state = null, action) {
    switch (action.type) {
        case Types.STORE_BASE_LIST:
            return action.json;

        case Types.RESET_BASE_LIST:
            state = null;
            return state;

        default:
            return state;
    }
}

export function BaseRateListRedux(state = null, action) {
    switch (action.type) {
        case Types.STORE_BASE_RATE_LIST:
            return action.json;

        case Types.RESET_BASE_RATE_LIST:
            state = null;
            return state;

        default:
            return state;
    }
}

export function RateAmountRedux(state = null, action) {
    switch (action.type) {
        case Types.STORE_RATE_AMOUNT:
            return action.amount;

        case Types.RESET_RATE_AMOUNT:
            state = null;
            return state;

        default:
            return state;
    }
}

export function CurrencyListRedux(state = [], action) {
    switch (action.type) {
        case Types.SET_CURRENCY_LIST:
            return [...state, action.json];

        case Types.GET_CURRENCY_LIST:
            return state;

        case Types.UPDATE_CURRENCY_LIST:
            let newCurrencies   = [];    

            if (state.length > 0) {
                state.map((item) => {
                    item.currency_rate = (item.base_rate * action.amount);
                    newCurrencies.push(item);
                });
            }
            return newCurrencies;

        case Types.DELETE_CURRENCY_LIST:
            state.splice(action.index, 1);
            return [...state];

        case Types.RESET_BASE_RATE_LIST:
            return [];

        default:
            return state;
    }
}