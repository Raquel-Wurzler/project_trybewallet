import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWith from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

const EMAIL = 'email@test.com';
const DESCRICAO = 'Descrição:';

const initialState = {
  user: {
    email: EMAIL,
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [],
    editor: false,
    idToEdit: 0,
    error: '',
    loading: false,
  },
};

// const initialState2 = {
//   user: {
//     email: 'email@test.com',
//   },
//   wallet: {
//     currencies: [
//       Object.keys(mockData),
//     ],
//     expenses: [
//       {
//         id: 0,
//         value: '1',
//         description: '1',
//         currency: 'USD',
//         method: 'Cartão de crédito',
//         tag: 'Trabalho',
//         exchangeRates: mockData,
//       },
//     ],
//     editor: true,
//     idToEdit: 0,
//   },
// };

describe('Testing the application', () => {
  it('1- The home page contains inputs and button', () => {
    renderWith(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });
  it('2- Checks if inputs and button work correctly', () => {
    const { history } = renderWith(<App />);
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });
    expect(buttonEntrar.disabled).toBeTruthy();
    userEvent.type(screen.getByLabelText(/email/i), EMAIL);
    userEvent.type(screen.getByLabelText(/senha/i), '123456');
    expect(buttonEntrar.disabled).toBeFalsy();
    userEvent.click(buttonEntrar);
    expect(history.location.pathname).toBe('/carteira');
  });
  it('3- checks if the header renders correctly', () => {
    renderWith(<App />, { initialEntries: ['/carteira'], initialState });
    expect(screen.getByRole('heading', { name: EMAIL, level: 4 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /0.00/i, level: 4 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /brl/i, level: 4 })).toBeInTheDocument();
  });
  it('4- checks that WalletForm and Table component elements render correctly', () => {
    renderWith(<App />, { initialEntries: ['/carteira'], initialState });
    expect(screen.getByLabelText(/valor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pagamento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/moeda/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Descrição' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Tag' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Método de pagamento' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Valor' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Moeda' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Câmbio utilizado' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Valor convertido' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Moeda de conversão' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Editar/Excluir' })).toBeInTheDocument();
  });
  it('5- The add expense form works correctly', async () => {
    global.fetch = jest.fn(async () => ({ json: async () => mockData }));
    renderWith(<App />, { initialEntries: ['/carteira'], initialState });
    userEvent.type(screen.getByLabelText('Valor:'), '10');
    userEvent.type(screen.getByLabelText(DESCRICAO), 'donuts');
    userEvent.selectOptions(screen.getByLabelText('Método de Pagamento:'), 'Dinheiro');
    userEvent.selectOptions(screen.getByLabelText('Categoria:'), 'Alimentação');
    userEvent.selectOptions(screen.getByLabelText('Moeda:'), 'USD');
    const buttonAdd = screen.getByRole('button', { name: 'Adicionar despesa' });
    userEvent.click(buttonAdd);
    const descriptionTable = await screen.findByRole('cell', { name: 'donuts' });
    const tagTable = await screen.findByRole('cell', { name: 'Alimentação' });
    const methodTable = await screen.findByRole('cell', { name: 'Dinheiro' });
    const valueTable = await screen.findByRole('cell', { name: '10.00' });
    const coinTable = await screen.findByRole('cell', { name: 'Dólar Americano/Real Brasileiro' });
    const buttonEditar = await screen.findByRole('button', { name: 'Editar' });
    const buttonExcluir = await screen.findByRole('button', { name: 'Excluir' });
    const econversionCurrencyTable = await screen.findByRole('cell', { name: 'BRL' });
    const haederTotal = await screen.findByTestId('total-field');
    await waitFor(() => expect(descriptionTable).toBeInTheDocument());
    await waitFor(() => expect(tagTable).toBeInTheDocument());
    await waitFor(() => expect(methodTable).toBeInTheDocument());
    await waitFor(() => expect(valueTable).toBeInTheDocument());
    await waitFor(() => expect(coinTable).toBeInTheDocument());
    await waitFor(() => expect(econversionCurrencyTable).toBeInTheDocument());
    await waitFor(() => expect(buttonEditar).toBeInTheDocument());
    await waitFor(() => expect(buttonExcluir).toBeInTheDocument());
    await waitFor(() => expect(haederTotal).toHaveTextContent('47.53'));

    userEvent.type(screen.getByLabelText('Valor:'), '100');
    userEvent.type(screen.getByLabelText(DESCRICAO), 'hotel');
    userEvent.selectOptions(screen.getByLabelText('Método de Pagamento:'), 'Cartão de crédito');
    userEvent.selectOptions(screen.getByLabelText('Categoria:'), 'Lazer');
    userEvent.selectOptions(screen.getByLabelText('Moeda:'), 'CAD');
    userEvent.click(buttonAdd);
    const tagTable2 = await screen.findByRole('cell', { name: 'Lazer' });
    const methodTable2 = await screen.findByRole('cell', { name: 'Cartão de crédito' });
    const valueTable2 = await screen.findByRole('cell', { name: '100.00' });
    const coinTable2 = await screen.findByRole('cell', { name: 'Dólar Canadense/Real Brasileiro' });
    const econversionCurrencysTable = await screen.findAllByRole('cell', { name: 'BRL' });
    const buttonsEditar = await screen.findAllByRole('button', { name: 'Editar' });
    const buttonsExcluir = await screen.findAllByRole('button', { name: 'Excluir' });
    await waitFor(() => expect(tagTable2).toBeInTheDocument());
    await waitFor(() => expect(methodTable2).toBeInTheDocument());
    await waitFor(() => expect(valueTable2).toBeInTheDocument());
    await waitFor(() => expect(coinTable2).toBeInTheDocument());
    await waitFor(() => expect(econversionCurrencysTable).toHaveLength(2));
    await waitFor(() => expect(buttonsEditar).toHaveLength(2));
    await waitFor(() => expect(buttonsExcluir).toHaveLength(2));
    await waitFor(() => expect(haederTotal).toHaveTextContent('423.12'));
    await waitFor(() => userEvent.click(buttonEditar));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Editar despesa' })).toBeInTheDocument());
    userEvent.type(screen.getByLabelText('Valor:'), '25');
    userEvent.type(screen.getByLabelText(DESCRICAO), 'cookie');
    userEvent.click(screen.getByRole('button', { name: 'Editar despesa' }));
    const descriptionEdited = await screen.findByRole('cell', { name: 'cookie' });
    await waitFor(() => expect(descriptionEdited).toBeInTheDocument());
    const valueEdited = await screen.findByRole('cell', { name: '25.00' });
    await waitFor(() => expect(valueEdited).toBeInTheDocument());
    await waitFor(() => expect(haederTotal).toHaveTextContent('494.42'));
    userEvent.click(buttonExcluir);
    const btnEditar = await screen.findAllByRole('button', { name: 'Editar' });
    await waitFor(() => expect(btnEditar).toHaveLength(1));
    const btnExcluir = await screen.findAllByRole('button', { name: 'Editar' });
    await waitFor(() => expect(btnExcluir).toHaveLength(1));
    await waitFor(() => expect(haederTotal).toHaveTextContent('375.59'));
  });
});
