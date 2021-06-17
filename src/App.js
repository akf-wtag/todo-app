// import { useState } from 'react';
// import Input from './components/Input';
// import Button from './components/Button';
// import TodoList from './components/TodoList';
// import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Demo from './Demo';

function App() {
  const url = 'http://localhost:3000/todos';

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [delId, setDelId] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [tours, setTours] = useState([]);
  const fetchTours = async () => {
    try {
      const response = await axios.get(url);
      const allTours = response.data;

      setTours(allTours);
    } catch (error) {
      console.log(error);
    }
  };

  const postTour = async () => {
    try {
      const response = await axios.post(url, {
        id,
        name,
        age,
      });

      const newTour = response.data;

      setTours((prevTours) => [...prevTours, newTour]);
    } catch (error) {
      console.log(error);
    }
  };

  const delTour = async () => {
    await axios
      .delete(`${url}/${delId}`)
      .then((response) => {
        fetchTours();
        setDelId('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTour = async () => {
    await axios
      .patch(`${url}/${updateId}`, { name: updateName })
      .then((response) => {
        fetchTours();
        setUpdateId('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTours();
  }, []);
  /*const [todos, setTodos] = useState([]);
  const [name, setName] = useState('');
  const [searchText, setSearchText] = useState('');

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const searchTodoHandler = (e) => {
    setSearchText(e.target.value);
  };

  let incompleteTodos = [];
  let completeTodos = [];

  todos.forEach((todo) => {
    if (
      searchText === '' ||
      todo.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      if (!todo.checked) incompleteTodos.push(todo);
      else completeTodos.push(todo);
    }
  });

  let isNewTodo = 1;

  const onChangeTodos = (id, name, checked) => {
    setTodos((prevTodos) => {
      let newTodos = [];
      newTodos = prevTodos.map((todo, index) => {
        if (todo.id === id) {
          isNewTodo = 0;
          if (name !== '' && todo.name !== name && todo.checked !== checked)
            return { ...todo, name, checked };
          else if (name !== '' && todo.name !== name) return { ...todo, name };
          else if (todo.checked !== checked) return { ...todo, checked };
          else prevTodos.splice(index, 1);
        }
        return todo;
      });

      if (isNewTodo && name !== '') {
        newTodos = [...prevTodos, { id, name, checked }];
        isNewTodo = 1;
      }
      return newTodos;
    });

    setName('');
  };*/

  return (
    <div>
      {/*<header>
        <h1>To-Do app</h1>
      </header>
      <div className='input-container'>
        <Input
          type='text'
          placeholder='add a too...'
          name={name}
          onChange={nameHandler}
        />
        <Button name={name} onClick={onChangeTodos} btnName='Add' />
        {todos.length > 0 ? (
          <Input
            type='text'
            placeholder='search here...'
            name={searchText}
            onChange={searchTodoHandler}
          />
        ) : (
          ''
        )}
      </div>

      <TodoList
        todos={incompleteTodos}
        onChangeTodos={onChangeTodos}
        todosTitle='Incomplete Todos'
      />
      <TodoList
        todos={completeTodos}
        onChangeTodos={onChangeTodos}
        todosTitle='Complete Todos'
      /> */}
      <input
        type='text'
        name='id'
        id='a'
        value={id}
        onChange={(e) => setId(e.target.value)}
        autoComplete='off'
      />
      <input
        type='text'
        name='name'
        id='b'
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete='off'
      />
      <input
        type='text'
        name='age'
        id='c'
        value={age}
        onChange={(e) => setAge(e.target.value)}
        autoComplete='off'
      />
      <button onClick={postTour}>post</button>
      <input
        type='text'
        name='delId'
        id='d'
        value={delId}
        onChange={(e) => setDelId(e.target.value)}
        autoComplete='off'
      />
      <button onClick={delTour}>delete</button>
      <input
        type='text'
        name='updateId'
        id='e'
        value={updateId}
        onChange={(e) => setUpdateId(e.target.value)}
        autoComplete='off'
      />
      <input
        type='text'
        name='updateName'
        id='f'
        value={updateName}
        onChange={(e) => setUpdateName(e.target.value)}
        autoComplete='off'
      />
      <button onClick={updateTour}>update</button>
      <Demo tours={tours} />
    </div>
  );
}

export default App;

// {
//       "id": 1,
//       "name": "John",
//       "age": 30
//     },
//     {
//       "id": 2,
//       "name": "Alex",
//       "age": 25
//     },
//     {
//       "id": 3,
//       "name": "Robert",
//       "age": 35
//     },
//     {
//       "id": 4,
//       "name": "Robert",
//       "age": 35
//     },
//     {
//       "id": 5,
//       "name": "Robert",
//       "age": 35
//     }
