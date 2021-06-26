import { useState } from 'react';
import CardItem from './CardItem';
import { v4 as uuid } from 'uuid';
import Button from './Button';
import del from '../api/delete'
import get from '../api/get'

const Card = ({ todos, searchText, updatedTodos }) => {
  const [listDeleting, setListDeleting] = useState(false)
  return (
    <div className='card-container'>
      {todos.map((todo) => {
        const properties = Object.keys(todo);
        const title=properties[0];
        const titleId=properties[1];
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

        return (
          <div key={uuid()} className='ul-container'>
            <div className='list-header'>
              <Button
                onClick={() => {}}
                btnName='Add'
                className='add-to-list'
              />
              <div className='grid-title'>{title}</div>
              <Button
                onClick={() => {
                  setListDeleting(true);
                  const deleteResponse = del(`/labels/${titleId}/todos`);
                  // deleteResponse.then((response) => {
                  //   const getResponse = get();
                  //   getResponse.then((response) => {
                  //     updatedTodos(response.data);
                  //     setListDeleting(false);
                  //   });
                  // });
                }}
                btnName='Delete'
                className='delete-list'
              />
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
          </div>
        );
      })}
    </div>
  );
};

export default Card;
