import Saplings from "../models/saplingModel.js";
import Seeds from "../models/seedModel.js";

export const getcart = async (req, res) => {
    try {
      const type = new RegExp("fruits", "i")
      const seeds = await Seeds.find({type});
      const saplings = await Saplings.find({type});
      //saplings.map((sapling)=>sapling.stock.map((element)=>{});
      res.status(200).json(saplings, seeds);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };