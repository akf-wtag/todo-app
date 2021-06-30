import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaRegSave } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go';
import { ImCancelCircle } from 'react-icons/im';
import Input from './Input';

const Todo = ({
  todoId,
  todoName,
  checked,
  checkUpdate,
  deleteTodo,
  todoNameUpdate,
}) => {
  const [editedTodoName, setEditedTodoName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  return (
    <li>
      {isChecking ? (
        <div className='small-loader'></div>
      ) : !isSaving ? (
        <Input
          type='checkbox'
          onChange={() => {
            setIsChecking(true);
            checkUpdate(todoId, !checked);
          }}
          isChecked={checked}
          className='checkbox'
        />
      ) : (
        ''
      )}

      {isEditing ? (
        <>
          <Input
            type='text'
            name={editedTodoName}
            onChange={(e) => setEditedTodoName(e.target.value)}
            focus={true}
            className='edit-text-input'
          />

          <FaRegSave
            onClick={() => {
              setIsSaving(true);
              setIsEditing(false);
              todoNameUpdate(todoId, editedTodoName, () => {
                setIsSaving(false);
              });
            }}
            className='save-icon'
          />

          <ImCancelCircle
            onClick={() => {
              setIsEditing(false);
              setEditedTodoName('');
            }}
            className='cancel-icon'
          />
        </>
      ) : (
        <>
          {isSaving ? (
            <div className='small-loader'></div>
          ) : (
            <>
              <div className={checked ? 'todo-completed' : 'item-name'}>
                {todoName}
              </div>

              <FaEdit
                className='edit-icon'
                onClick={() => {
                  setIsEditing(true);
                  setEditedTodoName(todoName);
                }}
              />
              {isDeleting ? (
                <div className='small-loader'></div>
              ) : (
                <GoTrashcan
                  onClick={() => {
                    setIsDeleting(true);
                    deleteTodo(todoId);
                  }}
                  className='trash-icon'
                />
              )}
            </>
          )}
        </>
      )}
    </li>
  );
};

Todo.defaultProps = {
  todoId: '',
  todoName: '',
  checked: false,
  checkUpdate: () => {},
  deleteTodo: () => {},
  todoNameUpdate: () => {},
};

Todo.propTypes = {
  todoId: PropTypes.string.isRequired,
  todoName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  checkUpdate: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todoNameUpdate: PropTypes.func.isRequired,
};

export default Todo;
