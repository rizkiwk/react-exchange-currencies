import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { storeRateAmount, getCurrencyList, updateCurrencyList } from '../redux/Values';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import '../assets/css/header.css';
import NumberFormat from 'react-number-format';

class Header extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state  = {
            rate_amount: 1,
            currency_list: [],
        };
    }

    componentDidMount() {
        this.props.storeRateAmount(this.state.rate_amount);
        this.props.getCurrencyList();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rate_amount != null) {
            this.setState({ rate_amount: nextProps.rate_amount });
        }

        if (nextProps.currency_list != null) {
            this.setState({ currency_list: nextProps.currency_list });
        }
    }

    render() {
        const { classes } = this.props;

        return(
            <AppBar position="fixed" className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <div className="appbar-wrapper">
                        <div className="appbar-top">
                            <p>USD - United States Dollars</p>
                        </div>
                        <div className="appbar-bottom">
                            <p>USD</p>
                            <FormControl className="appbar-col-right">
                                <TextField 
                                    className={classes.input}
                                    value={this.state.rate_amount} 
                                    onChange={(values) => this.__onChangeRateAmount(values)}
                                    InputProps = {
                                        {
                                            className: classes.input_text,
                                            inputComponent: this._renderNumberFormat,
                                        }
                                    }
                                />
                            </FormControl>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }

    _renderNumberFormat = (props) => {
        const { inputRef, onChange, ...other } = props;

        return(
            <NumberFormat 
                {...other}
                prefix="$"
                thousandSeparator={true}
                getInputRef={inputRef}
                onValueChange = {
                    values => onChange({
                        value: values.value,
                        floatValue: values.floatValue,
                    })
                }
            />
        );
    };

    __onChangeRateAmount    = (values) => {
        // console.log('__onChangeRateAmount: '+JSON.stringify(values));
        if (values.floatValue !== undefined) {
            if (this.state.currency_list.length > 0) {
                this.props.updateCurrencyList(values.floatValue);
            }
            
            this.props.storeRateAmount(values.floatValue);
        }
    };

}

const styles    = (theme) => ({
    appbar: {
        height: 80,
    },

    toolbar: {
        height: '100%',
    },

    input: {
        borderBottomColor: 'white',
    },
    input_text: {
        textAlign: 'right',
        color: 'white',
    },
});

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    rate_amount: state.rate_amount,
    currency_list: state.currency_list,
});

const mapDispatchToProps = (dispatch) => {
    return {
        storeRateAmount: (amount) => dispatch(storeRateAmount(amount)),
        getCurrencyList: () => dispatch(getCurrencyList()),
        updateCurrencyList: (amount) => dispatch(updateCurrencyList(amount)),
    }
};


export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(Header);
// export default withStyles(styles)(Header);