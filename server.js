// server.js
const app = require('./app');

const PORT = process.env.PORT || 8080;  // Cloud Run uses 8080 by default
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
