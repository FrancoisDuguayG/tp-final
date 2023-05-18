const express = require("express");
const mongoose = require("mongoose");

const Item = require("../models/itemData");
const { name } = require("ejs");

const router = express.Router();

const getItems = async (req, res) => {
  const { price_range, page, sort } = req.query;
  //   const lon = req.query.lon ? Number(req.query.lon) : null;
  //   const lat = req.query.lat ? Number(req.query.lat) : null;
  const q = req.query.q ? req.query.q : "";
  const categorie = req.query.categorie ? req.query.categorie : "";
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  let sortMongo = {};
  if (sort === "price_asc") {
    sortMongo.price = 1;
  } else if (sort === "price_des") {
    sortMongo.price = -1;
  }
  try {
    const items = await Item.find({
      name: { $regex: new RegExp(q, "i") },
      categorie: { $regex: new RegExp(categorie, "i") },
    })
      .limit(limit)
      .skip(limit * page)
      .sort(sortMongo);

    res.status(200).json(items.map((item) => item.toJSON()));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getItem = async (req, res) => {
  const id = req.params.id;
  try {
    const item = await Item.findById(id);

    res.status(200).json(item.toJSON());
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getItems = getItems;
module.exports.getItem = getItem;
