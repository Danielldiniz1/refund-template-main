//Seleciona os elementos do formulário
const form = document.querySelector('form');
const expenseInput = document.querySelector('#expense');
const categoryInput = document.querySelector('#category');
const valueInput = document.querySelector('#value');
const amount = document.querySelector('#amount');

//Capturando o evento de input do campo de valor
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, '');
    amount.value = value;
}
