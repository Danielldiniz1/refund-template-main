//Seleciona os elementos do formulário
const form = document.querySelector('form');
const expenseInput = document.querySelector('#expense');
const categoryInput = document.querySelector('#category');
const valueInput = document.querySelector('#value');
const amount = document.querySelector('#amount');

//Seleciona os elementos da lista 
const expenseList = document.querySelector('ul');
const expensesQuantity = document.querySelector('aside header p span');
const expensesTotal = document.querySelector("aside header h2")

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
//Adiciona um novo item na lista
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

    //Cria o valor da despesa
    const expenseAmount = document.createElement('span');
    expenseAmount.classList.add('expense-amount');
    expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount.toUpperCase().replace('R$', '')}`;


    //Cria o icone de excluir
    const removeIcon = document.createElement('img');
    removeIcon.classList.add('remove-icon');
    removeIcon.setAttribute("src", 'img/remove.svg');
    removeIcon.setAttribute("alt", 'Remover');
    
    
    //Adiciona as info no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
    expenseList.append(expenseItem);
    
    //Limpa o formulário
    formClear();

    //Atualiza os totais
    updateTotals();
  }catch (error){
    alert("Não foi possivel atualizar a lista de despesas");
    console.log(error);
    
  }

}

function updateTotals(){
    try {
        //Recupera todos os itens da lista de despesas
        const items = expenseList.children;
        
        //Atualiza a quantidade de despesas
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "Despesas" : "Despesa"}`;
        
        //Variavel para incrementar o total.
        let total = 0;
        //Percorre cada item (li) da lista (ul)
        for(let item = 0; item < items.length; item++){
            const itemAmount = items[item].querySelector('.expense-amount');

            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".");

            //Converte o valor para float
            value = parseFloat(value);
            if (isNaN(value)) {
                return alert("Não foi possivel atualizar os totais");
            }
            total += Number(value);
        }
        //Criar span para adicionar o R$ formatado.
        const symbolBRL = document.createElement("small");
        symbolBRL.textContent = "R$";
        //Formata o valor e remove o R$ que será exibido pela small com um estilo customizado.
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");
        //Limpas o contúdo do elemento
      expensesTotal.innerHTML = "";

      //Adiciona o simbolo e o valor formatado total
      expensesTotal.append(symbolBRL, total);

        //Atualiza o total
        expensesTotal.textContent = total;
    } catch (error) {
        console.log(error);
        alert("Não foi possivel atualizar os totais");
        
    }
}

//Evento que captura clique no item da lista;

expenseList.addEventListener("click", function(e){
    //Verifivar se o elemento clicado é o botão de remover
    if(e.target.classList.contains("remove-icon")){
    //Obtém a li pai do icone de remover
    const item = e.target.closest(".expense");
    //Remove o item da lista
    item.remove();
    //Atualiza os totais
    updateTotals();
    }
})

function formClear (){
    expense.value = "";
    category.value = "";
    amount.value = "";
}