const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const aadhaarRoutes = require('./routes/aadhaarRoutes');
const globalMiddleware = require('./middleware/globalMiddleware');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(globalMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/aadhaar', aadhaarRoutes); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});