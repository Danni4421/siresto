/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addColumn('menu', {
    cover_url: {
      type: 'TEXT',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('menu', 'cover_url');
};
