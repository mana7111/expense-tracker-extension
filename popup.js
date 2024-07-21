document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expenseForm');
    if (expenseForm) {
      expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
  
        const date = document.getElementById('date').value;
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
  
        const expense = { date, amount, category, description };
  
        chrome.runtime.sendMessage({ action: 'addExpense', expense: expense }, function(response) {
          if (response.success) {
            console.log('Expense added.');
            displayExpenses();
          }
        });
      });
    }
  
    function displayExpenses() {
      chrome.runtime.sendMessage({ action: 'getExpenses' }, function(response) {
        const expenses = response.expenses || [];
        const expensesDiv = document.getElementById('expenses');
        expensesDiv.innerHTML = '';
        expenses.forEach(function(expense) {
          const expenseDiv = document.createElement('div');
          expenseDiv.textContent = `${expense.date} - ${expense.amount} - ${expense.category} - ${expense.description}`;
          expensesDiv.appendChild(expenseDiv);
        });
      });
    }
  
    displayExpenses();
  });
  