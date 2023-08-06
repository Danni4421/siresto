const MapEmployeesToModels = ({ id, username, first_name, last_name }) => ({
  id,
  username,
  firstName: first_name,
  lastName: last_name,
});

module.exports = MapEmployeesToModels;
