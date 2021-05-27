import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import { createTodo, deleteTodo, readTodos, updateTodo } from "./functions";

function App() {

  const [todo, setTodo] = useState(
    {
      "title": '',
      'content': ''
    }
  )
  const [todos, setTodos] = useState(null);
  const [currentId, setCurrentId] = useState(0);

  const clear = () => {
    setCurrentId(0);
    setTodo({ title: '', content: ''});
  }

  const removeTodo = async (e, id) => {
    e.preventDefault();
    await deleteTodo(id);

    const result = await readTodos();
      // console.log("fetchData:", result);
    setTodos(result);
    clear();
  }

  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode === 27) {
        clear();
      }
    }

    window.addEventListener('keydown', clearField);

    return () => window.removeEventListener('keydown', clearField);
  }, [])

  useEffect(() => {
    let currentTodo = currentId !== 0 ? todos.find(todo => todo._id === currentId) : { title: '', content: '' }

    setTodo(currentTodo);
  }, [currentId]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      // console.log("fetchData:", result);
      setTodos(result);
    }
    fetchData()
  }, [currentId])

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (todo.title === undefined || todo.title === null || todo.title === '') {
      
    }

    if (currentId === 0) {
      const result = await createTodo(todo);
      setTodos([...todos, result]);
      clear();
    } else {
      await updateTodo(currentId, todo);
      clear();
    }
    
  }
  return (

    <div className="container">
      <nav className="center-align">
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Todo List</a>
        </div>
      </nav>

      <div className="row">
        {/* <pre>{JSON.stringify(todo)}</pre> */}
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input id="icon_prefix" required type="text" className="validate" onChange={e => setTodo({ ...todo, title: e.target.value })} value={todo.title} />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="description" type="text" className="validate" onChange={e => setTodo({ ...todo, content: e.target.value })} value={todo.content} />
              <label htmlFor="description">Content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="btn waves-effect wavesl-light">Submit</button>
          </div>
        </form>

        {
          !todos ? <Preloader /> : (todos.length > 0 ? <ul className="collection">
            {todos.map(todo => (
              <li key={todo._id} className="collection-item" onClick={() => setCurrentId(todo._id)}>
                <h5>{todo.title}
                  <a href="#!" className="secondary-content right-align" onClick={(e) => removeTodo(e, todo._id)}>
                    <i className="material-icons">delete</i>
                  </a>
                </h5>
                <p>{todo.content}</p>
              </li>
            ))}
          </ul> : <ul className="collection"><li className="collection-item">There is nothing to do!</li></ul>)
        }

      </div>

    </div>
  );
}

export default App;
