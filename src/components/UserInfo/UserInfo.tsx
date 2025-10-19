import { User } from '../../types/todo';

interface Props {
  user?: User; // обов'язково перевіряємо, бо user може бути undefined
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email || 'Uknow email'}`}>
      {user?.name || 'Uknow user'}
    </a>
  );
};
