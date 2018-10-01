import React from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { apiGetBaseRates } from '../api/RatesAPI';

import Grid from '@material-ui/core/Grid';

import Header from '../components/Header';
import ListCurrency from '../components/ListCurrency';
import FooAction from '../components/FooAction';

import '../assets/css/main_page.css';

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state  = {
            data_rate_amount: 1,
        };
    }

    componentDidMount() {
        this.props.apiGetBaseRates("USD");
    }

    render() {
        return(
            <div className="App">
                <Grid container>
                    <Grid item xs={12}>
                        <Header 
                            onSetAmount={(rateAmount) => this.__onSetRateAmount(rateAmount)} 
                        />

                        <main className="main-content">
                            <ListCurrency />
                        </main>

                        <FooAction />
                    </Grid>
                </Grid>
            </div>
        );
    }

    __onSetRateAmount   = (rateAmount) => {
        this.setState({ data_rate_amount: rateAmount });
    };

}

const mapStateToProps = state => ({
    base_list: state.base_list,
});

const mapDispatchToProps = (dispatch) => {
    return {
        apiGetBaseRates: (paramBase) => dispatch(apiGetBaseRates(paramBase)),
    }
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(MainPage);