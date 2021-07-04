import { useState, useEffect } from 'react';
import LabelCard from './components/LabelCard';
import './App.css';
import get from './api/get';
import post from './api/post';
import del from './api/delete';
import update from './api/update';
import { v4 as uuid } from 'uuid';
import { ImCross } from 'react-icons/im';

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
    return <div>Fetching todos...</div>;
  }

  return (
    <div>
      <div>Todo App</div>
      <div>
        <div>
          <input
            placeholder='Title'
            value={titleInputText}
            autoFocus={true}
            onChange={(e) => setTitleInputText(e.target.value)}
          />

          <ImCross onClick={() => setTitleInputText('')} />
          {isPostingLabel ? (
            <div></div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsPostingLabel(true);
                postLabel();
                setTitleInputText('');
              }}
            >
              Add
            </button>
          )}
        </div>
        <div>
          {todos.length > 0 ? (
            <input
              placeholder='Search'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          ) : (
            ''
          )}
        </div>
      </div>
      {labels.length > 0 ? (
        <div>
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
        <div>No todos...</div>
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
