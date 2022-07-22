const express = require("express");
import { Middleware } from "./routes/Middleware/Middleware";
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const { REGISTER_ROUTE } = require("./routes/Register/register");
const { LOGIN_ROUTE } = require("./routes/Login/login");
const schema = require("./schema/schema");
const cookieParser = require("cookie-parser");
const { graphqlUploadExpress } = require("graphql-upload");
const setupDB = require("../db_setup.js");

setupDB();

const app = express();

app.use(
  cors({
    origin: ["*", "http://localhost:8000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/login", LOGIN_ROUTE);
app.use("/register", REGISTER_ROUTE);

app.use(express.urlencoded({ extended: true }));

app.use("/logout", (req, res) => {
  res.cookie("jwt", "null", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
    // secure: true,
    // domain: ClientServer,
  });
  res.redirect("http://localhost:8000/");
});

app.use(Middleware);

app.get(`/post_image/:postID/:imageName`, (req, res) => {
  res.sendFile(
    `./app/images/posts/post_${req.params.postID}/${req.params.imageName}`,
    {
      root: "./",
    }
  );
});

app.get(`/avatar/:filename`, (req, res) => {
  res.sendFile(`./app/images/avatars/${req.params.filename}`, {
    root: "./",
  });
});

app.use(
  "/graphql",
  graphqlUploadExpress({
    maxFileSize: 99999999,
    maxFiles: 10,
  }),
  Middleware,
  express.json(),
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const port = 8001;
app.listen(port);
console.log(`Running a server at http://localhost:${port}/graphql`);
