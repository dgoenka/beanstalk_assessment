'use strict';

const controller = require('./user.controller');
const koaBody = require('koa-body');

module.exports = Router => {
  const router = new Router({
    prefix: `/transform`,
  });

  router.post('/csv', koaBody({ multipart: true }), controller.transformCSV);

  return router;
};
