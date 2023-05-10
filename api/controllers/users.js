const crypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");

const userData = require("../models/userData.js");

const router = express.Router();

const login = async (req, res) => {
  try {
    let a = await crypt.hash(req.body.password, 10);
    const user = await userData.findOne({
      userName: req.body.userName,
    });

    if (!user) {
      throw new Error("Wrong user!!");
      res.status(404).json({ message: "Wrong user" });
      return;
    }

    let isValid = await crypt.compare(req.body.password, user.password);
    if (!isValid) {
      res.status(300).json({ message: "Wrong password" });
      return;
    }

    let uuid = crypto.randomUUID();
    console.log(uuid);
    await userData.findOneAndUpdate(
      { userName: req.body.userName },
      { token: uuid }
    );

    res.status(200).json({ token: uuid });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const saltRounds = 10;
const register = async (req, res) => {
  console.log(req.body);
  const newUser = new userData({
    fullName: req.body.fullName,
    userName: req.body.userName,
    password: await crypt.hash(req.body.password, saltRounds),
  });
  try {
    await newUser.save();
    res
      .status(200)
      .json({ fullName: req.body.fullName, userName: req.body.userName });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.register = register;
module.exports.login = login;
