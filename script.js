const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

function addTodo() {
  if (todoInput.value.trim() === '') {
    return;
  }

  // create elements
  const todoItemBox = document.createElement('div');
  const todoItemText = document.createElement('span');
  const todoItemButtons = document.createElement('span');

  todoItemText.textContent = todoInput.value;

  // buttons
  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  // structure
  todoItemButtons.append(completeButton, editButton, deleteButton);
  todoItemBox.append(todoItemText, todoItemButtons);
  todoList.appendChild(todoItemBox);

  todoInput.value = '';

  // ✅ Complete Button
  completeButton.addEventListener('click', () => {
    todoItemText.style.textDecoration =
      todoItemText.style.textDecoration === 'line-through' ? 'none' : 'line-through';
  });

  // 📝 Edit Button
  editButton.addEventListener('click', () => {
    const newText = prompt('Edit your todo:', todoItemText.textContent);
    if (newText && newText.trim() !== '') {
      todoItemText.textContent = newText;
    }
  });

  // 🗑️ Delete Button
  deleteButton.addEventListener('click', () => {
    todoItemBox.remove();
  });
}
