import Geo from "../models/geo.js";
import mongoose from "mongoose";

export const getGeo = async (req, res) => {
    try {
        const geo = await Geo.find();
        //saplings.map((sapling)=>sapling.stock.map((element)=>{});
        res.status(200).json(geo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addGeo = async (req, res) => {
    try {
        const geo = await Geo.create(req.body);
        
        //saplings.map((sapling)=>sapling.stock.map((element)=>{});
        res.status(200).json(geo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateGeo = async (req, res) => {
    const { id } = req.params;
    const content = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("no location with that id");
  
    const updatedGeo = await Geo.findByIdAndUpdate(
      id,
      { ...content, id },
      {
        new: true,
      }
    );
    res.json(updatedGeo);
  };

export const deleteGeo = async (req, res) => {
    const { id } = req.params;
    console.log(id)
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("no location with that id");
  
    await Geo.findByIdAndRemove(id);
  
    res.json({ message: "Employer deleted successfully" });
  };  

