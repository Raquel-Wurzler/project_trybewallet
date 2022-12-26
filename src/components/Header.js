import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const updateSum = expenses.reduce((acc, expense) => {
      const mult = Number(expense.value)
      * Number(expense.exchangeRates[expense.currency].ask);
      return acc + mult;
    }, 0).toFixed(2);
    return (
      <section className="hero is-link">
        <div className="hero-body">
          <h4 data-testid="email-field" className="subtitle">{ email }</h4>
          <h4
            data-testid="total-field"
            id="totalField"
            className="title"
          >
            { updateSum }
          </h4>
          <h4 data-testid="header-currency-field" className="subtitle">BRL</h4>
        </div>
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
