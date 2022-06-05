import Employers from "../models/employerModel.js";
import mongoose from "mongoose";

export const getEmployers = async (req, res) => {
  try {
    const employers = await Employers.find();
    res.status(200).json(employers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEmployer = async (req, res) => {
  const content = req.body;

  const newEmployer = new Employers({...content,workStart:new Date(),coefficient:1});

  try {
    await newEmployer.save();

    res.status(201).json(newEmployer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateEmployer = async (req, res) => {
  const { id } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  const updatedEmployer = await Employers.findByIdAndUpdate(
    id,
    { ...content, id },
    {
      new: true,
    }
  );
  res.json(updatedEmployer);
};

export const absence = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no employer with that id");

  const employer = await Employers.findById(id);
  const updatedEmployer = await Employers.findByIdAndUpdate(
    id,
    { absenceCount: employer.absenceCount + 1 },
    {
      new: true,
    }
  );
  res.json(updatedEmployer);
};

export const reinitialiser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  const employer = await Employers.findById(id);
  var newDate = new Date();
  newDate.setDate(newDate.getDate() + 1);
  const updatedEmployer = await Employers.findByIdAndUpdate(
    id,
    { absenceCount: 0,
      workStart: newDate },
    {
      new: true,
    }
  );

  res.json(updatedEmployer);
};

export const deleteEmployer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  const deleteEmployer = await Employers.findByIdAndRemove(id);

  res.json({ message: "Employer deleted successfully" });
};
