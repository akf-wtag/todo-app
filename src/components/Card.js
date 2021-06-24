import { useState } from 'react';
import CardItem from './CardItem';
import { v4 as uuid } from 'uuid';
import Button from './Button';
import getTodos from '../api/get';
import deleteTodo from '../api/delete';

const Card = ({ todos, updatedTodos }) => {
  return (
    <div className='card-container'>
      {todos.map((todo) => {
        const title = Object.keys(todo)[0];
        let incompletedTodos = [];
        let completedTodos = [];
        todo[title].map((field) => {
          if (!field.checked) incompletedTodos.push(field);
          else completedTodos.push(field);
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
                // onClick={() => {
                //   setListDeleting(true);
                //   const deleteResponse = deleteTodo(gridTitle, -1);
                //   deleteResponse.then((response) => {
                //     const getResponse = getTodos();
                //     getResponse.then((response) => {
                //       updatedTodos(response.data);
                //       setListDeleting(false);
                //     });
                //   });
                // }}
                btnName='Delete'
                className='delete-list'
              />
            </div>
            {incompletedTodos.length > 0 ? (
              <ul>
                {incompletedTodos.map((item) => (
                  <CardItem
                    key={item.id}
                    itemId={item.id}
                    titleId={item.labelId}
                    title={title}
                    name={item.name}
                    checked={item.checked}
                    updatedTodos={updatedTodos}
                  />
                ))}
              </ul>
            ) : (
              ''
            )}

            {completedTodos.length > 0 ? (
              <ul>
                {completedTodos.map((item) => (
                  <CardItem
                    key={item.id}
                    itemId={item.id}
                    titleId={item.labelId}
                    title={title}
                    name={item.name}
                    checked={item.checked}
                    updatedTodos={updatedTodos}
                  />
                ))}
              </ul>
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
