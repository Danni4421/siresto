/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('menu_ingredients', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    menu_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    ingredient_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    qty: {
      type: 'INT',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'menu_ingredients',
    'fk_menu_ingredients.menu_id_menu.id',
    'FOREIGN KEY (menu_id) REFERENCES menu(id)'
  );

  pgm.addConstraint(
    'menu_ingredients',
    'fk_menu_ingredients.ingredient_id.ingredients.id',
    'FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint(
    'menu_ingredients',
    'fk_menu_ingredients.ingredient_id.ingredients.id'
  );
  pgm.dropConstraint('menu_ingredients', 'fk_menu_ingredients.menu_id_menu.id');
  pgm.dropTable('menu_ingredients');
};
