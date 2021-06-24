import { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import Input from './components/Input';
import Button from './components/Button';
import Card from './components/Card';
import './App.css';
import get from './api/get';
import post from './api/post';
// import updateTodo from './api/update';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { v4 as uuid } from 'uuid';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const getTodos = () => {
    const getData = get('http://localhost:3000/db');
    getData.then((response) => {
      const getLabels = response.data.labels;
      const getTodos = response.data.todos;
      let y = [];
      getLabels.map((label) => {
        let x = [];
        getTodos.forEach((item) => {
          if (item.labelId === label.id) {
            x.push(item);
          }
        });
        y.push({ [label.name]: x });
      });
      setTodos(y);
    });
  };

  useEffect(() => {
    setLoading(true);
    getTodos();
    setLoading(false);
  }, []);

  if (loading) {
    return <div className='fetch-todo-loader'>Fetching todos...</div>;
  }

  return (
    <div>
      <div className='app-header'>
        <h1>To-Do app</h1>
      </div>
      <div className='input-container'>
        <Input
          type='text'
          placeholder='Title'
          name={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={() => {}}
          className='grid-title-input'
        />

        {postLoading ? (
          <div className='add-loading'></div>
        ) : (
          <Button
            btnName='Add'
            className='add-btn'
            onClick={() => {
              setPostLoading(true);
              const postdata = post('http://localhost:3000/labels', {
                id: uuid(),
                name: title,
              });
              postdata
                .then(() => {
                  getTodos();
                  // const promise = new Promise((resolve, reject) => {
                  //   resolve(getTodos());
                  // });
                  // promise.then(() => {
                  //   setPostLoading(false);
                  // });
                })
                .then(() => {
                  setPostLoading(false);
                });
              setTitle('');
            }}
          />
        )}
        {/* {Object.keys(todos).length > 0 ? (
          <Input
            type='text'
            placeholder='search here...'
            name={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='search-input'
          />
        ) : (
          ''
        )} */}
      </div>

      <Card todos={todos} updatedTodos={getTodos} />
    </div>
  );
};

export default App;

// setTodos((prevTodos) => {
//   prevTodos[title] = [...prevTodos[title], response.data];
//   return prevTodos;
// });

/* <div className='todo-text-input-container'>
  <Input
    type='text'
    placeholder='add a todo...'
    name={name}
    onChange={(e) => setName(e.target.value)}
    onKeyPress={() => {
      onPostTodo(title, uuid(), name, false, false);
    }}
    className='todo-text-input'
  />
  <ImCross className='cross-icon' onClick={() => setName('')} />
  <FaPlus className='add-item-icon' onClick={() => {}} />
</div> */
