const inert = require('@hapi/inert');
const path = require('path');

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

const categories = require('./api/products/categories');
const CategoriesService = require('./service/db/categories/CategoriesService');
const CategoriesValidator = require('./validator/categories');

const menu = require('./api/products/menu');
const MenuService = require('./service/db/menu/MenuService');
const MenuValidator = require('./validator/menu');

const ingredients = require('./api/ingredients');
const IngredientsService = require('./service/db/ingredients/IngredientsService');
const IngredientsValidator = require('./validator/ingredients');

const menu_ingredients = require('./api/ingredients/menu_ingredients');
const MenuIngredientsService = require('./service/db/menuIngredients/MenuIngredientsService');
const MenuIngredientsValidator = require('./validator/menu-ingredients');

const transactions = require('./api/transactions');
const TransactionsService = require('./service/db/transactions/TransactionsService');
const TransactionsValidator = require('./validator/transactions');

const authentications = require('./api/authentications');
const AuthenticationsService = require('./service/db/authentications/AuthenticationsService');
const AuthenticationsValidator = require('./validator/authentications');
const TokenManager = require('./tokenize/TokenManager');

const superadmins = require('./api/authentications/super_admins');
const SuperAdminsService = require('./service/db/super_admins/SuperAdminsService');
const SuperAdminsValidator = require('./validator/super_admins');
const SuperAdminTokenManager = require('./tokenize/SuperAdminTokenManager');

const StorageService = require('./service/storage/StorageService');

const register = async (server) => {
  const usersService = new UsersService();
  const employeesService = new EmployeesService();
  const chefsService = new ChefsService();
  const adminsService = new AdminsService();
  const categoriesService = new CategoriesService();
  const menuService = new MenuService();
  const ingredientsService = new IngredientsService();
  const menuIngredientsService = new MenuIngredientsService();
  const transactionsService = new TransactionsService();
  const authenticationsService = new AuthenticationsService();
  const superAdminsService = new SuperAdminsService();
  const storageService = new StorageService(
    path.resolve(__dirname, 'api/products/menu/covers/img')
  );

  await server.register([
    {
      plugin: inert,
    },
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
        adminsService,
        superAdminsService,
        validator: EmployeesValidator,
      },
    },
    {
      plugin: chefs,
      options: {
        service: chefsService,
        adminsService,
        superAdminsService,
        validator: ChefsValidator,
      },
    },
    {
      plugin: admins,
      options: {
        service: adminsService,
        superAdminsService,
        validator: AdminsValidator,
      },
    },
    {
      plugin: categories,
      options: {
        categoriesService,
        chefsService,
        validator: CategoriesValidator,
      },
    },
    {
      plugin: menu,
      options: {
        menuService,
        chefsService,
        storageService,
        validator: MenuValidator,
      },
    },
    {
      plugin: ingredients,
      options: {
        ingredientsService,
        chefsService,
        validator: IngredientsValidator,
      },
    },
    {
      plugin: menu_ingredients,
      options: {
        menuIngredientsService,
        chefsService,
        validator: MenuIngredientsValidator,
      },
    },
    {
      plugin: transactions,
      options: {
        transactionsService,
        menuIngredientsService,
        ingredientsService,
        validator: TransactionsValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        usersService,
        authenticationsService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: superadmins,
      options: {
        service: superAdminsService,
        tokenManager: SuperAdminTokenManager,
        authenticationsService,
        validator: SuperAdminsValidator,
        AuthenticationsValidator,
      },
    },
  ]);
};

module.exports = register;
