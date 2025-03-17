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
    //retorna o valor formatado
    return value;
}

//Captura o evento de submit do formulário
form.onsubmit = (event) => {
    event.preventDefault();
//Objeto com detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    //console.log(newExpense);
    //Chama a função para adicionar a nova despesa
    expenseAdd(newExpense);
}

function expenseAdd(newExpense) {
  try{
    
  }catch (error){
    alert("Não foi possivel atualizar a lista de despesas");
    console.log(error);
    
  }

}