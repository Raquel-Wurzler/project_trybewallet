// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const CHANGES_WALLET = 'CHANGES_WALLET';

export const addUser = (email) => ({
  type: ADD_USER,
  email,
});

export const changesWallet = () => ({
  type: CHANGES_WALLET,
});
