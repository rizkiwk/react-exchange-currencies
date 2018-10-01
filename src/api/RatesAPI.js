import Axios from 'axios';
import Endpoint from '../constants/Endpoint';
import * as Values from '../redux/Values';


export function apiGetBaseRates(paramBase) {
    return dispatch => {
        return new Axios({
            method:'get',
            url: Endpoint.API_CURRENCY + 'latest?base=' + paramBase,
            responseType: 'json',
        })
        .then(response => {
            // console.log('apiGetBaseRates.response: '+JSON.stringify(response.data));
            if (response.status === 200) {
                const result  = response.data;
                // console.log('Object.keys(result.rates): ' + JSON.stringify(Object.keys(result.rates)));
                
                dispatch(Values.storeBaseList(Object.keys(result.rates).sort()));
                dispatch(Values.storeBaseRateList(result.rates));
            } else {
                // dispatch(Values.errorUserVideoList('You are failed get video list.'));
            }
        })
        .catch(error => {
            // console.log('apiGetBaseRates.error: '+JSON.stringify(error));
            if (error.response !== undefined && error.response.data !== null) {
                // dispatch(Values.errorUserVideoList(error.response.data.message));
            } else {
                // dispatch(Values.errorUserVideoList('You are failed get video list.'));
            }
        });
    }
}