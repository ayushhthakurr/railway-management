const express = require('express');
const dotenv = require('dotenv');
const {adminRouter} = require('./routes');
const {publicRouter} = require('./routes');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/admin', adminRouter);
app.use('/api/public', publicRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


