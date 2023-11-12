const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

router.render = (req, res) => {
  if (req.url.startsWith('/custormer')) {
    if (req.method === 'POST') {
      req.body.createdAt = new Date().toISOString();
    }
  }
  res.jsonp(res.locals.data);
};

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
