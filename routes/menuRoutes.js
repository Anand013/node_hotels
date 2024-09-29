const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req?.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("Menu data saved successfully");
    res.status(200).json(response);
  } catch (e) {
    console.log("Got some error in save menu item : ", e);
    res.status(500).json({ error: "Internal sever error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await MenuItem.find();
    console.log("menu item fetched successfully");
    res.status(200).json(response);
  } catch (e) {
    console.log("Some error occurred in fetch menu ", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req?.params?.taste;
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("taste parametrized api call fetched successfully");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste found" });
    }
  } catch (e) {
    console.log("Error found in taste parametrize api : ", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
