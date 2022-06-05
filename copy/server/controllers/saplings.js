import Saplings from "../models/saplingModel.js";
import SaplingsStock from "../models/saplingStockModel.js";
import mongoose from "mongoose";

export const getSaplingsBySearch = async (req, res) => {
  console.log("lol");
  const { searchQuery } = req.query;

  try {
    const name = new RegExp(searchQuery, "i"); //i means accept test Test TEST...
    const saplings = await Saplings.find({
      name,
      /*$or: [{name}, {details: {$in: details.split(',')}}] */
    });

    res.status(200).json(saplings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSaplings = async (req, res) => {
  try {
    const saplings = await Saplings.find();
    //saplings.map((sapling)=>sapling.stock.map((element)=>{});

    res.status(200).json(saplings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSapling = async (req, res) => {
  const { id } = req.params;
  try {
    const sapling = await Saplings.findById(id);

    res.status(200).json(sapling);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteRow = async (req, res) => {
  const { id1, id2 } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id1))
    return res.status(404).send("no post with that id");

  const sapling = await Saplings.findById(id1);
  let deletedRow = {};
  sapling.stock.forEach((obj) => {
    if (obj.id == id2) {
      deletedRow = obj;
    }
  });

  sapling.stock = await sapling.stock.filter((row) => row.id !== deletedRow.id);

  console.log(sapling);
  const updatedSapling = await Saplings.findByIdAndUpdate(id1, sapling, {
    new: true,
  });

  res.status(201).json(updatedSapling);
};

export const updateCol = async (req, res) => {
  const { id1, id2 } = req.params;
  const content = req.body;

  console.log(req.params);
  console.log(id2);
  console.log(req.body);

  if (!mongoose.Types.ObjectId.isValid(id1))
    return res.status(404).send("no post with that id");

  const sapling = await Saplings.findById(id1);
  let newRow = {};
  sapling.stock.forEach((obj) => {
    if (obj.id == id2) {
      newRow = obj;
    }
  });

  let line = JSON.parse(
    "{" + '"' + content.key + '":"' + content.value + '"' + "}"
  );

  console.log(newRow);
  var obj = Object.assign(newRow, line);
  console.log(obj);

  sapling.stock = await sapling.stock.filter((row) => row.id !== newRow.id);
  sapling.stock.push(obj);

  const updatedSapling = await Saplings.findByIdAndUpdate(id1, sapling, {
    new: true,
  });
  res.status(201).json(updatedSapling);
};

/*export const updateRow = async (req, res) => {
  const { id } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  const sapling = await Saplings.findById(id);
  const newRow = new SaplingsStock(content);

  sapling.stock = await sapling.stock.filter((row) => row.id !== newRow.id);
  sapling.stock.push(content);

  const updatedSapling = await Saplings.findByIdAndUpdate(id, sapling, {
    new: true,
  });
  res.status(201).json(updatedSapling);
};*/

export const createRow = async (req, res) => {
  const { id } = req.params;
  const sapling = await Saplings.findById(id);

  const Row = new SaplingsStock({
    id: sapling.stock.length,
    supplier: "",
    age: 0,
    createdAt: new Date(),
    length: 0,
    price: 0,
    quantity: 0,
    details: [""],
  });
  sapling.stock.push(Row);
  const updatedSapling = await Saplings.findByIdAndUpdate(
    sapling._id,
    sapling,
    {
      new: true,
    }
  );
  res.status(201).json(updatedSapling);
};

export const createSapling = async (req, res) => {
  let content = req.body;
  //rechercher s'il existe
  const name = new RegExp(content.name, "i");
  const sapling = await Saplings.findOne({ name });

  if (sapling) {
    content.stock = { ...content.stock, id: sapling.stock.length };

    await sapling.stock.push(content.stock);
    const updatedSapling = await Saplings.findByIdAndUpdate(
      sapling._id,
      sapling,
      {
        new: true,
      }
    );
    //res.json(updateSapling);
  } else {
    content.stock = { ...content.stock, id: 0 };
    const newSapling = new Saplings(content);
    await newSapling.save();
    res.status(201).json(newSapling);
  }
};
/*for(let i=0;i<sapling[0].stock.length;i+=1)
try {
    await newSapling.save();

    res.status(201).json(newSapling);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }*/

export const updateSapling = async (req, res) => {
  const { id: id } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  const updatedSaplings = await Saplings.findByIdAndUpdate(id, content, {
    new: true,
  });
  res.status(201).json(updateSapling);
};

export const deleteSapling = async (req, res) => {
  const { id: id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  const deleteSapling = await Saplings.findByIdAndRemove(id);

  res.json({ message: "Sapling deleted successfully" });
};
