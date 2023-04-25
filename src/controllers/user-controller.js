const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { User } = require("../models");
const { validateRegister } = require("../validators/authUser-validate");
const createError = require("../utils/create-error");

exports.getUser = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
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

    console.log(user);

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
  } catch (err) {
    next(err);
  }
};

exports.addInformation = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
