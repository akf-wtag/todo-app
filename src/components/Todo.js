import { useState } from 'react';
import Input from './Input';
import { FaEdit, FaTrash, FaRegSave } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import PropTypes from 'prop-types';

const Todo = ({
  id,
  name,
  checked,
  onChangeTodos,
  isEditing,
  onEdit,
  onEditCancel,
  isChecking,
  onCheck,
  isDeleting,
  onDelete,
  onSave,
}) => {
  const [newName, setNewName] = useState('');

  let isChecked = false;
  if (checked) isChecked = true;

  const saveHandler = () => {
    onSave(id);
    onChangeTodos(id, newName, checked, false);
    setNewName('');
  };

  return (
    <li className={isEditing ? 'editing-list' : 'not-editing-list'}>
      {isChecking ? (
        <div className='check-loading'></div>
      ) : (
        <Input
          type='checkbox'
          onChange={() => {
            onCheck(id);
            onChangeTodos(id, name, !checked, false);
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
          <div className={checked ? 'todo-completed' : 'todo-name'}>{name}</div>
          <FaEdit
            onClick={() => {
              onEdit(id);
              setNewName(name);
            }}
            className='edit-icon'
          />
          {isDeleting ? (
            <div className='check-loading'></div>
          ) : (
            <FaTrash
              onClick={() => {
                onDelete(id);
                onChangeTodos(id, name, checked, true);
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
  isEditing: false,
  onChangeTodos: () => {},
  onEdit: () => {},
  onEditCancel: () => {},
  onSave: () => {},
};

Todo.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onChangeTodos: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onEditCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Todo;
