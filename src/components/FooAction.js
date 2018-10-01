import React from 'react';
import PropTypes from 'prop-types';
import Act from 'accounting';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { setCurrencyList, getCurrencyList } from '../redux/Values';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import CurrencyTitle from '../assets/json/CurrencyTitle.json';

class FooAction extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state  = {
            show_button_add: true,
            show_button_select: false,
            select_base_list: [],
            selected_base: null,
            base_rates: null,
            rate_amount: null,
            currency_list: [],
        };
    }

    componentDidMount() {
        this.props.getCurrencyList();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.base_list != null) {
            this.setState({ select_base_list: nextProps.base_list });
        }

        if (nextProps.base_rate_list != null) {
            this.setState({ base_rates: nextProps.base_rate_list });
        }

        if (nextProps.rate_amount != null) {
            this.setState({ rate_amount: nextProps.rate_amount });
        }

        if (nextProps.currency_list !== undefined) {
            this.setState({ currency_list: nextProps.currency_list });
        }
    }

    render() {
        const { classes }   = this.props;

        return(
            <div className={classes.fooaction_root}>
                { this.state.show_button_add && this._renderButtonAddCurrency() }

                { this.state.show_button_select && this._renderButtonSelectCurrency() }
            </div>
        );
    }

    _renderButtonAddCurrency    = () => {
        const { classes }   = this.props;

        return(
            <div className={classes.button_wrapper}>
                <Button variant="contained" color="secondary" onClick={this.__onClickButtonAdd.bind(this)}>(+) Add More Currencies</Button>
            </div>
        );
    };

    _renderButtonSelectCurrency = () => {
        const { classes }   = this.props;

        return(
            <FormControl className={classes.select_wrapper}>
                <NativeSelect 
                    className={classes.select_input} 
                    onChange={this.__onChangeSelectBase}
                    disableUnderline>
                    { 
                        this.state.select_base_list.length > 0 && this.state.select_base_list.map((item, index) => {
                            return(
                                <option key={index} value={item}>{item}</option>
                            )
                        }) 
                    }
                </NativeSelect>

                <Button className={classes.select_submit} variant="contained" onClick={this.__onClickButtonSubmit.bind(this)}>Submit</Button>
            </FormControl>
        );
    };

    __onClickButtonAdd  = () => this.setState({
        show_button_add: false,
        show_button_select: true,
    });

    __onChangeSelectBase    = (e) => {
        this.setState({ selected_base: e.target.value });
    };

    __onClickButtonSubmit  = () => {
        const { select_base_list, base_rates, selected_base }    = this.state;

        if (select_base_list.length > 0 && base_rates != null) {
            if (selected_base == null) {
                const base = select_base_list[0];

                this.___createCurrencyItem(base);
            } else {
                this.___createCurrencyItem(selected_base);
            }
        }
    };

    ___createCurrencyItem   = (base) => {
        const { base_rates, rate_amount, currency_list }  = this.state;

        const currencyRate      = (rate_amount * base_rates[base]);
        const baseInfo          = base + " - " + CurrencyTitle[base];
        const defaultRate       = "1 USD = " + base + " " + Act.formatNumber(base_rates[base], 2, ",");

        const paramCurrency = {
            base: base,
            base_rate: base_rates[base],
            base_info: baseInfo,
            currency_rate: currencyRate,
            default_rate: defaultRate,
        };

        const filter = currency_list.filter(item => item.base === base);

        // console.log('paramCurrency: ' + JSON.stringify(filter.length));
        this.setState({ selected_base: null, show_button_add: true, show_button_select: false });

        if (filter.length === 0) this.props.setCurrencyList(paramCurrency);
        else alert('You have rate in list.');
    };

}

const styles = (theme) => ({
    fooaction_root: {
        paddingTop: 16,
        paddingBottom: 16,
    },

    button_wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    select_wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0.4)',
        borderRadius: 2,
    },
    select_input: {
        flexGrow: 2,
        paddingLeft: theme.spacing.unit * 2,
    },
    select_submit: {
        flexGrow: 1,
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        borderLeftColor: 'rgba(0,0,0,0.4)',
        borderRadius: 0,
        backgroundColor: '#e0e0e0',
        boxShadow: 'none',
    },
});

FooAction.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    base_list: state.base_list,
    base_rate_list: state.base_rate_list,
    rate_amount: state.rate_amount,
    currency_list: state.currency_list,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrencyList: (arrayItem) => dispatch(setCurrencyList(arrayItem)),
        getCurrencyList: () => dispatch(getCurrencyList()),
    }
};


export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(FooAction);
// export default withStyles(styles)(FooAction);