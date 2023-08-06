/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('chefs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    employee_id: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    certifications: {
      type: 'TEXT[]',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'chefs',
    'fk_chefs.employee_id_employees.id',
    'FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('chefs', 'fk_chefs.employee_id_employees.id');
  pgm.dropTable('chefs');
};
