import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaRegSave } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go';
import { ImCancelCircle } from 'react-icons/im';

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
        <div></div>
      ) : !isSaving ? (
        <input
          type='checkbox'
          checked={checked}
          onChange={() => {
            setIsChecking(true);
            checkUpdate(todoId, !checked);
          }}
        />
      ) : (
        ''
      )}

      {isEditing ? (
        <>
          <input
            value={editedTodoName}
            autoFocus={true}
            onChange={(e) => setEditedTodoName(e.target.value)}
          />
          <FaRegSave
            onClick={() => {
              setIsSaving(true);
              setIsEditing(false);
              todoNameUpdate(todoId, editedTodoName, () => {
                setIsSaving(false);
              });
            }}
          />
          <ImCancelCircle
            onClick={() => {
              setIsEditing(false);
              setEditedTodoName('');
            }}
          />
        </>
      ) : (
        <>
          {isSaving ? (
            <div></div>
          ) : (
            <>
              <div>{todoName}</div>

              <FaEdit
                onClick={() => {
                  setIsEditing(true);
                  setEditedTodoName(todoName);
                }}
              />

              {isDeleting ? (
                <div></div>
              ) : (
                <GoTrashcan
                  onClick={() => {
                    setIsDeleting(true);
                    deleteTodo(todoId);
                  }}
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
