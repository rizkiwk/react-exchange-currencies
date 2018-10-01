import * as Types from './Types';


export function storeBaseList(response) {
    return {
        type: Types.STORE_BASE_LIST,
        json: response,
    }
}
export function resetBaseList() {
    return {
        type: Types.RESET_BASE_LIST,
    }
}

export function storeBaseRateList(response) {
    return {
        type: Types.STORE_BASE_RATE_LIST,
        json: response,
    }
}
export function resetBaseRateList() {
    return {
        type: Types.RESET_BASE_RATE_LIST,
    }
}

export function storeRateAmount(amountValue) {
    return {
        type: Types.STORE_RATE_AMOUNT,
        amount: amountValue,
    }
}
export function resetRateAmount() {
    return {
        type: Types.RESET_RATE_AMOUNT,
    }
}

export function setCurrencyList(arrayItem) {
    return {
        type: Types.SET_CURRENCY_LIST,
        json: arrayItem,
    }
}
export function getCurrencyList() {
    return {
        type: Types.GET_CURRENCY_LIST,
    }
}
export function updateCurrencyList(rateAmount) {
    return {
        type: Types.UPDATE_CURRENCY_LIST,
        amount: rateAmount,
    }
}
export function deleteCurrencyList(indexItem) {
    return {
        type: Types.DELETE_CURRENCY_LIST,
        index: indexItem,
    }
}
export function resetCurrencyList() {
    return {
        type: Types.RESET_CURRENCY_LIST,
    }
}