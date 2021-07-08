import { useState } from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import { FaRegSave } from 'react-icons/fa';
import Card from '@wtag/rcl-card';
import Input from '@wtag/rcl-input';
import Button from '@wtag/rcl-button';
import Icon from '@wtag/rcl-icon';
import IconButton from '@wtag/rcl-icon-button';
import { Spinner } from '@wtag/react-comp-lib';

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
    <Card
      transparent={false}
      hasPadding={true}
      headerCenter={true}
      title={labelName}
      className='single-card-container'
    >
      {isDeletingCard ? (
        <Spinner color='success' bgColor='neutral' size='tiny' />
      ) : (
        <>
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
                      className='todo'
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

          <>
            {isAddingTodo && isPostingTodo ? (
              <Spinner color='success' bgColor='neutral' size='tiny' />
            ) : !isPostingTodo && !isAddingTodo ? (
              <div className='card-btns'>
                <Button
                  className='todo-add-btn'
                  version='v2'
                  type='success'
                  size='tiny'
                  label='Add'
                  onClick={() => {
                    setIsAddingTodo(true);
                  }}
                />

                <Button
                  version='v2'
                  type='danger'
                  size='tiny'
                  label='Delete'
                  onClick={() => {
                    setIsDeletingCard(true);
                    deleteCard(labelId, () => {
                      setIsDeletingCard(false);
                    });
                  }}
                />
              </div>
            ) : (
              <div className='add-todo-container'>
                <Input
                  size='tiny'
                  value={newTodoName}
                  autoFocus={true}
                  onChange={(e) => setNewTodoName(e)}
                />

                <IconButton
                  className='save-icon-btn'
                  icon={<FaRegSave />}
                  size='tiny'
                  color='success'
                  onClick={() => {
                    setIsPostingTodo(true);
                    postTodo(labelId, newTodoName, () => {
                      setIsPostingTodo(false);
                      setIsAddingTodo(false);
                    });
                    setNewTodoName('');
                  }}
                />
                <IconButton
                  className='close-icon-btn'
                  icon={<Icon name='close' />}
                  color='danger'
                  size='tiny'
                  onClick={() => {
                    setIsAddingTodo(false);
                    setNewTodoName('');
                  }}
                />
              </div>
            )}
          </>
        </>
      )}
    </Card>
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
