import { useState } from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
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
  const [isDeletingCard, setIsDeletingCard] = useState(false);

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
    <div>
      {isDeletingCard ? (
        <div></div>
      ) : (
        <div>
          <div>
            <div>{labelName}</div>
            {incompleteTodos.length > 0 ? (
              <>
                <div>Incomplete</div>
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
                <div>Complete</div>
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

            <div>
              <div>
                {isAddingTodo && isPostingTodo ? (
                  <div></div>
                ) : !isPostingTodo && !isAddingTodo ? (
                  <>
                    <button
                      onClick={() => {
                        setIsAddingTodo(true);
                      }}
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setIsDeletingCard(true);
                        deleteCard(labelId, () => {
                          setIsDeletingCard(false);
                        });
                      }}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <div>
                    <input
                      value={newTodoName}
                      autoFocus={true}
                      onChange={(e) => setNewTodoName(e.target.value)}
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
                    />
                    <ImCancelCircle
                      onClick={() => {
                        setIsAddingTodo(false);
                        setNewTodoName('');
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
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
