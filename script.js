//Seleciona os elementos do formulário
const form = document.querySelector('form');
const expenseInput = document.querySelector('#expense');
const categoryInput = document.querySelector('#category');
const valueInput = document.querySelector('#value');
const amount = document.querySelector('#amount');

//Capturando o evento de input do campo de valor
amount.oninput = () => {
    //Obtem o valor atual do input e remove todos os caracteres não numéricos
    let value = amount.value.replace(/\D/g, '');

    //Transforma o valor em centavos
    value = Number(value) / 100;
    
    //Atualiza o valor do input
    amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL(value) {
    //Formata o valor para o padrão brasileiro
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    return value;
}


