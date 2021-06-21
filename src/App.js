import { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import Input from './components/Input';
import Button from './components/Button';
import TodoList from './components/TodoList';
import './App.css';
import { getTodos } from './api/get';
import { postTodo } from './api/post';
import { deleteTodo } from './api/delete';
import { updateTodo } from './api/update';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState('');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [todoIdToCheck, setTodoIdToCheck] = useState();
  const [todoIdToDelete, setTodoIdToDelete] = useState();
  const [todoIdToSave, setTodoIdToSave] = useState();

  const url = 'http://localhost:3000/todos';

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const searchTodoHandler = (e) => {
    setSearchText(e.target.value);
  };

  let incompleteTodos = [];
  let completeTodos = [];

  // todos &&
  //   todos.forEach((todo) => {
  //     if (
  //       searchText === '' ||
  //       todo.name.toLowerCase().includes(searchText.toLowerCase())
  //     ) {
  //       if (!todo.checked) incompleteTodos.push(todo);
  //       else completeTodos.push(todo);
  //     }
  //   });

  let isNewTodo = 1;

  useEffect(() => {
    setLoading(true);
    const response = getTodos(url);
    response.then(() => {
      setTodos(response.data);
      setLoading(false);
    });
  }, []);

  const onChangeTodos = (id, name, checked, isDelClicked) => {
    todos &&
      todos.every((todo) => {
        if (todo.id === id) {
          isNewTodo = 0;
          if (todo.name === name && todo.checked === checked && isDelClicked)
            deleteTodo(url, todo.id);
          else if (todo.name !== name || todo.checked !== checked)
            updateTodo(url, id, name, checked);
          return false;
        }
        return true;
      });

    if (isNewTodo) {
      if (name === '') console.log('Field is empty');
      else {
        setAddLoading(true);
        const response = postTodo(url, id, name, checked);
        response.then(() => {
          setAddLoading(false);
          setTodos((prevTodos) => [...prevTodos, response.data]);
        });
      }
      isNewTodo = 1;
    }
    setName('');
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
        {addLoading ? (
          <div className='add-loading'></div>
        ) : (
          <Button
            name={name}
            onClick={() =>
              onChangeTodos(Math.random() * 1000, name, false, false)
            }
            btnName='Add'
            className='add'
          />
        )}
        {todos && todos.length > 0 ? (
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
        todoIdToCheck={todoIdToCheck}
        setTodoIdToCheck={setTodoIdToCheck}
        todoIdToDelete={todoIdToDelete}
        setTodoIdToDelete={setTodoIdToDelete}
        todoIdToSave={todoIdToSave}
        setTodoIdToSave={setTodoIdToSave}
      />
      <TodoList
        todos={completeTodos}
        onChangeTodos={onChangeTodos}
        todosTitle='Complete Todos'
        todoIdToCheck={todoIdToCheck}
        setTodoIdToCheck={setTodoIdToCheck}
        todoIdToDelete={todoIdToDelete}
        setTodoIdToDelete={setTodoIdToDelete}
        todoIdToSave={todoIdToSave}
        setTodoIdToSave={setTodoIdToSave}
      />
    </div>
  );
};

export default App;
