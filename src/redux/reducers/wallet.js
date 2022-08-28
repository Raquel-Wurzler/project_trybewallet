// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CHANGES_WALLET } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
};

function changesWallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CHANGES_WALLET:
    return {
      ...state,
      wallet: {
        ...state.wallet,
        currencies: state.wallet.currencies,
        expenses: state.wallet.expenses,
        editor: state.wallet.editor,
        idToEdit: state.wallet.idToEdit,
      },
    };
  default:
    return state;
  }
}

export default changesWallet;
