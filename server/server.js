const app  = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(9000, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

