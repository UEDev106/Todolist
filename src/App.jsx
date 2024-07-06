import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const handleAddTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { id: Date.now(), text: inputValue, edited: false }]);
      setInputValue('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (task) => {
    setEditingTask(task.id);
    setEditingValue(task.text);
  };

  const handleSaveEdit = () => {
    setTasks(tasks.map(task => 
      task.id === editingTask ? { ...task, text: editingValue, edited: true } : task
    ));
    setEditingTask(null);
    setEditingValue('');
  };

  return (
    <div className="container mt-2 d-flex justify-content-center align-items-center pl-5 ">
      <div className="todo-list-container">
        <h1 className="text-center">To-Do List</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
        <TransitionGroup className="list-group">
          {tasks.map((task) => (
            <CSSTransition key={task.id} timeout={500} classNames="task">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {editingTask === task.id ? (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                    />
                    <button className="btn btn-success btn-sm" onClick={handleSaveEdit}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {task.text}
                    <div>
                      {!task.edited && (
                        <button className="btn btn-secondary btn-sm me-2" onClick={() => handleEditTask(task)}>
                          Edit
                        </button>
                      )}
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTask(task.id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
}

export default App;
