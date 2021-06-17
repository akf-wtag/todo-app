import Todo from './Todo';
import { useState } from 'react';

const TodoList = ({ todos, onChangeTodos, todosTitle }) => {
  const [todoIdToEdit, setTodoIdToEdit] = useState();
  return (
    <>
      {todos.length > 0 ? (
        <header>
          <h2>{todosTitle}</h2>
        </header>
      ) : (
        ''
      )}
      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            name={todo.name}
            checked={todo.checked}
            isEditing={todo.id === todoIdToEdit}
            onChangeTodos={(id, name, checked) =>
              onChangeTodos(id, name, checked)
            }
            onEdit={(id) => setTodoIdToEdit(id)}
            onEditCancel={() => setTodoIdToEdit(null)}
            onSave={() => setTodoIdToEdit(null)}
          />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
