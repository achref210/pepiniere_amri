import Saplings from "../models/saplingModel.js";
import SaplingsStock from "../models/saplingStockModel.js";
import SaplingsFertilization from "../models/saplingFertilizationModel.js";
import Products from "../models/productModel.js";
import mongoose from "mongoose";
import SaplingArticle from "../models/saplingArticle.js";

export const getSaplingsBySearch = async (req, res) => {
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

  const updatedSapling = await Saplings.findByIdAndUpdate(id1, sapling, {
    new: true,
  });

  res.status(201).json(updatedSapling);
};

export const updateCol = async (req, res) => {
  const { id1, id2 } = req.params;
  const content = req.body;

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

  var obj = Object.assign(newRow, line);

  sapling.stock = await sapling.stock.filter((row) => row.id !== newRow.id);
  sapling.stock.push(obj);

  const updatedSapling = await Saplings.findByIdAndUpdate(id1, sapling, {
    new: true,
  });
  res.status(201).json(updatedSapling);
};

export const updateFertilizationCol = async (req, res) => {
  const { id1, id2, id3 } = req.params;
  const content = req.body;
  console.log(content)

  if (!mongoose.Types.ObjectId.isValid(id1))
    return res.status(404).send("no post with that id");

  const sapling = await Saplings.findById(id1);
  let saplingRow = {};
  sapling.stock.forEach((obj) => {
    if (obj.id == id2) {
      saplingRow = obj;
    }
  });
  if (saplingRow === {}) return res.status(404).send("no sapling row with that id");


  let fertilizationRow = {};
  saplingRow.fertilizationPlan.forEach((obj) => {
    if (obj.id == id3) {
      fertilizationRow = obj;
    }
  });
  if (fertilizationRow === {}) return res.status(404).send("no fertilization row with that id");

  let line = JSON.parse(
    "{" + '"' + content.key + '":"' + content.value + '"' + "}"
  );

  var newObj = Object.assign(fertilizationRow, line);
  console.log(line, "+", fertilizationRow, "=", newObj)

  saplingRow.fertilizationPlan = saplingRow.fertilizationPlan.filter((row) => row.id !== id3);
  console.log(saplingRow.fertilizationPlan);
  //  saplingRow.fertilizationPlan.push(newObj)

  console.log(saplingRow.fertilizationPlan);

  const updatedSapling = await Saplings.findByIdAndUpdate(id1, sapling, {
    new: true,
  });

  res.status(201).json(updatedSapling);
};

export const addFertilizationRow = async (req, res) => {
  const { id1, id2 } = req.params;
  const sapling = await Saplings.findById(id1);
  let stock = null;
  const stockIndex = sapling.stock.findIndex((obj) => obj.id == id2)
  sapling.stock.forEach((obj) => {
    if (obj.id == id2) {
      stock = obj;
    }
  });

  const Row = new SaplingsFertilization({
    id: stock.fertilizationPlan.length,
    product: "",
    supplier: "",
    voieApplication: "",
    dosesParApplication: 0,
    nombreApplication: 0,
    periodeApplication: 0,
  });
  stock.fertilizationPlan.push(Row);

  const updatedSapling = await Saplings.findByIdAndUpdate(
    sapling._id,
    sapling,
    {
      new: true,
    }
  );
  console.log(updatedSapling.stock[0])
  res.status(201).json(updatedSapling);
};

export const deleteFertilizationRow = async (req, res) => {
  const { id1, id2, id3 } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id1))
    return res.status(404).send("no sapling with that id");

  const sapling = await Saplings.findById(id1);
  let saplingRow = {};
  sapling.stock.forEach((obj) => {
    if (obj.id == id2) {
      saplingRow = obj;
    }
  });
  if (saplingRow === {}) return res.status(404).send("no sapling row with that id");


  let fertilizationRow = {};
  saplingRow.fertilizationPlan.forEach((obj) => {
    if (obj.id == id3) {
      fertilizationRow = obj;
    }
  });
  if (fertilizationRow === {}) return res.status(404).send("no fertilization row with that id");

  saplingRow.fertilizationPlan = saplingRow.fertilizationPlan.filter((row) => row.id !== id3);

  const updatedSapling = await Saplings.findByIdAndUpdate(id1, sapling, {
    new: true,
  });

  res.status(201).json(updatedSapling);
};

export const createRow = async (req, res) => {
  const { id } = req.params;
  const sapling = await Saplings.findById(id);

  let rowId = 0
  let exist = true
  while(exist)
  {
    rowId++
    exist=false
    sapling.stock.forEach((item)=>
      {if(item.id===rowId) exist=true}
    )
  }

  const Row = new SaplingsStock({
    id: rowId,
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
  
  const name = new RegExp(content.name, "i");
  const sapling = await Saplings.findOne({ name });
  if (sapling) {
    content.stock = { ...content.stock[0], id: sapling.stock.length, };
    await sapling.stock.push(content.stock);
    const updatedSapling = await Saplings.findByIdAndUpdate(
      sapling._id,
      sapling,
      {
        new: true,
      }
    );
  } else {
    
    content.stock = { ...content.stock[0], id: 0 };
    const newSapling = new Saplings(content);

    await newSapling.save();
    res.status(201).json(newSapling);
  }
};

export const updateSapling = async (req, res) => {
  const { id: id } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  const sapling = await Saplings.findById(id)

  const updatedSaplings = await Saplings.findByIdAndUpdate(id, {...content,stock:sapling.stock}, {
    new: true,
  });
  res.status(201).json(updatedSaplings);
};

export const deleteSapling = async (req, res) => {
  const { id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");
  await Saplings.findByIdAndRemove(id);

  res.json({ message: "Sapling deleted successfully" });
};


export const createDefaultFertilizationProduct = async (req, res) => {
  try {
    const defaultFertilizationProduct = new SaplingsFertilization({prd:0,quantity:0})
    await defaultFertilizationProduct.save()

    res.status(200).json(defaultFertilizationProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDefaultFertilizationPlan = async (req, res) => {
  try {
    const defaultFertilizationProduct = await SaplingsFertilization.find();
    res.status(200).json(defaultFertilizationProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const updateDefaultFertilizationPlan = async (req, res) => {
  const { id } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no Fertilization Plan with that id");

    let line = JSON.parse(
      "{" + '"' + content.key + '":"' + content.value + '"' + "}"
    );

    const defaultFertilizationProduct = await SaplingsFertilization.findById(id)
    var object = Object.assign(defaultFertilizationProduct, line);
    const updatedDefaultFertilizationPlan = await SaplingsFertilization.findByIdAndUpdate(id, object, {
    new: true,
  });
  console.log(updatedDefaultFertilizationPlan)
  res.status(201).json(updatedDefaultFertilizationPlan);
};


export const deleteDefaultFertilizationPlan = async (req, res) => {
  const { id } = req.params;

  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no Fertilization Plan with that id");

  await SaplingsFertilization.findByIdAndRemove(id);
  res.status(201).json("deleted succefuly");
};

export const setDefaultFertilizationPlan = async (req, res) => {
  const { id1, id2 } = req.params;
  const sapling = await Saplings.findById(id1);
  let stock = null;
  const stockIndex = sapling.stock.findIndex((obj) => obj.id == id2)
  sapling.stock.forEach((obj) => {
    if (obj.id == id2) {
      stock = obj;
    }
  });
  const defaultFertilizationProduct = await SaplingsFertilization.find();

  stock.fertilizationPlan=[]
  for(let index in defaultFertilizationProduct)
    stock.fertilizationPlan.push((Object.assign(defaultFertilizationProduct[index],{id:index})));

  const updatedSapling = await Saplings.findByIdAndUpdate(
    sapling._id,
    sapling,
    {
      new: true,
    }
  );
  res.status(201).json(updatedSapling);
};