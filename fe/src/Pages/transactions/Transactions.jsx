import { useEffect, useState } from 'react';
import { TransactionsBar } from '../../Components/Navbar/TransactionsBar';
import { getTransactionUser } from '../../api/transactions';
import { TransactionsCard } from '../../Components/Card/transactions/TransactionsCard';
import ShoppingBag from '../../assets/img/ShoppingBag.png';
import SuccessButton from '../../Components/Button/SuccessButton';

export const Transactions = () => {
  const [active, setActive] = useState('processed');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactionUser().then((res) => {
      setTransactions(res);
    });
  }, []);

  const PrintTransactions = () => {
    if (transactions.length > 0) {
      const filteredTransaction = transactions.filter(
        (t) => t.status === active
      );

      if (filteredTransaction.length <= 0) {
        return (
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
            <img
              src={ShoppingBag}
              alt="No Orders"
              className="w-[150px] h-[150px]"
            />
            <div className="text-center">
              <h1 className="text-3xl font-[roboto] font-bold mt-5 mb-2 text-dark-green">
                Belum ada pesanan
              </h1>
              <SuccessButton>
                <a href="/menu">Belanja Sekarang</a>
              </SuccessButton>
            </div>
          </div>
        );
      }

      return filteredTransaction.map((t) => {
        return <TransactionsCard key={t.id} transaction={t} />;
      });
    }
  };

  return (
    <div className="absolute w-full h-full bg-background">
      <TransactionsBar value="Transaksi" />
      <div id="nav" className="w-11/12 mx-auto px-10 py-5 bg-white">
        <ul className="flex justify-between font-['roboto'] font-semibold text-xl text-dark-green">
          <li
            className={active === 'processed' ? 'nav-active' : ''}
            onClick={() => setActive('processed')}
          >
            Sedang Proses
          </li>
          <li
            className={active === 'delivered' ? 'nav-active' : ''}
            onClick={() => setActive('delivered')}
          >
            Dikirim
          </li>
          <li
            className={active === 'done' ? 'nav-active' : ''}
            onClick={() => setActive('done')}
          >
            Selesai
          </li>
          <li
            className={active === 'canceled' ? 'nav-active' : ''}
            onClick={() => setActive('canceled')}
          >
            Dibatalkan
          </li>
        </ul>
      </div>

      <div id="list-transactions" className="w-11/12 mx-auto">
        <PrintTransactions />
      </div>
    </div>
  );
};
