// Function to initialize or reset storage with default values
console.log('Background script loaded');
function initializeStorage() {
    chrome.storage.sync.get(['expenses', 'budget', 'categories'], function(result) {
      if (!result.expenses) {
        chrome.storage.sync.set({ expenses: [] }, function() {
          console.log('Expenses initialized.');
        });
      }
      if (!result.budget) {
        chrome.storage.sync.set({ budget: 0 }, function() {
          console.log('Budget initialized.');
        });
      }
      if (!result.categories) {
        chrome.storage.sync.set({ categories: [] }, function() {
          console.log('Categories initialized.');
        });
      }
    });
  }
  
  // Initialize storage when the extension is installed or updated
  chrome.runtime.onInstalled.addListener(function() {
    console.log('Extension installed or updated.');
    initializeStorage();
  });
  
  // Listen for messages from other parts of the extension
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'getExpenses') {
      chrome.storage.sync.get(['expenses'], function(result) {
        sendResponse({ expenses: result.expenses });
      });
      return true; // Indicate that you will send a response asynchronously
    }
    if (message.action === 'addExpense') {
      chrome.storage.sync.get(['expenses'], function(result) {
        const expenses = result.expenses || [];
        expenses.push(message.expense);
        chrome.storage.sync.set({ expenses: expenses }, function() {
          console.log('Expense added.');
          sendResponse({ success: true });
        });
      });
      return true; // Indicate that you will send a response asynchronously
    }
    if (message.action === 'getBudget') {
      chrome.storage.sync.get(['budget'], function(result) {
        sendResponse({ budget: result.budget });
      });
      return true; // Indicate that you will send a response asynchronously
    }
    if (message.action === 'setBudget') {
      chrome.storage.sync.set({ budget: message.budget }, function() {
        console.log('Budget updated.');
        sendResponse({ success: true });
      });
      return true; // Indicate that you will send a response asynchronously
    }
    if (message.action === 'getCategories') {
      chrome.storage.sync.get(['categories'], function(result) {
        sendResponse({ categories: result.categories });
      });
      return true; // Indicate that you will send a response asynchronously
    }
    if (message.action === 'setCategories') {
      chrome.storage.sync.set({ categories: message.categories }, function() {
        console.log('Categories updated.');
        sendResponse({ success: true });
      });
      return true; // Indicate that you will send a response asynchronously
    }
  });
  
  // Optional: Listen for alarms or periodic tasks
  chrome.alarms.create('cleanup', { periodInMinutes: 60 });
  
  chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'cleanup') {
      console.log('Performing cleanup task.');
      // Perform cleanup or maintenance tasks
    }
  });
  