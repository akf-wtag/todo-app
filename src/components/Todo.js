import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaRegSave } from 'react-icons/fa';
import Input from '@wtag/rcl-input';
import Icon from '@wtag/rcl-icon';
import IconButton from '@wtag/rcl-icon-button';
import { CheckBox } from '@wtag/react-comp-lib';
import { Spinner } from '@wtag/react-comp-lib';
import { v4 as uuid } from 'uuid';

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
  console.log(todoId);

  return (
    <li>
      {isChecking ? (
        <Spinner color='success' bgColor='neutral' size='tiny' />
      ) : !isSaving && !isEditing ? (
        <CheckBox
          className='todo-check'
          name={uuid()}
          label={todoName}
          checked={checked}
          size='small'
          onChange={() => {
            setIsChecking(true);
            checkUpdate(todoId, !checked);
            // console.log(todoId);
          }}
        />
      ) : (
        ''
      )}

      {isEditing ? (
        <>
          <Input
            size='tiny'
            value={editedTodoName}
            autoFocus={true}
            isClearable={false}
            onChange={(e) => setEditedTodoName(e)}
          />

          <IconButton
            className='save-icon-btn'
            icon={<FaRegSave />}
            size='tiny'
            color='success'
            onClick={() => {
              setIsSaving(true);
              setIsEditing(false);
              todoNameUpdate(todoId, editedTodoName, () => {
                setIsSaving(false);
              });
            }}
          />

          <IconButton
            className='close-icon-btn'
            icon={<Icon name='close' />}
            size='tiny'
            color='danger'
            onClick={() => {
              setIsEditing(false);
              setEditedTodoName('');
            }}
          />
        </>
      ) : (
        <>
          {isSaving ? (
            <Spinner color='success' bgColor='neutral' size='tiny' />
          ) : (
            <>
              <IconButton
                className='edit-icon-btn'
                icon={<Icon name='edit' />}
                color={'success'}
                size='tiny'
                onClick={() => {
                  setIsEditing(true);
                  setEditedTodoName(todoName);
                }}
              />

              {isDeleting ? (
                <Spinner color='success' bgColor='neutral' size='tiny' />
              ) : (
                <IconButton
                  className='delete-icon-btn'
                  icon={<Icon name='delete' />}
                  size='tiny'
                  color={'danger'}
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
