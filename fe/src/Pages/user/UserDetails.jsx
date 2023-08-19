import { useEffect, useState } from 'react';
import { getIdentity } from '../../api/user';
import { Bar } from '../../Components/Navbar/Bar';

export const UserDetails = () => {
  const { id: userId } = JSON.parse(localStorage.getItem('AUTH_STATE'));
  const [user, setUser] = useState([]);
  const [initial, setInitial] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getIdentity(userId)
      .then((res) => {
        setUser(res.user);
        const matches = res.user.firstName.match(/\b(\w)/g);
        const acronym = matches.join('');
        setInitial(acronym);
      })
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
      );
  }, [userId]);

  if (isLoading) {
    return (
      <div className="h-[100vh] flex justify-center items-center ease-in-out">
        <img src="https://i.gifer.com/XOsX.gif" alt="loading" />
      </div>
    );
  }

  return (
    <div className="h-[100vh] bg-background">
      <Bar></Bar>
      {user !== null && (
        <div className="identity flex mt-28 gap-10 items-center justify-center">
          <div className="w-[200px] h-[200px] rounded-full bg-white flex justify-center items-center">
            <h1 className="text-7xl">{initial}</h1>
          </div>
          <div className="data">
            <p className="text-3xl font-bold">
              {user.firstName + ' ' + user.lastName}
            </p>
            <h1 className="text-md">{user.username}</h1>
            <p className="text-xl">{user.email}</p>
            <p className="text-lg">{user.address}</p>
          </div>
        </div>
      )}
    </div>
  );
};
