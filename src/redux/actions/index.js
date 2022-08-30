// Coloque aqui suas actions

export const ADD_USER = 'ADD_USER';
export const REQUEST_WALLET = 'REQUEST_WALLET';
export const RECEIVE_WALLET_SUCCESS = 'RECEIVE_WALLET_SUCCESS';
export const RECEIVE_WALLET_FAILURE = 'SUCCESS_WALLET_FAILURE';

export const addUser = (email) => ({
  type: ADD_USER,
  email,
});

const requestWallet = () => ({
  type: REQUEST_WALLET,
});

const receiveWalletSuccess = (currencies) => ({
  type: RECEIVE_WALLET_SUCCESS,
  currencies,
});

const requestWalletFailure = (error) => ({
  type: RECEIVE_WALLET_FAILURE,
  error,
});

const getWalletApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  return json;
};

export const fetchWallet = () => async (dispatch) => {
  dispatch(requestWallet());
  try {
    const response = await getWalletApi();
    dispatch(receiveWalletSuccess(response));
  } catch (err) {
    dispatch(requestWalletFailure(err));
  }
};
