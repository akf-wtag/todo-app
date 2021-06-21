import Todo from './Todo';
import { useState } from 'react';
import PropTypes from 'prop-types';

const TodoList = ({
  todos,
  onChangeTodos,
  todosTitle,
  todoIdToCheck,
  setTodoIdToCheck,
  todoIdToDelete,
  setTodoIdToDelete,
  setTodoIdToSave,
  todoIdToSave,
}) => {
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
      <ul className={todos.length > 0 ? 'todo-container' : ''}>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            name={todo.name}
            checked={todo.checked}
            onChangeTodos={(id, name, checked, isDelClicked) =>
              onChangeTodos(id, name, checked, isDelClicked)
            }
            isEditing={todo.id === todoIdToEdit}
            onEdit={(id) => setTodoIdToEdit(id)}
            onEditCancel={() => setTodoIdToEdit(null)}
            isChecking={todo.id === todoIdToCheck}
            onCheck={(id) => setTodoIdToCheck(id)}
            isDeleting={todo.id === todoIdToDelete}
            onDelete={(id) => setTodoIdToDelete(id)}
            isSaving={todo.id === todoIdToSave}
            onSave={(id) => {
              setTodoIdToEdit(null);
              setTodoIdToSave(id);
            }}
          />
        ))}
      </ul>
    </>
  );
};

TodoList.defaultProps = {
  todos: [{ name: '', checked: false, id: null }],
  onChangeTodos: () => {},
  todosTitle: '',
  todoIdToCheck: null,
  setTodoIdToCheck: () => {},
  todoIdToDelete: null,
  setTodoIdToDelete: () => {},
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      checked: PropTypes.bool,
      id: PropTypes.number,
    })
  ).isRequired,
  onChangeTodos: PropTypes.func.isRequired,
  todosTitle: PropTypes.string.isRequired,
  todoIdToCheck: PropTypes.number,
  setTodoIdToCheck: PropTypes.func.isRequired,
  todoIdToDelete: PropTypes.number,
  setTodoIdToDelete: PropTypes.func.isRequired,
};

export default TodoList;
