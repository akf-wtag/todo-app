import { useState } from 'react';
import Input from './Input';

import { FaEdit, FaTrash, FaRegSave } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';

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
    <li>
      {isEditing ? (
        <>
          <Input
            type='text'
            name={newName}
            onChange={(e) => setNewName(e.target.value)}
            focus={true}
          />
          <FaRegSave
            onClick={() => {
              onChangeTodos(id, newName, checked);
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
        </>
      ) : (
        <>
          <p className={`${checked ? 'todo-completed' : 'todo-name'}`}>
            {name}
          </p>
          <Input
            type='checkbox'
            onChange={() => onChangeTodos(id, name, !checked)}
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
            onClick={() => onChangeTodos(id, name, checked)}
            className='trash-icon'
          />
        </>
      )}
    </li>
  );
};

export default Todo;
