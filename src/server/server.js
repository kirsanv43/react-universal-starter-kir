import koa from 'koa';

const app = new koa();

app.listen(3000, "localhost", function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:3000/');
});

