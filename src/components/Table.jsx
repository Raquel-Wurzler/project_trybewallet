import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Table extends Component {
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
            <th>Editar/Excluir.7</th>
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
};

export default connect(mapStateToProps)(Table);
