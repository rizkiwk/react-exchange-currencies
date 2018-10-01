import React from 'react';
import PropTypes from 'prop-types';
import Act from 'accounting';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { deleteCurrencyList } from '../redux/Values';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ListCurrency extends React.Component {

    constructor(props) {
        super(props);

        this.state  = {
            base_rates: null,
            rate_amount: null,
            currency_list: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.base_rate_list != null) {
            this.setState({ base_rates: nextProps.base_rate_list });
        }

        if (nextProps.rate_amount != null) {
            this.setState({ rate_amount: nextProps.rate_amount });
            // console.log('ListCurrency.rate_amount: ' + JSON.stringify(nextProps.rate_amount));
        }

        if (nextProps.currency_list !== undefined) {
            // console.log('nextProps.currency_list: ' + JSON.stringify(nextProps.currency_list));
            this.setState({ currency_list: nextProps.currency_list });
        }
    }

    render() {
        const { classes }   = this.props;
        const { currency_list }   = this.state;

        return(
            <GridList className={classes.grid_list} cols={1} cellHeight="auto">
                { currency_list.length > 0 && currency_list.map((item, index) => this._renderListItem(item, index)) }
            </GridList>
        );
    }

    _renderListItem = (item, index) => {
        const { classes }                   = this.props;

        return(
            <GridListTile key={index} className={classes.grid_tile} cols={1} >
                <div>
                    <Paper className={classes.paper} square elevation={1}>
                        <div className={classes.col_info}>
                            <div className={classes.info_top}>
                                <Typography className={classes.info_top_left}>{ item.base }</Typography>
                                <Typography className={classes.info_top_right}>{ Act.formatNumber(item.currency_rate, 2, ",") }</Typography>
                            </div>

                            <Typography className={classes.info_middle_text}>{ item.base_info }</Typography>

                            <Typography className={classes.info_bottom_text}>{ item.default_rate }</Typography>
                        </div>

                        <div className={classes.col_action}>
                            <Button className={classes.button_action_minus} onClick={() => this.__onClickDeleteItem(index)}>( - )</Button>
                        </div>
                    </Paper>
                </div>
            </GridListTile>
        );
    };

    __onClickDeleteItem = (itemIndex) => {
        this.props.deleteCurrencyList(itemIndex);
    };

}

const styles    = (theme) => ({
    grid_list: {
        width: '100%',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
    },
    grid_tile: {
        marginTop: 8,
        marginBottom: 8,
    },
    paper: {
        display: 'flex',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0.1)',
    },
    
    col_info: {
        flexGrow: 1,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
    },
    info_top: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    info_top_left: {
        flexGrow: 1,
        textAlign: 'left',
        fontSize: 12,
    },
    info_top_right: {
        flexGrow: 2,
        textAlign: 'right',
        fontSize: 12,
    },
    info_middle_text: {
        textAlign: 'left',
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    info_bottom_text: {
        textAlign: 'left',
        fontSize: 12,
    },

    col_action: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_action_minus: {
        height: '100%',
        padding: 0,
        margin: 0,
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        borderLeftColor: 'rgba(0,0,0,0.3)',
        borderRadius: 0,
    },
});

ListCurrency.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        base_rate_list: state.base_rate_list,
        rate_amount: state.rate_amount,
        currency_list: state.currency_list,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCurrencyList: (itemIndex) => dispatch(deleteCurrencyList(itemIndex)),
    }
};


export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(ListCurrency);
// export default withStyles(styles)(ListCurrency);