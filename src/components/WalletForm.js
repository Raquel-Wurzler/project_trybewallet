import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWallet, fetchWalletExpenses, saveEditWallet } from '../redux/actions';
import './components.css';

class WalletForm extends Component {
  state = {
    id: -1,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWallet());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  btnAdd = () => {
    this.setState((prevState) => ({ id: prevState.id + 1 }), () => {
      const { dispatch, editor, expenses, idToEdit } = this.props;
      if (editor === false) {
        dispatch(fetchWalletExpenses(this.state));
      } else {
        const newState = this.state;
        const newExpense = expenses;
        newState.exchangeRates = newExpense[0].exchangeRates;
        newState.id = idToEdit;
        dispatch(saveEditWallet(newState));
      }
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      });
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, method, tag, currency } = this.state;
    return (
      <div className="contai">
        <form className="form login-form box form1">
          <div className="valor-descrição">
            <label htmlFor="value" className="margin-inputs no-margin">
              Valor:
              <br />
              <input
                type="text"
                id="value"
                name="value"
                value={ value }
                data-testid="value-input"
                onChange={ this.handleChange }
                className="input is-focused is-small value marg"
              />
            </label>
            <br />
            <label htmlFor="description" className="margin-inputs no-margin">
              Descrição:
              <br />
              <input
                type="text"
                id="description"
                name="description"
                value={ description }
                data-testid="description-input"
                onChange={ this.handleChange }
                className="input is-link is-small description marg"
              />
            </label>
          </div>
          <label htmlFor="method" className="select is-multiple margin-inputs">
            Método de Pagamento:
            <select
              data-testid="method-input"
              id="method"
              value={ method }
              name="method"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag" className="select is-multiple margin-inputs">
            Categoria:
            <select
              data-testid="tag-input"
              id="tag"
              value={ tag }
              name="tag"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="currency" className="select is-multiple margin-inputs">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency"
              value={ currency }
              name="currency"
              onChange={ this.handleChange }
            >
              {
                currencies.map((curr, i) => (
                  <option key={ i } value={ curr }>{curr}</option>
                ))
              }
            </select>
          </label>
          <button
            type="button"
            onClick={ this.btnAdd }
            className="button is-link is-focused btn"
          >
            { editor ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
