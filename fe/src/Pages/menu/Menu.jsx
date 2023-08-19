import { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { getMenu, searchMenu } from '../../api/menu';
import { Outlet } from 'react-router-dom';
import { Bar } from '../../Components/Navbar/Bar';
import MenuCard from '../../Components/Card/menu/MenuCard';

export const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenu().then((response) => {
      setMenu(response.menu);
    });
  }, []);

  const GetListMenu = () => {
    return menu.map((m) => {
      return <MenuCard key={m.id} menu={m} />;
    });
  };

  const searchMenuByName = (val) => {
    if (val.length > 3) {
      searchMenu(val).then((res) => {
        setMenu(res.menu);
      });
    }

    if (val === '') {
      getMenu().then((res) => {
        setMenu(res.menu);
      });
    }
  };

  return (
    <div className="w-full h-[100vh]">
      <Bar>
        <div className="search-container p-5">
          <input
            type="search"
            id="search-input"
            placeholder="Search menu"
            className="rounded-l-lg text-black py-2 w-8/12 placeholder: px-5"
            onChange={(e) => searchMenuByName(e.target.value)}
          />
          <button className="rounded-r-lg bg-background relative top-[3px] p-3 text-dark-red">
            <BiSearchAlt />
          </button>
        </div>
      </Bar>
      <div className="list-menu flex gap-5 w-9/12 py-10 mx-auto">
        <GetListMenu />
      </div>
      <Outlet />
    </div>
  );
};
