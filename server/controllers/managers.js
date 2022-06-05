import Managers from "../models/manager.js";
import mongoose from "mongoose";

export const getManagers = async (req, res) => {
  try {
    const managers = await Managers.find();
    res.status(200).json(managers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addManager = async (req, res) => {
  const content = req.body;

  const newManager = new Managers(content);

  try {
    await newManager.save();

    res.status(201).json(newManager);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateManager = async (req, res) => {
  const { id } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no manager with that id");

  const updatedManager = await Managers.findByIdAndUpdate(
    id,
    { ...content, id },
    {
      new: true,
    }
  );
  res.status(200).json(updatedManager)
};

export const removeManager = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no manager with that id");

  await Managers.findByIdAndRemove(id);

  res.json({ message: "Employer deleted successfully" });
};
