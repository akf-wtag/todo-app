import { useState, useEffect } from 'react';
import LabelCard from './components/LabelCard';
import './App.css';
import get from './api/get';
import post from './api/post';
import del from './api/delete';
import update from './api/update';
import { v4 as uuid } from 'uuid';
import Input from '@wtag/rcl-input';
import Button from '@wtag/rcl-button';
import Icon from '@wtag/rcl-icon';
import IconButton from '@wtag/rcl-icon-button';
import { Spinner } from '@wtag/react-comp-lib';

const App = () => {
  const [labels, setLabels] = useState([]);
  const [todos, setTodos] = useState([]);
  const [titleInputText, setTitleInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isPostingLabel, setIsPostingLabel] = useState(false);
  const [isFetchingTodos, setIsFetchingTodos] = useState(false);

  useEffect(() => {
    setIsFetchingTodos(true);
    get('/labels')
      .then((resp) => {
        setLabels(resp.data);
        get('/todos')
          .then((response) => {
            setTodos(response.data);
            setIsFetchingTodos(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const postLabel = () => {
    const uid = uuid();
    if (titleInputText === '') console.log('Enter a title!');
    else {
      post('/labels', {
        id: uid,
        name: titleInputText,
      }).then((response) => {
        get(`/labels/${uid}`).then((response) => {
          setLabels((prevLabels) => [...prevLabels, response.data]);
          setIsPostingLabel(false);
          setTitleInputText('');
        });
      });
    }
  };

  const postTodo = (labelId, todoName, callback) => {
    const todoId = uuid();
    post('/todos', {
      id: todoId,
      name: todoName,
      checked: false,
      labelId: labelId,
    })
      .then(() => {
        get(`/todos/${todoId}`)
          .then((response) => {
            setTodos((prevTodos) => [...prevTodos, response.data]);
            callback();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkUpdate = (todoId, checked) => {
    // console.log(todoId);
    update(`/todos/${todoId}`, {
      checked: checked,
    })
      .then((response) => {
        get(`/todos/${todoId}`)
          .then((response) => {
            setTodos((prevTodos) => {
              return prevTodos.map((todo) => {
                if (todo.id === todoId) return { ...todo, checked: checked };
                return todo;
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTodo = (todoId) => {
    del(`/todos/${todoId}`)
      .then(() => {
        get(`/todos`)
          .then(() => {
            setTodos((prevTodos) =>
              prevTodos.filter((todo) => todo.id !== todoId)
            );
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const todoNameUpdate = (todoId, todoName, callback) => {
    update(`/todos/${todoId}`, {
      name: todoName,
    }).then(() => {
      get(`/todos/${todoId}`)
        .then(() => {
          setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
              if (todo.id === todoId) return { ...todo, name: todoName };
              return todo;
            });
          });
          callback();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const deleteCard = (labelId, callback) => {
    let deleteResponses = todos.filter((todo) => {
      if (todo.labelId === labelId) return del(`/todos/${todo.id}`);
    });

    Promise.all(deleteResponses).then(() => {
      del(`/labels/${labelId}`).then(() => {
        get('http://localhost:3001/labels')
          .then((response) => {
            setLabels(response.data);
          })
          .then(() => {
            get('http://localhost:3001/todos').then((response) => {
              setTodos(response.data);
              callback();
            });
          });
      });
    });
  };

  if (isFetchingTodos) {
    return <div className='fetch-todo-loader'>Fetching todos...</div>;
  }

  return (
    <div>
      <div className='app-header'>Todo App</div>
      <div className='input-container'>
        <div className='label-input-container'>
          <Input
            size='tiny'
            label='Add a title'
            placeholder='Title'
            required={true}
            value={titleInputText}
            autoFocus={true}
            onChange={(e) => setTitleInputText(e)}
          />

          <IconButton
            className='clear-icon-btn'
            icon={<Icon name='close' />}
            size='tiny'
            onClick={() => setTitleInputText('')}
          />
        </div>

        {isPostingLabel ? (
          <Spinner color='success' bgColor='neutral' size='tiny' />
        ) : (
          <Button
            icon={<Icon name='add' fill='#fff' />}
            version='v2'
            type='success'
            label='Add'
            size='tiny'
            onClick={(e) => {
              e.preventDefault();
              setIsPostingLabel(true);
              postLabel();
              setTitleInputText('');
            }}
            className='add-btn'
          />
        )}
        <div className='search-input'>
          {todos.length > 0 ? (
            <Input
              size='tiny'
              label='Search'
              placeholder='Search'
              value={searchText}
              onChange={(e) => setSearchText(e)}
              postIcon={<Icon name='search' />}
            />
          ) : (
            ''
          )}
        </div>
      </div>
      {labels.length > 0 ? (
        <div className='cards-container'>
          {labels.map((label) => (
            <LabelCard
              key={label.id}
              labelId={label.id}
              labelName={label.name}
              todos={todos}
              searchText={searchText}
              postTodo={(id, name, callback) => postTodo(id, name, callback)}
              checkUpdate={(id, checked) => checkUpdate(id, checked)}
              deleteTodo={(id) => deleteTodo(id)}
              todoNameUpdate={(id, name, callback) => {
                todoNameUpdate(id, name, callback);
              }}
              deleteCard={(id, callback) => deleteCard(id, callback)}
            />
          ))}
        </div>
      ) : (
        <div className='no-todos'>No todos...</div>
      )}
    </div>
  );
};

export default App;

// const isTitleExist = (titleInputText) => {
//   let f = 0;
//   const getLabelResponse = get(`/labels`);
//   getLabelResponse.then((response) => {
//     response.data.every((label) => {
//       if (label.name === titleInputText) {
//         console.log(label.name);
//         f = 1;
//         return false;
//       }
//     });
//   });
//   console.log(f);

//   if (f) return true;
//   return false;
// };
