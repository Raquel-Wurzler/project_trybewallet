// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_WALLET,
  RECEIVE_WALLET_SUCCESS,
  RECEIVE_WALLET_FAILURE,
  EXPENSES_WALLET,
  REMOVE_WALLET,
  EDIT_WALLET,
  SAVE_EDIT,
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
    return { ...state, loading: true };
  case RECEIVE_WALLET_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((curr) => curr !== 'USDT'),
      loading: false,
    };
  case EXPENSES_WALLET:
    return {
      ...state,
      loading: false,
      expenses: [
        ...state.expenses,
        {
          id: action.id,
          value: action.value,
          description: action.description,
          currency: action.currency,
          method: action.method,
          tag: action.tag,
          exchangeRates: action.exchangeRates,
        },
      ],
    };
  case REMOVE_WALLET:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.payload),
    };
  case EDIT_WALLET:
    return { ...state, editor: true, idToEdit: action.payload,
    };
  case SAVE_EDIT:
    return { ...state,
      editor: false,
      expenses: [...state.expenses
        .map((exp) => (exp.id !== state.idToEdit ? exp : action.payload))],
      idToEdit: 0 };
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
