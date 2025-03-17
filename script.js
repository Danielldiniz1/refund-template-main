//Seleciona os elementos do formulário
const form = document.querySelector('form');
const expenseInput = document.querySelector('#expense');
const categoryInput = document.querySelector('#category');
const valueInput = document.querySelector('#value');
const amount = document.querySelector('#amount');

//Seleciona os elementos da lista 
const expenseList = document.querySelector('ul');

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
    //Cria um novo elemento li para a lista de despesas
    const expenseItem = document.createElement('li');
    expenseItem.classList.add('expense');
   
    //Cria o icone de categoria.
    const expenseIcon = document.createElement('img');
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    //Crir a info da despesa
    const expenseInfo = document.createElement('div');
    expenseInfo.classList.add('expense-info');

    //Cria nome da despesa
    const expenseName = document.createElement('strong');
    expenseName.textContent = newExpense.expense;

    //Cria a categoria da despesa
    const expenseCategory = document.createElement('span');
    expenseCategory.textContent = newExpense.category_name;

    //Adiciona nome e categoria na div das info da despesa
    expenseInfo.append(expenseName, expenseCategory);

    //Adiciona as info no item
    expenseItem.append(expenseIcon, expenseInfo);
    expenseList.append(expenseItem);
    
  }catch (error){
    alert("Não foi possivel atualizar a lista de despesas");
    console.log(error);
    
  }

}