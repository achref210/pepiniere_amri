import Seeds from "../models/seedModel.js";
import Refs from "../models/ref.js";
import SeedsStock from "../models/seedsStockModel.js";
import mongoose from "mongoose";

export const getSeedsBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const name = new RegExp(searchQuery, "i"); //i means accept test Test TEST...
    const seeds = await Seeds.find({
      name,
      /*$or: [{name}, {details: {$in: details.split(',')}}] */
    });

    console.log(seeds)
    res.status(200).json(seeds);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSeeds = async (req, res) => {
  try {
    const seeds = await Seeds.find();

    res.status(200).json(seeds);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSeed = async (req, res) => {
  const { id } = req.params;
  try {
    const seed = await Seeds.findById(id);

    res.status(200).json(seed);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRow = async (req, res) => {
  const { id } = req.params;
  const seed = await Seeds.findById(id);

  let rowId = 0
  let exist = true
  while(exist)
  {
    rowId++
    exist=false
    seed.stock.forEach((item)=>
      {if(item.id===rowId) exist=true}
    )
  }

  const Row = new SeedsStock({
    id: rowId,
    supplier: "",
    age: 0,
    createdAt: new Date(),
    length: 0,
    price: 0,
    weight: 0,
    details: [""],
  });
  seed.stock.push(Row);
  const updatedSeed = await Seeds.findByIdAndUpdate(
    seed._id,
    seed,
    {
      new: true,
    }
  );
  res.status(201).json(updatedSeed);
};

export const deleteRow = async (req, res) => {
  const { id1, id2 } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id1))
    return res.status(404).send("no post with that id");

  const seed = await Seeds.findById(id1);
  let deletedRow = {};
  seed.stock.forEach((obj) => {
    if (obj.id == id2) {
      deletedRow = obj;
    }
  });

  seed.stock = await seed.stock.filter((row) => row.id !== deletedRow.id);

  const updatedSeed = await Seeds.findByIdAndUpdate(id1, seed, {
    new: true,
  });

  res.status(201).json(updatedSeed);
};

export const updateCol = async (req, res) => {
  const { id1, id2 } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id1))
    return res.status(404).send("no post with that id");

  const seed = await Seeds.findById(id1);
  let newRow = {};
  seed.stock.forEach((obj) => {
    if (obj.id == id2) {
      newRow = obj;
    }
  });

  let line = JSON.parse(
    "{" + '"' + content.key + '":"' + content.value + '"' + "}"
  );

  console.log(newRow);
  var obj = Object.assign(newRow, line);

  seed.stock = await seed.stock.filter((row) => row.id !== newRow.id);
  seed.stock.push(obj);

  const updatedSeed = await Seeds.findByIdAndUpdate(id1, seed, {
    new: true,
  });
  res.status(201).json(updatedSeed);
};
/*
  let content = req.body;
  
  const name = new RegExp(content.name, "i");
  const seed = await Seeds.findOne({ name });
  if (seed) {
    content.stock = { ...content.stock[0], id: seed.stock.length, };
    await seed.stock.push(content.stock);
    const updatedSeed = await Seeds.findByIdAndUpdate(
      seed._id,
      seed,
      {
        new: true,
      }
    );
  } else {
*/
export const createSeed = async (req, res) => {
  let content = req.body;

    content.stock = { ...content?.stock[0], id: 0 };
    const newSeed = new Seeds(content);

    await newSeed.save();
    res.status(201).json(newSeed);
};

export const updateSeed = async (req, res) => {
  const { id } = req.params;
  const content = req.body;
  console.log(content)

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no seed with that id");

  const updatedSeed = await Seeds.findByIdAndUpdate(
    id,
    content,
    {
      new: true,
    }
  );
  console.log(updatedSeed)
  res.status(201).json(updatedSeed);
};

export const deleteSeed = async (req, res) => {
  const { id: id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  await Seeds.findByIdAndRemove(id);

  res.json({ message: "Seed deleted successfully" });
};

export const createRef = async (req, res) => {
  try {
    const newRef = new Refs({name:"",quantity:0,weight:0})
    await newRef.save()

    res.status(200).json(newRef);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRefs = async (req, res) => {
  try {
    const refs = await Refs.find();
    res.status(200).json(refs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const updateRef = async (req, res) => {
  const { id } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no ref with that id");

    let line = JSON.parse(
      "{" + '"' + content.key + '":"' + content.value + '"' + "}"
    );

    const ref = await Refs.findById(id)
    var object 
    if(ref&&line)
      object = Object.assign(ref, line);
    const updatedRef = await Refs.findByIdAndUpdate(id, object, {
    new: true,
  });
  res.status(201).json(updatedRef);
};

export const deleteRef = async (req, res) => {
  const { id } = req.params;

  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no ref with that id");

  await Refs.findByIdAndRemove(id);
  res.status(201).json("deleted succefuly");
};

export const getRefBySearch = async (req,res) => {
  const { searchQuery } = req.query;
  try {
    const name = new RegExp(searchQuery, "i"); //i means accept test Test TEST...
    const refs = await Refs.findOne({
      name,
      });
    res.status(200).json(refs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
