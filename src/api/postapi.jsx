import axios from 'axios';

// https://v6.exchangerate-api.com/v6/0f6cb47c3c6f8b1c78ba9cbf/latest/USD
const api = axios.create({
    baseURL: "https://v6.exchangerate-api.com/v6/0f6cb47c3c6f8b1c78ba9cbf"
});

export const currencyConverter = (fromCurrency, toCurrency, amount) => {
    return api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
}

