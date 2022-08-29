import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import store from '../redux/store';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <section>
        <h4 data-testid="email-field">{ email }</h4>
        <h4 data-testid="total-field">0</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
