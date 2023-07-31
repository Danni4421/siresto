const users = require('./api/users');
const UsersService = require('./service/db/users/UsersService');
const UsersValidator = require('./validator/users');

const employees = require('./api/users/employees');
const EmployeesService = require('./service/db/employees/EmployeesService');
const EmployeesValidator = require('./validator/employee');

const chefs = require('./api/users/employees/chefs');
const ChefsService = require('./service/db/chefs/ChefsService');
const ChefsValidator = require('./validator/chefs');

const admins = require('./api/users/employees/admins');
const AdminsService = require('./service/db/admins/AdminsService');
const AdminsValidator = require('./validator/admins');

const register = async (server) => {
  const usersService = new UsersService();
  const employeesService = new EmployeesService();
  const chefsService = new ChefsService();
  const adminsService = new AdminsService();

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: employees,
      options: {
        service: employeesService,
        validator: EmployeesValidator,
      },
    },
    {
      plugin: chefs,
      options: {
        service: chefsService,
        validator: ChefsValidator,
      },
    },
    {
      plugin: admins,
      options: {
        service: adminsService,
        validator: AdminsValidator,
      },
    },
  ]);
};

module.exports = register;
