import { useState } from 'react';
import Input from './components/Input';
import Button from './components/Button';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
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
  };

  return (
    <div>
      <header>
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
      />
    </div>
  );
}

export default App;
