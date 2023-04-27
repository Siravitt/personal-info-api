const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { User, Information } = require("../models");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authUser-validate");
const {
  validateInformation,
} = require("../validators/informationUser-validate");
const createError = require("../utils/create-error");

exports.loginUser = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    const user = await User.findOne({
      where: {
        username: value.username,
      },
    });

    if (!user) {
      createError("Invalid username or password", 400);
    }

    const isCorrect = await bcrypt.compare(value.password, user.password);
    if (!isCorrect) {
      createError("invalid username or password", 400);
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        citizenId: user.citizenId,
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

exports.registerUser = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            phone: value.phone,
          },
          {
            citizenId: value.citizenId,
          },
        ],
      },
    });

    if (user) {
      createError("Phone or Citizen ID is already in use", 400);
    }

    value.password = await bcrypt.hash(value.password, 12);

    await User.create(value);

    res.status(200).json({ message: "Register success, Please go to login" });
  } catch (err) {
    next(err);
  }
};

exports.getInformation = async (req, res, next) => {
  try {
    const information = await Information.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["date", "DESC"]],
      limit: 10,
    });
    res.status(200).json({ information });
  } catch (err) {
    next(err);
  }
};

exports.addInformation = async (req, res, next) => {
  try {
    const value = validateInformation(req.body);

    value.userId = req.user.id;

    await Information.create(value);

    res.status(200).json({ message: "Create success" });
  } catch (err) {
    next(err);
  }
};
