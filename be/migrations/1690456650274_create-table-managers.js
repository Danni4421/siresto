/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('admins', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    employee_id: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
  });

  pgm.addConstraint(
    'admins',
    'fk_admins.employee_id_employees.id',
    'FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('managers', 'fk_managers.employee_id_employees.id');
  pgm.dropTable('managers');
};
