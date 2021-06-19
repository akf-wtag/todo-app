import { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import Input from './components/Input';
import Button from './components/Button';
import TodoList from './components/TodoList';
import Loading from './components/Loading';
import './App.css';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState('');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const url = 'http://localhost:3000/todos';

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

  const getTodos = async () => {
    setLoading(true);

    await axios
      .get(url)
      .then((response) => {
        setLoading(false);
        setTodos(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const postTodo = async (id, name, checked) => {
    setLoading(true);

    await axios
      .post(url, {
        id,
        name,
        checked,
      })
      .then((response) => {
        setLoading(false);
        setTodos((prevTodos) => [...prevTodos, response.data]);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const deleteTodo = async (id) => {
    setLoading(true);

    await axios
      .delete(`${url}/${id}`)
      .then((response) => {
        setLoading(false);
        getTodos();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const updateTodo = async (id, name, checked) => {
    setLoading(true);

    await axios
      .patch(`${url}/${id}`, { name, checked })
      .then((response) => {
        setLoading(false);
        getTodos();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const onChangeTodos = (id, name, checked, isDelClicked) => {
    todos.every((todo) => {
      if (todo.id === id) {
        isNewTodo = 0;
        if (todo.name === name && todo.checked === checked && isDelClicked)
          deleteTodo(todo.id);
        else if (todo.name !== name || todo.checked !== checked)
          updateTodo(id, name, checked);
        return false;
      }
      return true;
    });

    if (isNewTodo) {
      postTodo(id, name, checked);
      isNewTodo = 1;
    }
    setName('');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <header className='app-header'>
        <h1>To-Do app</h1>
      </header>
      <div className='input-container'>
        <div className='add-todo-input'>
          <Input
            type='text'
            placeholder='add a too...'
            name={name}
            onChange={nameHandler}
          />
          <ImCross className='cross-icon' onClick={() => setName('')} />
        </div>
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
      />
    </div>
  );
};

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
