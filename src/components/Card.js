import { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import CardItem from './CardItem';
import Button from './Button';
import Input from './Input';
import { FaRegSave } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import del from '../api/delete';
import post from '../api/post';

const Card = ({ todo, searchText, updatedTodos }) => {
  const [listDeleting, setListDeleting] = useState(false);
  const [listAdding, setListAdding] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newItemSaving, setNewItemSaving] = useState(false);
  const properties = Object.keys(todo);
  const title = properties[0];
  const titleId = todo[properties[1]];
  let incompletedTodos = [];
  let completedTodos = [];
  todo[title].forEach((field) => {
    if (
      searchText === '' ||
      field.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      if (!field.checked) incompletedTodos.push(field);
      else completedTodos.push(field);
    }
  });

  const saveNewItemHandler = () => {
    setNewItemSaving(true);
    const postResponse = post('/todos', {
      id: uuid(),
      name: newListName,
      checked: false,
      labelId: titleId,
    });
    postResponse
      .then((response) => {
        updatedTodos();
        setNewListName('');
      })
      .then((response) => {
        setNewItemSaving(false);
        setListAdding(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div key={uuid()} className='ul-container'>
      <div className='list-header'>
        <Button
          onClick={() => {
            setListAdding(true);
          }}
          btnName='Add'
          className='add-to-list'
        />
        <div className='grid-title'>{title}</div>
        {listDeleting ? (
          <div className='check-loading'></div>
        ) : (
          <Button
            onClick={() => {
              setListDeleting(true);
              let deleteResponse = [];
              todo[title].forEach((item) => {
                if (item.labelId === titleId) {
                  const response = del(`/todos/${item.id}`);
                  deleteResponse.push(response);
                }
              });

              deleteResponse.push(del(`/labels/${titleId}`));
              Promise.all(deleteResponse).then((response) => {
                const getRes = updatedTodos();
                getRes.then(() => {
                  setListDeleting(false);
                });
              });
            }}
            btnName='Delete'
            className='delete-list'
          />
        )}
      </div>
      {incompletedTodos.length > 0 ? (
        <div className='list-container'>
          <div className='list-text'>Incomplete</div>
          <ul>
            {incompletedTodos.map((item) => (
              <CardItem
                key={item.id}
                itemId={item.id}
                name={item.name}
                checked={item.checked}
                updatedTodos={updatedTodos}
              />
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
      {completedTodos.length > 0 ? (
        <div className='list-container'>
          <div className='list-text'>Complete</div>
          <ul>
            {completedTodos.map((item) => (
              <CardItem
                key={item.id}
                itemId={item.id}
                name={item.name}
                checked={item.checked}
                updatedTodos={updatedTodos}
              />
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
      {listAdding ? (
        <div className='add-new-item'>
          {newItemSaving ? (
            <div className='check-loading'></div>
          ) : (
            <Input
              type='text'
              name={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              focus={true}
              onKeyPress={() => {
                saveNewItemHandler();
              }}
              className='edit-text-input'
            />
          )}

          <FaRegSave
            onClick={() => {
              saveNewItemHandler();
            }}
            className='save-icon'
          />

          <ImCancelCircle
            onClick={() => {
              setListAdding(false);
              setNewListName('');
            }}
            className='cancel-icon'
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

Card.defaultProps = {
  todo: { title: [{ name: '', checked: false, id: null }], id: null },
  searchText: '',
  updatedTodos: () => {},
};

Card.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        checked: PropTypes.bool,
        id: PropTypes.number,
      })
    ),
    id: PropTypes.number,
  }),

  searchText: PropTypes.string.isRequired,
  updatedTodos: PropTypes.func.isRequired,
};

export default Card;
