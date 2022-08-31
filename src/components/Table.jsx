import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteWallet } from '../redux/actions';

class Table extends Component {
  btnDelete = (id) => {
    console.log('test delete button');
    const { dispatch } = this.props;
    dispatch(deleteWallet(id));
    const totalField = document.getElementById('totalField');
    console.log(totalField);
  };

  render() {
    const { expenses } = this.props;
    const tbody = expenses.map((exp) => {
      const { value, description, currency, method, tag, exchangeRates, id } = exp;
      return (
        <tr key={ id }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{Number(value).toFixed(2)}</td>
          <td>{exchangeRates[currency].name}</td>
          <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
          <td>{Number(value) * Number(exchangeRates[currency].ask)}</td>
          <td>BRL</td>
          <td>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => this.btnDelete(id) }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { tbody }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
