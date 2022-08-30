import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../redux/actions';

const MAX_LENGTH_PASSWORD = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  btnSubmit = () => {
    console.log('test');
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addUser(email));
    history.push('/carteira');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const format = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      // /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i
      let isEmailValid = false;
      if (email.match(format)) {
        isEmailValid = true;
      } else {
        isEmailValid = false;
      }
      if (password.length >= MAX_LENGTH_PASSWORD && isEmailValid) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  };

  render() {
    const { isDisabled, email, password } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={ email }
            id="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            value={ password }
            id="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.btnSubmit }
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
