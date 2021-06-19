import Todo from './Todo';
import { useState } from 'react';
import PropTypes from 'prop-types';

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
      <ul className={todos.length > 0 ? 'todo-container' : ''}>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            name={todo.name}
            checked={todo.checked}
            isEditing={todo.id === todoIdToEdit}
            onChangeTodos={(id, name, checked, isDelClicked) =>
              onChangeTodos(id, name, checked, isDelClicked)
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

TodoList.defaultProps = {
  todos: [{ name: '', checked: false, id: null }],
  onChangeTodos: () => {},
  todosTitle: '',
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
};

export default TodoList;
