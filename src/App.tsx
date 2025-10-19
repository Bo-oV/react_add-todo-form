import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { TodoFromServer, User } from './types/todo';

const newTodos: TodoFromServer[] = todosFromServer.map(t => ({ ...t }));
const users: User[] = usersFromServer.map(u => ({ ...u }));

export const App = () => {
  const [todos, setTodos] = useState<TodoFromServer[]>(newTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');
  const [errors, setErrors] = useState<{ title?: string; user?: string }>({});

  const onAdd = (newTodo: TodoFromServer) => {
    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: { title?: string; user?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
    }

    if (!selectedUserId) {
      newErrors.user = 'Please choose a user';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

    const newTodo: TodoFromServer = {
      id: nextId,
      title: title.trim(),
      completed: false,
      userId: Number(selectedUserId),
    };

    onAdd(newTodo);
    setTitle('');
    setSelectedUserId('');
    setErrors({});
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            value={title}
            placeholder="Enter title"
            type="text"
            data-cy="titleInput"
            onChange={e => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors(prev => ({ ...prev, title: undefined }));
              }
            }}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={e => {
              const value =
                e.currentTarget.value === ''
                  ? ''
                  : Number(e.currentTarget.value);

              setSelectedUserId(value);
              if (errors.user) {
                setErrors(prev => ({ ...prev, user: undefined }));
              }
            }}
          >
            <option value="">Choose a user</option>
            {users?.map(user => (
              <option key={user.id} value={user.id}>
                {user?.name}
              </option>
            ))}
          </select>
          {errors.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} users={users} />
    </div>
  );
};
