import { useState } from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import Button from './Button';
import Input from './Input';
import { FaRegSave } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';

const Labelcard = ({
  labelId,
  labelName,
  todos,
  searchText,
  postTodo,
  checkUpdate,
  deleteTodo,
  todoNameUpdate,
  deleteCard,
}) => {
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [isPostingTodo, setIsPostingTodo] = useState(false);
  const [newTodoName, setNewTodoName] = useState('');

  let incompleteTodos = [];
  let completeTodos = [];

  todos.forEach((todo) => {
    if (todo.labelId === labelId) {
      if (
        searchText === '' ||
        todo.name.toLowerCase().includes(searchText.toLowerCase())
      ) {
        if (!todo.checked) incompleteTodos.push(todo);
        else completeTodos.push(todo);
      }
    }
  });

  return (
    <>
      <div key={labelId} className='single-card-container'>
        <div className='card-header'>
          <Button
            type='button'
            btnName='Add'
            className='add-to-card-btn'
            onClick={() => {
              setIsAddingTodo(true);
            }}
          />
          <div className='card-label'>{labelName}</div>
          <Button
            type='button'
            btnName='Delete'
            className='delete-card-btn'
            onClick={() => {
              deleteCard(labelId);
            }}
          />
        </div>

        {incompleteTodos.length > 0 ? (
          <>
            <div className='todo-title-text'>Incomplete</div>
            <ul>
              {incompleteTodos.map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    todoId={todo.id}
                    todoName={todo.name}
                    checked={todo.checked}
                    checkUpdate={(todoId, checked) =>
                      checkUpdate(todoId, checked)
                    }
                    deleteTodo={(todoId) => deleteTodo(todoId)}
                    todoNameUpdate={(todoId, todoName, callback) =>
                      todoNameUpdate(todoId, todoName, callback)
                    }
                  />
                );
              })}
            </ul>
          </>
        ) : (
          ''
        )}

        {completeTodos.length > 0 ? (
          <>
            <div className='todo-title-text'>Complete</div>
            <ul>
              {completeTodos.map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    todoId={todo.id}
                    todoName={todo.name}
                    checked={todo.checked}
                    checkUpdate={(todoId, checked) =>
                      checkUpdate(todoId, checked)
                    }
                    deleteTodo={(todoId) => deleteTodo(todoId)}
                    todoNameUpdate={(todoId, todoName, callback) =>
                      todoNameUpdate(todoId, todoName, callback)
                    }
                  />
                );
              })}
            </ul>
          </>
        ) : (
          ''
        )}

        {isAddingTodo ? (
          <div className='add-new-item'>
            {isPostingTodo ? (
              <div className='small-loader'></div>
            ) : (
              <>
                <Input
                  type='text'
                  name={newTodoName}
                  onChange={(e) => setNewTodoName(e.target.value)}
                  focus={true}
                  className='edit-text-input'
                />
                <FaRegSave
                  onClick={() => {
                    setIsPostingTodo(true);
                    postTodo(labelId, newTodoName, () => {
                      setIsPostingTodo(false);
                      setIsAddingTodo(false);
                    });
                    setNewTodoName('');
                  }}
                  className='save-icon'
                />

                <ImCancelCircle
                  onClick={() => {
                    setIsAddingTodo(false);
                    setNewTodoName('');
                  }}
                  className='cancel-icon'
                />
              </>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

Labelcard.defaultProps = {
  labelId: '',
  labelName: '',
  todos: [{ name: '', checked: false, id: '', labelId: '' }],
  searchText: '',
  postTodo: () => {},
  checkUpdate: () => {},
  deleteTodo: () => {},
  todoNameUpdate: () => {},
  deleteCard: () => {},
};

Labelcard.propTypes = {
  labelId: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      checked: PropTypes.bool,
      id: PropTypes.string,
      labelId: PropTypes.string,
    })
  ).isRequired,
  searchText: PropTypes.string.isRequired,
  postTodo: PropTypes.func.isRequired,
  checkUpdate: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todoNameUpdate: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default Labelcard;
