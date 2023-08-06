const MapCartsToModels = ({ id, name, qty, order_date, status }) => ({
  id,
  name,
  qty,
  orderDate: order_date,
  status,
});

module.exports = MapCartsToModels;
