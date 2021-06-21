import { useState } from 'react';
import Input from './Input';
import { FaEdit, FaTrash, FaRegSave } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import PropTypes from 'prop-types';
import deleteTodo from '../api/delete';
import updateTodo from '../api/update';
import getTodos from '../api/get';

const Todo = ({
  id,
  name,
  checked,
  updatedTodos,
  isEditing,
  onEdit,
  onEditCancel,
}) => {
  const [newName, setNewName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  let isChecked = false;
  if (checked) isChecked = true;

  const saveHandler = () => {
    setIsSaving(true);
    const updateResponse = updateTodo(id, newName, checked);
    updateResponse.then((response) => {
      const getResponse = getTodos();
      getResponse.then((response) => {
        updatedTodos(response.data);
        setIsSaving(false);
      });
    });
    setNewName('');
    onEditCancel();
  };

  return (
    <li className={isEditing ? 'editing-list' : 'not-editing-list'}>
      {isChecking ? (
        <div className='check-loading'></div>
      ) : (
        <Input
          type='checkbox'
          onChange={() => {
            setIsChecking(true);
            const updateResponse = updateTodo(id, name, !checked); //how to mock async
            updateResponse.then((response) => {
              const getResponse = getTodos();
              getResponse.then((response) => {
                updatedTodos(response.data);
                setIsChecking(false);
              });
            });
          }}
          isChecked={isChecked}
        />
      )}

      {isEditing ? (
        <>
          <Input
            type='text'
            name={newName}
            onChange={(e) => setNewName(e.target.value)}
            focus={true}
            onKeyPress={saveHandler}
          />

          <FaRegSave onClick={saveHandler} className='save-icon' />

          <ImCancelCircle
            onClick={() => {
              onEditCancel();
              setNewName('');
            }}
            className='cancel-icon'
          />
        </>
      ) : (
        <>
          {isSaving ? (
            <div className='check-loading'></div>
          ) : (
            <div className={checked ? 'todo-completed' : 'todo-name'}>
              {name}
            </div>
          )}
          <FaEdit
            onClick={() => {
              onEdit(id);
              setNewName(name); //how to mock test setNewName
            }}
            className='edit-icon'
          />
          {isDeleting ? (
            <div className='check-loading'></div>
          ) : (
            <FaTrash
              onClick={() => {
                setIsDeleting(true);
                const deleteResponse = deleteTodo(id);
                deleteResponse.then((response) => {
                  const getResponse = getTodos();
                  getResponse.then((response) => {
                    updatedTodos(response.data);
                    setIsDeleting(false);
                  });
                });
              }}
              className='trash-icon'
            />
          )}
        </>
      )}
    </li>
  );
};

Todo.defaultProps = {
  id: null,
  name: '',
  checked: false,
  updatedTodos: () => {},
  isEditing: false,
  onEdit: () => {},
  onEditCancel: () => {},
};

Todo.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  updatedTodos: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onEditCancel: PropTypes.func.isRequired,
};

export default Todo;
