import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaRegSave } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go';
import { ImCancelCircle } from 'react-icons/im';
import Input from './Input';
import del from '../api/delete';
import update from '../api/update';

const CardItem = ({ itemId, name, checked, updatedTodos }) => {
  const [newName, setNewName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const saveHandler = () => {
    setIsEditing(false);
    setIsSaving(true);
    const updateResponse = update(`/todos/${itemId}`, {
      name: newName,
    });
    updateResponse
      .then((response) => {
        const getResponse = updatedTodos();
        getResponse
          .then((response) => {
            setIsSaving(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    setNewName('');
  };

  return (
    <li>
      {isChecking ? (
        <div className='check-loading'></div>
      ) : (
        <Input
          type='checkbox'
          onChange={() => {
            setIsChecking(true);
            const updateResponse = update(`/todos/${itemId}`, {
              checked: !checked,
            });
            updateResponse
              .then((response) => {
                const getResponse = updatedTodos();
                getResponse
                  .then((response) => {
                    setIsChecking(false);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                console.log(error);
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
                    const getResponse = updatedTodos();
                    getResponse
                      .then(() => {
                        setIsDeleting(false);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  })
                  .catch((error) => {
                    console.log(error);
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

CardItem.defaultProps = {
  itemId: null,
  name: '',
  checked: false,
  updatedTodos: () => {},
};

CardItem.protoTypes = {
  itemId: PropTypes.number,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  updatedTodos: PropTypes.func.isRequired,
};

export default CardItem;
