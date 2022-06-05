import Suppliers from "supplier.js";
import mongoose from "mongoose";

export const getEmployers = async (req, res) => {
  try {
    const employers = await Employers.find();
    res.status(200).json(employers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSupplier = async (req, res) => {
  const content = req.body;

  const newSupplier = new Suppliers(content);

  try {
    await newSupplier.save();

    res.status(201).json(newEmployer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  const updatedSuppliers = await Suppliers.findByIdAndUpdate(
    id,
    { ...content, id },
    {
      new: true,
    }
  );
};
