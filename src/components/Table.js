import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteWallet, editWallet } from '../redux/actions';

class Table extends Component {
  btnDelete = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteWallet(id));
  };

  btnEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(editWallet(id));
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
              data-testid="edit-btn"
              type="button"
              onClick={ () => this.btnEdit(id) }
              className="button is-link is-outlined is-small"
            >
              Editar
            </button>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => this.btnDelete(id) }
              className="button is-danger is-outlined is-small"
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });

    return (
      <table className="table is-narrow">
        <thead className="thead">
          <tr className="tr">
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
        <tbody className="tbody">
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
