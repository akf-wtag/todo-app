import { useState } from 'react';
import Input from './Input';
import Button from './Button';

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
          <Button
            onClick={() => {
              onChangeTodos(id, newName, checked);
              onSave();
              setNewName('');
            }}
            btnName='save'
          />

          <Button
            onClick={() => {
              onEditCancel();
              setNewName('');
            }}
            btnName='cancel'
          />
        </>
      ) : (
        <>
          <p>{name}</p>
          <Input
            type='checkbox'
            onChange={() => onChangeTodos(id, name, !checked)}
            isChecked={isChecked}
          />
          <Button
            onClick={() => {
              onEdit(id);
              setNewName(name);
            }}
            btnName='edit'
          />
        </>
      )}
    </li>
  );
};

export default Todo;
