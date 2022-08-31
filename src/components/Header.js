import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  captureValues = () => {
    const { expenses } = this.props;
    const expenseReducer = expenses.reduce((acc, expense) => {
      const mult = Number(expense.value)
      * Number(expense.exchangeRates[expense.currency].ask);
      return acc + mult;
    }, 0);
    return expenseReducer;
  };

  render() {
    const { email } = this.props;
    const updateSum = this.captureValues().toFixed(2);
    return (
      <section>
        <h4 data-testid="email-field">{ email }</h4>
        <h4 data-testid="total-field" id="totalField">{ updateSum }</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
