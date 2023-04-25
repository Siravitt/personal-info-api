require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const userRoute = require("./routes/user-route");

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/admin", () => {});

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 9999;
app.listen(port, () => console.log(`Server run on port ${port}`));
