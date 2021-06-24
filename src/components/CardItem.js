import { useState } from 'react';
import Input from './Input';
import { FaEdit, FaRegSave } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go';
import { ImCancelCircle } from 'react-icons/im';
import del from '../api/delete';
import update from '../api/update';
// import getTodos from '../api/get';

const CardItem = ({ itemId, titleId, title, name, checked, updatedTodos }) => {
  const [newName, setNewName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const saveHandler = () => {
    // setIsSaving(true);
    // const updateResponse = updateTodo(itemId, titleId, title, newName, checked);
    // updateResponse.then((response) => {
    //   const getResponse = getTodos();
    //   getResponse.then((response) => {
    //     updatedTodos(response.data);
    //     setIsSaving(false);
    //   });
    // });
    // setNewName('');
    // setIsEditing(false);
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
            const updateResponse = update(
              `http://localhost:3000/todos/${itemId}`,
              { checked: !checked }
            );
            updateResponse.then((response) => {
              updatedTodos();
              setIsChecking(false);
            });
          }}
          isChecked={checked}
          className='checkbox'
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
            className='edit-text-input'
          />

          <FaRegSave onClick={saveHandler} className='save-icon' />

          <ImCancelCircle
            onClick={() => {
              setIsEditing(false);
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
            <div className={checked ? 'todo-completed' : 'item-name'}>
              {name}
            </div>
          )}
          <FaEdit
            className='edit-icon'
            onClick={() => {
              setIsEditing(true);
              setNewName(name);
            }}
          />
          {isDeleting ? (
            <div className='check-loading'></div>
          ) : (
            <GoTrashcan
              onClick={() => {
                setIsDeleting(true);
                const deleteResponse = del(`/todos/${itemId}`);
                deleteResponse
                  .then(() => {
                    updatedTodos();
                  })
                  .then(() => {
                    setIsDeleting(false);
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

export default CardItem;
