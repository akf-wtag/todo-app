import { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import Input from './components/Input';
import Button from './components/Button';
import Card from './components/Card';
import './App.css';
import get from './api/get';
import post from './api/post';
import { v4 as uuid } from 'uuid';
// import uniqueRandom from 'unique-random';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [addTodo, setAddTodo] = useState(false);

  // const random = uniqueRandom(1, todos.length);

  const getTodos = async () => {
    const getData = get('/db');
    return await getData
      .then((response) => {
        const getLabels = response.data.labels;
        const getTodos = response.data.todos;
        let y = [];
        getLabels.forEach((label) => {
          let x = [];
          getTodos.forEach((item) => {
            if (item.labelId === label.id) {
              x.push(item);
            }
          });
          y.push({ [label.name]: x, id: label.id });
        });
        setTodos(y);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewTitileHandler = () => {
    setPostLoading(true);
    const postdata = post('/labels', {
      id: uuid(),
      name: title,
    });
    postdata
      .then((response) => {
        const getResponse = getTodos();
        getResponse
          .then((response) => {
            setPostLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    setTitle('');
  };

  useEffect(() => {
    setLoading(true);
    const response = getTodos();
    response
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) {
    return <div className='fetch-todo-loader'>Fetching todos...</div>;
  }

  return (
    <div>
      <div className='app-header'>
        <h1>To-Do app</h1>
      </div>
      {todos.length === 0 && !addTodo ? (
        <div className='no-todos-container'>
          <div className='no-todos'>No todos here</div>
          <Button
            className='add-btn'
            btnName='Add a todo'
            onClick={() => {
              setAddTodo(true);
            }}
          />
        </div>
      ) : (
        <>
          <div className='input-container'>
            <div className='input-with-cross'>
              <Input
                type='text'
                placeholder='Title'
                name={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={() => {
                  addNewTitileHandler();
                }}
                className='grid-title-input'
                focus={true}
              />
              <ImCross className='cross-icon' onClick={() => setTitle('')} />
            </div>
            {postLoading ? (
              <div className='add-loading'></div>
            ) : (
              <Button
                btnName='Add'
                className='add-btn'
                onClick={() => {
                  addNewTitileHandler();
                }}
              />
            )}
            {todos.length > 0 ? (
              <Input
                type='text'
                placeholder='search here...'
                name={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className='search-input'
              />
            ) : (
              ''
            )}
          </div>

          <div className='card-container'>
            {todos.map((todo) => (
              <Card
                key={todo.id}
                todo={todo}
                searchText={searchText}
                updatedTodos={() => getTodos()}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
