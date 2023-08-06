const MapUsersToModels = ({
  id,
  username,
  first_name,
  last_name,
  email,
  address,
}) => ({
  id,
  username,
  firstName: first_name,
  lastName: last_name,
  email,
  address,
});

module.exports = MapUsersToModels;
