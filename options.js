document.addEventListener('DOMContentLoaded', function() {
    const optionsForm = document.getElementById('optionsForm');
    
    // Load current settings
    chrome.runtime.sendMessage({ action: 'getBudget' }, function(response) {
      document.getElementById('budget').value = response.budget || 0;
    });
  
    chrome.runtime.sendMessage({ action: 'getCategories' }, function(response) {
      document.getElementById('categories').value = (response.categories || []).join(', ');
    });
  
    // Save settings on form submission
    optionsForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const budget = document.getElementById('budget').value;
      const categories = document.getElementById('categories').value.split(',').map(function(item) {
        return item.trim();
      });
  
      chrome.runtime.sendMessage({ action: 'setBudget', budget: budget }, function(response) {
        if (response.success) {
          console.log('Budget updated.');
        }
      });
  
      chrome.runtime.sendMessage({ action: 'setCategories', categories: categories }, function(response) {
        if (response.success) {
          console.log('Categories updated.');
        }
      });
  
      alert('Settings saved successfully!');
    });
  });
  