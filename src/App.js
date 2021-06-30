import { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';
import Input from './components/Input';
import Button from './components/Button';
import LabelCard from './components/LabelCard';
import './App.css';
import get from './api/get';
import post from './api/post';
import del from './api/delete';
import update from './api/update';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

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
            console.log(callback);
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

  const deleteCard = (labelId) => {
    let deleteResponses = todos.filter((todo) => {
      if (todo.labelId === labelId) return del(`/todos/${todo.id}`);
    });

    axios.all(deleteResponses).then((...values) => {
      //   console.log(values);
      // del(`/labels/${labelId}`).then((v) => {
      //   get('/labels')
      //     .then((resp) => {
      //       setLabels(resp.data);
      //       get('/todos')
      //         .then((response) => {
      //           setTodos(response.data);
      //         })
      //         .catch((error) => {
      //           console.log(error);
      //         });
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // });

      del(`/labels/${labelId}`).then(() => {
        get('/labels').then((resp) => resp.data);
      });
      // const newLabels = get('/labels').then((resp) => resp.data);
      // const newTodos = get('/todos').then((resp) => resp.data);
      // setLabels(newLabels);
      // setTodos(newTodos);
    });

    // del(`/labels/${labelId}`);
    // get('/labels');
  };

  if (isFetchingTodos) {
    return <div className='fetch-todo-loader'>Fetching todos...</div>;
  }

  return (
    <div className='app-container'>
      <header className='app-header'>Todo App</header>
      <form className='title-input-form'>
        <div className='title-input-container'>
          <Input
            type='text'
            placeholder='Title'
            name={titleInputText}
            onChange={(e) => setTitleInputText(e.target.value)}
            focus={true}
            className='title-input'
          />
          <ImCross
            className='cross-icon'
            onClick={() => setTitleInputText('')}
          />
        </div>
        {isPostingLabel ? (
          <div className='add-btn-loader'></div>
        ) : (
          <Button
            type='submit'
            btnName='Add'
            className='add-title-btn'
            onClick={(e) => {
              e.preventDefault();
              setIsPostingLabel(true);
              postLabel();
              setTitleInputText('');
            }}
          />
        )}
      </form>
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
      <div className='all-card-container'>
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
            deleteCard={(id) => deleteCard(id)}
          />
        ))}
      </div>
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
