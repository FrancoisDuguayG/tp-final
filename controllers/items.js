const express = require("express");
const mongoose = require("mongoose");

const Item = require("../models/itemData");

const router = express.Router();

const getItems = async (req, res) => {
  const { q, price_range, genres, page } = req.query;
//   const lon = req.query.lon ? Number(req.query.lon) : null;
//   const lat = req.query.lat ? Number(req.query.lat) : null;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  try {
    const items = await Item.find()
      .limit(limit)
      .skip(limit * page);

    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getItem = async (req, res) => {
  const id = req.params.id;
  try {
    const item = await Item.find({ id });

    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getItems = getItems;
module.exports.getItem = getItem;
