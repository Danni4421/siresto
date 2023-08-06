/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('authentications', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    token: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('authentications');
};
