const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

window.addEventListener('load', () => {
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  savedTodos.forEach(todo => createTodoElement(todo.text, todo.completed));
});

function saveTodos() {
  const todos = [];
  document.querySelectorAll('.todo-list-item').forEach(item => {
    const text = item.querySelector('.todo-item').textContent;
    const completed = item.querySelector('.todo-item').classList.contains('completed');
    todos.push({ text, completed });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoElement(text, completed = false) {
  const todoItemBox = document.createElement('span');
  todoItemBox.className = 'todo-list-item';

  const todoItemText = document.createElement('span');
  todoItemText.className = 'todo-item';
  todoItemText.textContent = text;

  if (completed) {
    todoItemText.classList.add('completed');
    todoItemText.style.cssText = `
      color: #fff;
      background-color: #28a746a6;`;
  }

  const todoItemButtons = document.createElement('span');
  todoItemButtons.className = 'todo-item-buttons';

  const completeButton = document.createElement('button');
  completeButton.className = 'complete-button';
  completeButton.textContent = 'Complete';

  const editButton = document.createElement('button');
  editButton.className = 'edit-button';
  editButton.textContent = 'Edit';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';

  todoItemButtons.append(completeButton, editButton, deleteButton);
  todoItemBox.append(todoItemText, todoItemButtons);
  todoList.appendChild(todoItemBox);

  completeButton.addEventListener('click', function () {
    todoItemText.classList.toggle('completed');
    if (todoItemText.classList.contains('completed')) {
      todoItemText.style.cssText = `
        color: #fff;
        background-color: #28a746a6;`;
    } else {
      todoItemText.style.cssText = `
      color: #000;
      background-color: #f7f7f7;`;
    }
    saveTodos();
  });

  editButton.addEventListener('click', function () {
    if (editButton.textContent === 'Edit') {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = todoItemText.textContent;
      input.className = 'edit-input';

      todoItemBox.insertBefore(input, todoItemButtons);
      todoItemText.remove();

      editButton.textContent = 'Save';
      editButton.style.backgroundColor = '#4caf50';
    } else {
      const input = todoItemBox.querySelector('.edit-input');
      const newText = input.value.trim();

      if (newText !== '') {
        todoItemText.textContent = newText;
      }

      input.remove();
      todoItemBox.insertBefore(todoItemText, todoItemButtons);
      editButton.textContent = 'Edit';
      editButton.style.backgroundColor = '#2196f3';
      saveTodos();
    }
  });

  deleteButton.addEventListener('click', function () {
    todoItemBox.remove();
    saveTodos();
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  if (text === '') return;
  createTodoElement(text);
  todoInput.value = '';
  saveTodos();
}

todoInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});
