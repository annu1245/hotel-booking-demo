const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const aadhaarRoutes = require('./routes/aadhaarRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/bookings', bookingRoutes);
app.use('/hotels', hotelRoutes);
app.use('/aadhaar', aadhaarRoutes); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});