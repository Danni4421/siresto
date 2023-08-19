import PropTypes from 'prop-types';

export const TransactionsCard = ({
  transaction: { cover, name, category, status, tanggal, total },
}) => {
  return (
    <div className="flex w-full mx-auto p-5 my-5 justify-between bg-white">
      <div className="flex items-center">
        <img src={cover} alt="" className="w-1/4" />
        <div id="information" className="px-5">
          <h2 className="text-3xl text-dark-green font-bold uppercase">
            {name}
          </h2>
          <p className="text-lg">{category}</p>
        </div>
      </div>
      <div id="details" className="flex flex-col justify-between">
        <p className="px-5 py-2 font-['roboto'] text-center text-lg rounded-lg text-white bg-dark-red">
          {status}
        </p>
        <div className="flex flex-col items-end">
          <p className="text-xl">{tanggal}</p>
          <h4 className="text-3xl font-bold text-dark-green">
            <span>Rp</span>
            {total}
          </h4>
        </div>
      </div>
    </div>
  );
};

TransactionsCard.propTypes = {
  transaction: PropTypes.object.isRequired,
  cover: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
  total: PropTypes.number,
};
