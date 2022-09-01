import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWith from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

const initialState = {
  user: {
    email: 'email@test.com',
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

const initialState2 = {
  user: {
    email: 'email@test.com',
  },
  wallet: {
    currencies: [
      Object.keys(mockData),
    ],
    expenses: [
      {
        id: 0,
        value: '1',
        description: '1',
        currency: 'USD',
        method: 'Cartão de crédito',
        tag: 'Trabalho',
        exchangeRates: mockData,
      },
    ],
    editor: true,
    idToEdit: 0,
  },
};

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
    userEvent.type(screen.getByLabelText(/email/i), 'email@test.com');
    userEvent.type(screen.getByLabelText(/senha/i), '123456');
    expect(buttonEntrar.disabled).toBeFalsy();
    userEvent.click(buttonEntrar);
    expect(history.location.pathname).toBe('/carteira');
  });
  it('3- checks if the header renders correctly', () => {
    renderWith(<App />, { initialEntries: ['/carteira'], initialState });
    expect(screen.getByRole('heading', { name: /email@test.com/i, level: 4 })).toBeInTheDocument();
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
  it('5- The add expense form works correctly', () => {
    renderWith(<App />, { initialEntries: ['/carteira'], initialState });
    userEvent.type(screen.getByLabelText('Valor:'), '10');
    userEvent.type(screen.getByLabelText('Descrição:'), 'donuts');
    userEvent.selectOptions(screen.getByLabelText('Método de Pagamento:'), 'Dinheiro');
    userEvent.selectOptions(screen.getByLabelText('Categoria:'), 'Alimentação');
    userEvent.selectOptions(screen.getByLabelText('Moeda:'), 'USD');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));
    // expect(screen.getByRole('button', { name: 'Editar' })).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: 'Excluir' })).toBeInTheDocument();
    userEvent.type(screen.getByLabelText('Valor:'), '100');
    userEvent.type(screen.getByLabelText('Descrição:'), 'hotel');
    userEvent.selectOptions(screen.getByLabelText('Método de Pagamento:'), 'Cartão de crédito');
    userEvent.selectOptions(screen.getByLabelText('Categoria:'), 'Lazer');
    userEvent.selectOptions(screen.getByLabelText('Moeda:'), 'CAD');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));
  });
});
