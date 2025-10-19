import { User } from '../../types/todo';

interface Props {
  user?: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email || 'Uknow email'}`}>
      {user?.name || 'Uknow user'}
    </a>
  );
};
