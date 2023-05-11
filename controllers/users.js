const crypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");

const userData = require("../models/userData.js");

const router = express.Router();

const saltRounds = 10;

const login = async (req, res) => {
  try {
    const user = await userData.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({ message: "Wrong email" });
    }

    let isValid = await crypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Wrong password" });
    }

    let uuid = crypto.randomUUID();

    await userData.findOneAndUpdate({ email: req.body.email }, { token: uuid });

    res.status(200).json({ token: uuid });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    console.log(req.headers.authorization);
    const user = await userData.findOne({
      token: req.headers.authorization,
    });
    if (!user) {
      return res.status(401).json({ message: "Not Authorize" });
    }

    await userData.findOneAndUpdate(
      { token: req.headers.authorization },
      { token: null }
    );
    console.log(req.headers.authorization);

    res.status(200).json();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userData.findOne({
      token: req.headers.authorization,
    });

    if (!user) {
      return res.status(401).json({ message: "Not Authorize" });
    }

    res.status(200).json(user.toJSON());
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addFavorite = async (req, res) => {
  try {
    let user = await userData.findOne({
      token: req.headers.authorization,
    });

    if (!req.body.id) {
      return res.status(404).json({ message: "Body should contain a {id:}" });
    }

    if (!user) {
      return res.status(401).json({ message: "Not Authorize" });
    }

    let newUser = await userData.findOneAndUpdate(
      {
        token: req.headers.authorization,
      },
      {
        favorites: [...user.favorites, req.body.id],
      }
    );
    res.status(200).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const user = await userData.findOne({
      token: req.headers.authorization,
    });

    if (!user) {
      return res.status(401).json({ message: "Not Authorize" });
    }

    await userData.findOneAndUpdate(
      { token: req.headers.authorization },
      { favorites: user.favorites.filter((id) => id != req.params.id) }
    );
    res.status(200).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signup = async (req, res) => {
  console.log(req.body);
  const newUser = new userData({
    email: req.body.email,
    name: req.body.name,
    password: await crypt.hash(req.body.password, saltRounds),
  });
  try {
    await newUser.save();
    res.status(200).json(newUser.toJSON());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.register = signup;
module.exports.login = login;
module.exports.logout = logout;
module.exports.getInfo = getInfo;
module.exports.addFavorite = addFavorite;
module.exports.removeFavorite = removeFavorite;
