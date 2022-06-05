import Seeds from "../models/seedModel.js";
import mongoose from "mongoose";

/*export const createSeed = async (req, res) => {
  const content = req.body;

  const newSeed = new Seeds(content);

  try {
    await newSeed.save();

    res.status(201).json(newSeed);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};*/
////////////////////////////////////////////////////////
export const getSeedsBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const name = new RegExp(searchQuery, "i"); //i means accept test Test TEST...
    const seeds = await Seeds.find({
      name,
      /*$or: [{name}, {details: {$in: details.split(',')}}] */
    });

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

export const createSeed = async (req, res) => {
  const content = req.body;

  const newSeed = new Seeds(content);
  //rechercher s'il existe
  const name = new RegExp(content.name, "i");
  const seed = await Seeds.find({ name });

  if (seed.length && seed[0].stock.supplier !== "") {
    await seed[0].stock.push(content.stock);
    await Seeds.findByIdAndUpdate(seed[0]._id, seed[0], {
      new: true,
    });
  } else {
    await newSeed.save();
    res.status(201).json(newSeed);
  }
};
/*try {
    await newSapling.save();

    res.status(201).json(newSapling);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }*/

export const updateSeed = async (req, res) => {
  const { id: id } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  await Seeds.findByIdAndUpdate(
    id,
    { ...content, id },
    {
      new: true,
    }
  );
};

export const deleteSeed = async (req, res) => {
  const { id: id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  await Seeds.findByIdAndRemove(id);

  res.json({ message: "Seed deleted successfully" });
};
