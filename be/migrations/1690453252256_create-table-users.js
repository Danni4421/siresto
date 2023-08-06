/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    first_name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    last_name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    email: {
      type: 'TEXT',
      notNull: true,
    },
    address: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
