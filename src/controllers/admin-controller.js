const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Admin, User, Infomation } = require("../models");
const createError = require("../utils/create-error");
const { validateLogin } = require("../validators/authAdmin-validate");

exports.loginAdmin = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    const admin = await Admin.findOne({
      where: {
        username: value.username,
      },
    });

    if (!admin) {
      createError("Invalid username or password", 400);
    }

    const isCorrect = await bcrypt.compare(value.password, admin.password);
    if (!isCorrect) {
      createError("invalid username or password", 400);
    }

    const accessToken = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    const info = await Infomation.findAll({
      where: {
        userId: req.params,
      },
    });
    res.status(200).json({ info });
  } catch (err) {
    next(err);
  }
};

exports.editUserInfo = async (req, res, next) => {
  try {
    const id = req.params;

    await User.update(req.body, {
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Update success" });
  } catch (err) {
    next(err);
  }
};

exports.deleteUserInfo = async (req, res, next) => {
  try {
    const id = req.params;

    await User.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Delete success" });
  } catch (err) {
    next(err);
  }
};
