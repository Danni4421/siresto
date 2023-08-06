/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('employees', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    birth_date: {
      type: 'DATE',
      notNull: true,
    },
    ktp_id: {
      type: 'CHAR(16)',
      unique: true,
      notNull: true,
    },
  });

  pgm.addConstraint(
    'employees',
    'fk_employees.user_id_users.id',
    'FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('employees', 'fk_employees.user_id_users.id');
  pgm.dropTable('employees');
};
