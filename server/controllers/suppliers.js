import Suppliers from "../models/supplier.js";
import SaplingArticle from "../models/saplingArticle.js";
import mongoose from "mongoose";

export const getSuppliersBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const name = new RegExp(searchQuery, "i"); //i means accept test Test TEST...
    const suppliers = await Suppliers.find({
      name,
      /*$or: [{name}, {details: {$in: details.split(',')}}] */
    });

    res.status(200).json(suppliers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await Suppliers.findById(id);

    res.status(200).json(supplier);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Suppliers.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSupplier = async (req, res) => {
  const content = req.body;

  const newSupplier = new Suppliers(content);

  try {
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } 
  catch (error) {
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

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no supplier with that id");

  await Suppliers.findByIdAndRemove(id);

  res.json({ message: "Seed deleted successfully" });
};

export const deleteSaplingArticle = async (req, res) => {
  const { id1,id2 } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id1))
    return res.status(404).send("no supplier with that id")
    if (!mongoose.Types.ObjectId.isValid(id2))
    return res.status(404).send("no sapling article with that id")

  const supplier = await Suppliers.findById(id1);

  supplier.saplings = supplier.saplings.filter((saplingArticle) => saplingArticle.id != id2);
  const updatedSupplier = await Suppliers.findByIdAndUpdate(
    supplier._id,
    supplier,
    {
      new: true,
    }
  );
  res.status(201).json(updatedSupplier);

}

export const deleteSeedArticle = async (req, res) => {
  const { id1,id2 } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id1))
    return res.status(404).send("no supplier with that id")
    if (!mongoose.Types.ObjectId.isValid(id2))
    return res.status(404).send("no seed article with that id")

  const supplier = await Suppliers.findById(id1);

  supplier.seeds = supplier.seeds.filter((seedArticle) => seedArticle.id != id2);
  
  const updatedSupplier = await Suppliers.findByIdAndUpdate(
    supplier._id,
    supplier,
    {
      new: true,
    }
  );
  res.status(201).json(updatedSupplier);

}

export const deleteMaterialArticle = async (req, res) => {
  const { id1,id2 } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id1))
    return res.status(404).send("no supplier with that id")
    if (!mongoose.Types.ObjectId.isValid(id2))
    return res.status(404).send("no material article with that id")

  const supplier = await Suppliers.findById(id1);


  supplier.materials = supplier.materials.filter((materialArticle) => materialArticle.id != id2);
  const updatedSupplier = await Suppliers.findByIdAndUpdate(
    supplier._id,
    supplier,
    {
      new: true,
    }
  );
  res.status(201).json(updatedSupplier);

}

export const createSaplingArticle = async (req, res) => {
  const { id } = req.params;
  const content = req.body;
  

  const supplier = await Suppliers.findById(id);

  supplier.saplings.push(content);
  const updatedSupplier = await Suppliers.findByIdAndUpdate(
    supplier._id,
    supplier,
    {
      new: true,
    }
  );

  res.status(201).json(updatedSupplier);
};

export const createSeedArticle = async (req, res) => {
  const { id } = req.params;
  const content = req.body;
  

  const supplier = await Suppliers.findById(id);

  supplier.seeds.push(content);
  const updatedSupplier = await Suppliers.findByIdAndUpdate(
    supplier._id,
    supplier,
    {
      new: true,
    }
  );
  
  res.status(201).json(updatedSupplier);
};

export const createMaterialArticle = async (req, res) => {
  const { id } = req.params;
  const content = req.body;
  

  const supplier = await Suppliers.findById(id);

  supplier.materials.push(content);
  const updatedSupplier = await Suppliers.findByIdAndUpdate(
    supplier._id,
    supplier,
    {
      new: true,
    }
  );
  
  res.status(201).json(updatedSupplier);
};

export const updateSaplingArticle = async (req, res) => {
  const { id } = req.params;
  const content = req.body;

  console.log(id,content)
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no supplier with that id")

  const supplier = await Suppliers.findById(id);

  supplier.saplings = supplier.saplings.filter((saplingArticle) => saplingArticle.id != content._id);
  supplier.saplings.push(content);
  
  const updatedSupplier = await Suppliers.findByIdAndUpdate(
    supplier._id,
    supplier,
    {
      new: true,
    }
  );
  res.status(201).json(updatedSupplier);
};

export const updateSeedArticle = async (req, res) => {
  const { id } = req.params;
  const content = req.body;
  console.log(content,id)

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no supplier with that id")

  const supplier = await Suppliers.findById(id);

  supplier.seeds = supplier.seeds.filter((seedArticle) => seedArticle.id != content._id);
  supplier.seeds.push(content);
  const updatedSupplier = await Suppliers.findByIdAndUpdate(
    supplier._id,
    supplier,
    {
      new: true,
    }
  );
  res.status(201).json(updatedSupplier);
};

export const updateMaterialArticle = async (req, res) => {
  const { id } = req.params;
  const content = req.body;


  const supplier = await Suppliers.findById(id);

  supplier.materials = supplier.materials.filter((materialArticle) => materialArticle.id != content._id);
  supplier.materials.push(content);
  const updatedSupplier = await Suppliers.findByIdAndUpdate(
    supplier._id,
    supplier,
    {
      new: true,
    }
  );
  res.status(201).json(updatedSupplier);
};