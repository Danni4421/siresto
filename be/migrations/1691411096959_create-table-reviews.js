/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('reviews', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    menu_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    comment: {
      type: 'TEXT',
    },
    star: {
      type: 'DECIMAL(3, 1)',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'reviews',
    'fk_reviews.user_id_users.id',
    'FOREIGN KEY (user_id) REFERENCES users(id)'
  );

  pgm.addConstraint(
    'reviews',
    'fk_reviews.menu_id_menu.id',
    'FOREIGN KEY (menu_id) REFERENCES menu(id)'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('reviews', 'fk_reviews.menu_id_menu.id');
  pgm.dropConstraint('reviews', 'fk_reviews.user_id_users.id');
  pgm.dropTable('reviews');
};
