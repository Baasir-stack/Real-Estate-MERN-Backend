const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Use require for importing
const residencyRoutes = require('./routes/residencyRoutes'); // Use require for importing
const errorHandler = require('./middleware/errorHandler');
dotenv.config();
const path = require('path')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../client/public")));


app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRoutes); // Use userRoutes here
app.use('/api/residency', residencyRoutes); // Use residencyRoutes here

app.use(errorHandler);

