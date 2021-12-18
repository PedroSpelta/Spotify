const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = "5001";

app.listen(PORT, () => {
  console.log("Online on port: ", PORT);
});

app.get("/users", (req, res) => {
  const users = fs.readFileSync(path.join(__dirname, "/users.json"), "utf8");
  res.status(200).json(JSON.parse(users));
});

app.post("/users", (req, res) => {
  const postedUser = req.body;
  const usersString = fs.readFileSync(
    path.join(__dirname, "/users.json"),
    "utf8"
  );
  const users = JSON.parse(usersString);
  const { data } = users;
  const isOldUser = data.find((user) => {
    return user.name === postedUser.name;
  });
  if (!isOldUser) {
    const newData = [...data, postedUser];
    const newUsers = { ...users, data: newData };
    fs.writeFileSync(
      path.join(__dirname, "/users.json"),
      JSON.stringify(newUsers),
      "utf8"
    );
    return res
      .status(200)
      .json({ message: "Successfully registered", data: newUsers });
  }
  res.status(200).json({ message: "User already registered", data });
});
