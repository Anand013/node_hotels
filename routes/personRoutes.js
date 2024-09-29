const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.post("/", async (req, res) => {
  try {
    const body = req?.body;
    const newPerson = new Person(body);
    const response = await newPerson.save();
    console.log("data saved successfully");
    res.status(200).json(response);
  } catch (e) {
    console.log("Error on saving person ", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetch successfully");
    res.status(200).json(data);
  } catch (e) {
    console.log("Error while fetch the data ", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

//parametrize api (using work type: for more info see Person schema)
router.get("/:work", async (req, res) => {
  try {
    const workType = req?.params?.work;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("Response fetch successfully /person/:work");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (e) {
    console.log("Error in person parametrize api calling : ", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const person_id = req?.params?.id;
    const updatedPersonData = req?.body;
    const updatePersonResponse = await Person.findByIdAndUpdate(
      person_id,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatePersonResponse) {
      return res.status(404).json({ error: "Invalid person id" });
    }
    console.log("Person updated successfully");
    res.status(200).json(updatePersonResponse);
  } catch (e) {
    console.log("Error in person update", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req?.params?.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Person deleted successfully");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (e) {
    console.log("Error found in delete person : ", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

//export router
module.exports = router;
