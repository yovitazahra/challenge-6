const PORT = 3006;
const express = require("express");
const userService = require("./services/userService");
const carService = require("./services/carService");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function authenticate_user(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    "jsqoiwjdksmakjsndqiuwjdlksmlMjkakmdklAMkjsdmnfkj1sg1naskdkjasndja",
    (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    }
  );
}

//Register
const prefix = "/v1/api";
app.post(
  prefix + "/register",
  authenticate_user,
  async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;
      if (req.user.role !== "superadmin") {
        return res.sendStatus(403);
      }
      const user = await userService.register(name, email, password, role);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

//Login
app.post(prefix + "/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//Create Car
app.post(prefix + "/car/create", authenticate_user, async (req, res, next) => {
  try {
    const { car_name, price, size } = req.body;
    if (req.user.role == "member") {
      return res.sendStatus(403);
    }
    const car = await carService.addProduct(car_name, price, size);
    res.json(car);
  } catch (err) {
    next(err);
  }
});

//Delete Car
app.delete(
  prefix + "/car/delete/:car_name",
  authenticate_user,
  async (req, res, next) => {
    try {
      const car_name = req.params.car_name;
      if (req.user.role == "member") {
        return res.sendStatus(403);
      }
      const car = await carService.deleteProduct(car_name);
      res.status(200).json({ msg: "Product Deleted" });
    } catch (err) {
      next(err);
    }
  }
);

//Show Car List
app.get(prefix + "/car/list", authenticate_user, async (req, res, next) => {
  try {
    if (req.user.role == "member") {
      return res.sendStatus(403);
    }
    const car = await carService.getProduct();
    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
});

//Update Car
app.patch(
  prefix + "/car/update/:car_name",
  authenticate_user,
  async (req, res, next) => {
    try {
      const car_name = req.params.car_name;
      if (req.user.role == "member") {
        return res.sendStatus(403);
      }
      await carService.updateProduct(req.body, car_name);
      res.status(200).json({ msg: "Product Updated" });
    } catch (error) {
      next(error);
    }
  }
);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("An error occurred");
});

app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
