import Materials from "../models/materialModel.js";
import MaterialsStock from "../models/materialsStockModel.js";
import mongoose from "mongoose";

export const getMaterialsBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const name = new RegExp(searchQuery, "i"); //i means accept test Test TEST...
    const materials = await Materials.find({
      name,
      /*$or: [{name}, {details: {$in: details.split(',')}}] */
    });

    console.log(materials)
    res.status(200).json(materials);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMaterialsByFamily = async (req, res) => {
  const { searchQuery } = req.query;
  console.log("sq",searchQuery)

  try {
    const family = new RegExp(searchQuery, "i"); //i means accept test Test TEST...
    const materials = await Materials.find({
      family,
      /*$or: [{name}, {details: {$in: details.split(',')}}] */
    });

    console.log(materials)
    res.status(200).json(materials);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMaterials = async (req, res) => {
  try {
    const materials = await Materials.find();

    res.status(200).json(materials);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const material = await Materials.findById(id);

    res.status(200).json(material);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRow = async (req, res) => {
  const { id } = req.params;
  const material = await Materials.findById(id);

  let rowId = 0
  let exist = true
  while(exist)
  {
    rowId++
    exist=false
    material.stock.forEach((item)=>
      {if(item.id===rowId) exist=true}
    )
  }

  const Row = new MaterialsStock({
    id: rowId,
    supplier: "",
    age: 0,
    createdAt: new Date(),
    length: 0,
    price: 0,
    weight: 0,
    details: [""],
  });
  material.stock.push(Row);
  const updatedMaterial = await Materials.findByIdAndUpdate(
    material._id,
    material,
    {
      new: true,
    }
  );
  res.status(201).json(updatedMaterial);
};

export const deleteRow = async (req, res) => {
  const { id1, id2 } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id1))
    return res.status(404).send("no post with that id");

  const material = await Materials.findById(id1);
  let deletedRow = {};
  material.stock.forEach((obj) => {
    if (obj.id == id2) {
      deletedRow = obj;
    }
  });

  material.stock = await material.stock.filter((row) => row.id !== deletedRow.id);

  const updatedMaterial = await Materials.findByIdAndUpdate(id1, material, {
    new: true,
  });

  res.status(201).json(updatedMaterial);
};

export const updateCol = async (req, res) => {
  const { id1, id2 } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id1))
    return res.status(404).send("no post with that id");

  const material = await Materials.findById(id1);
  let newRow = {};
  material.stock.forEach((obj) => {
    if (obj.id == id2) {
      newRow = obj;
    }
  });

  let line = JSON.parse(
    "{" + '"' + content.key + '":"' + content.value + '"' + "}"
  );

  console.log(newRow);
  var obj = Object.assign(newRow, line);

  material.stock = await material.stock.filter((row) => row.id !== newRow.id);
  material.stock.push(obj);

  const updatedMaterial = await Materials.findByIdAndUpdate(id1, material, {
    new: true,
  });
  res.status(201).json(updatedMaterial);
};

export const createMaterial = async (req, res) => {
  let content = req.body;
  
  const name = new RegExp(content.name, "i");
  const material = await Materials.findOne({ name });
  if (material) {
    content.stock = { ...content.stock[0], id: material.stock.length, };
    await material.stock.push(content.stock);
    const updatedMaterial = await Materials.findByIdAndUpdate(
      material._id,
      material,
      {
        new: true,
      }
    );
  } else {
    content.stock = { ...content.stock[0], id: 0 };
    const newMaterial = new Materials(content);

    await newMaterial.save();
    res.status(201).json(newMaterial);
  }
};

export const updateMaterial = async (req, res) => {
  const { id: id } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no material with that id");

  const updatedMaterial = await Materials.findByIdAndUpdate(
    id,
    { ...content, id },
    {
      new: true,
    }
  );
  res.status(201).json(updatedMaterial);
};

export const deleteMaterial = async (req, res) => {
  const { id: id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  await Materials.findByIdAndRemove(id);

  res.json({ message: "Material deleted successfully" });
};