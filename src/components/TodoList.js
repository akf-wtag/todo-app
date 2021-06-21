import Todo from './Todo';
import { useState } from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos, updatedTodos, todosTitle }) => {
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
            updatedTodos={(data) => updatedTodos(data)} //how to mock test updatedTodos
            isEditing={todo.id === todoIdToEdit}
            onEdit={(id) => setTodoIdToEdit(id)}
            onEditCancel={() => setTodoIdToEdit(null)}
          />
        ))}
      </ul>
    </>
  );
};

TodoList.defaultProps = {
  todos: [{ name: '', checked: false, id: null }],
  updatedTodos: () => {},
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
  updatedTodos: PropTypes.func.isRequired,
  todosTitle: PropTypes.string.isRequired,
};

export default TodoList;
