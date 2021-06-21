import { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import Input from './components/Input';
import Button from './components/Button';
import TodoList from './components/TodoList';
import './App.css';
import getTodos from './api/get';
import postTodo from './api/post';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState('');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const searchTodoHandler = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    const getResponse = getTodos();
    getResponse.then((response) => {
      setTodos(response.data);
      setLoading(false);
    });
  }, []);

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

  const onChangeTodos = (id, name, checked) => {
    if (name === '') console.log('Field is empty');
    else {
      setPostLoading(true);
      const postResponse = postTodo(id, name, checked);
      postResponse.then((response) => {
        setTodos((prevTodos) => [...prevTodos, response.data]);
        setPostLoading(false);
      });
      setName('');
    }
  };

  if (loading) {
    return <div className='fetch-todo-loader'>Fetching todos...</div>;
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
            placeholder='add a todo...'
            name={name}
            onChange={nameHandler}
            onKeyPress={() => {
              onChangeTodos(Math.random() * 1000, name, false, false);
            }}
          />
          <ImCross className='cross-icon' onClick={() => setName('')} />
        </div>
        {postLoading ? (
          <div className='add-loading'></div>
        ) : (
          <Button
            onClick={() =>
              onChangeTodos(Math.random() * 1000, name, false, false)
            }
            btnName='Add'
            className='add'
          />
        )}
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
        todosTitle='Incomplete Todos'
        updatedTodos={(data) => setTodos([...data])}
      />
      <TodoList
        todos={completeTodos}
        todosTitle='Complete Todos'
        updatedTodos={(data) => setTodos([...data])}
      />
    </div>
  );
};

export default App;
