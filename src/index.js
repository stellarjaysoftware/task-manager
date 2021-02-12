const express = require("express");
const cors = require('cors');
require("./db/mongoose"); // to create the connection
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// custom middleware function
// app.use((req, res, next) => {
//   // res.status(503).send('under maintenance');
//   if (req.method === 'GET') {
//     res.send('GET disabled');
//   } else {
//     next();
//   }
// })
const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("server is up on port " + port);
});
