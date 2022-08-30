// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_WALLET,
  RECEIVE_WALLET_SUCCESS,
  RECEIVE_WALLET_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  error: '',
  loading: false,
};

const changesWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_WALLET:
    return {
      ...state,
      loading: true,
    };
  case RECEIVE_WALLET_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((curr) => curr !== 'USDT'),
      loading: false,
    };
  case RECEIVE_WALLET_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default changesWallet;
