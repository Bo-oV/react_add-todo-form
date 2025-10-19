import { TodoFromServer, User } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoFromServer[];
  users: User[];
}

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} users={users} />
      ))}
    </section>
  );
};
