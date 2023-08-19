import PropTypes from 'prop-types';
import SuccessButton from '../../Button/SuccessButton';

const MenuCard = ({ menu: { id, name, price, cover, category } }) => {
  return (
    <div className="w-64 h-auto shadow-md shadow-gray-400 bg-white rounded-lg text-left p-5">
      <div className="details">
        <img
          src={cover}
          alt={category}
          className="w-[100px] h-[100px] m-auto"
          onClick={() => (window.location = `/menu/${id}`)}
        />
        <h3 className="text-xl mt-5 font-thin font-monospace">{name}</h3>
        <h4 className="menu-price font-serif">Rp.{price}</h4>
      </div>
      <div className="button-group flex gap-2 mt-5">
        <SuccessButton>
          <a href={`/menu/${id}`}>Lihat</a>
        </SuccessButton>
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  menu: PropTypes.object,
};

export default MenuCard;
