import { TodoFromServer, User } from '../../types/todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: TodoFromServer;
  users?: User[];
}

export const TodoInfo: React.FC<Props> = ({ todo, users = [] }) => {
  const user = users.find(u => u.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? `TodoInfo--completed` : ''}`}
    >
      <h2 className="TodoInfo__title">{`${todo.title}`}</h2>

      {user ? <UserInfo user={user} /> : null}
    </article>
  );
};
