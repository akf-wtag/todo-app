import { useState } from 'react';
import Input from './Input';
import { FaEdit, FaTrash, FaRegSave } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import PropTypes from 'prop-types';

const Todo = ({
  id,
  name,
  checked,
  isEditing,
  onChangeTodos,
  onEdit,
  onEditCancel,
  onSave,
}) => {
  const [newName, setNewName] = useState('');

  let isChecked = false;
  if (checked) isChecked = true;

  return (
    <>
      {isEditing ? (
        <li className='editing-list'>
          <Input
            type='text'
            name={newName}
            onChange={(e) => setNewName(e.target.value)}
            focus={true}
          />
          <FaRegSave
            onClick={() => {
              onChangeTodos(id, newName, checked, 0);
              onSave();
              setNewName('');
            }}
            className='save-icon'
          />

          <ImCancelCircle
            onClick={() => {
              onEditCancel();
              setNewName('');
            }}
            className='cancel-icon'
          />
        </li>
      ) : (
        <li className='not-editing-list'>
          <div className={checked ? 'todo-completed' : 'todo-name'}>{name}</div>
          <Input
            type='checkbox'
            onChange={() => onChangeTodos(id, name, !checked, 0)}
            isChecked={isChecked}
          />
          <FaEdit
            onClick={() => {
              onEdit(id);
              setNewName(name);
            }}
            className='edit-icon'
          />
          <FaTrash
            onClick={() => onChangeTodos(id, name, checked, 1)}
            className='trash-icon'
          />
        </li>
      )}
    </>
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
