import { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import Input from './components/Input';
import Button from './components/Button';
import Card from './components/Card';
import './App.css';
import get from './api/get';
import post from './api/post';
import { v4 as uuid } from 'uuid';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

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
          y.push({ [label.name]: x });
        });
        setTodos(y);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className='input-container'>
        <div className='input-with-cross'>
          <Input
            type='text'
            placeholder='Title'
            name={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={() => {}}
            className='grid-title-input'
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

      <Card
        todos={todos}
        searchText={searchText}
        updatedTodos={() => getTodos()}
      />
    </div>
  );
};

export default App;
