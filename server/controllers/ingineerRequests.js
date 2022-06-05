import Requests from "../models/request.js";
import IngineerRequests from "../models/ingineerRequest.js";
import mongoose from "mongoose";

export const getIngineerRequestsBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const name = new RegExp(searchQuery, "i"); //i means accept test Test TEST...
    const requests = await IngineerRequests.find({
      name,
      /*$or: [{name}, {details: {$in: details.split(',')}}] */
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getIngineerRequests = async (req, res) => {
  try {
    const requests = await IngineerRequests.find();

    res.status(200).json(requests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getIngineerRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await IngineerRequests.findById(id);

    res.status(200).json(request);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createIngineerRequest = async (req, res) => {
  let content = req.body;
  const newRequest = new IngineerRequests({...content,requestedAt:new Date()});
  await newRequest.save();
  res.status(201).json(newRequest);
}

export const updateIngineerRequest = async (req, res) => {
  const { id: id } = req.params;
  const content = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no seed with that id");

  const updatedRequest = await IngineerRequests.findByIdAndUpdate(
    id,
    { ...content,updated:true, id },
    {
      new: true,
    }
  );
  res.status(201).json(updatedRequest);
};

export const confirmReceipt = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no request with that id");
  var request = await IngineerRequests.findById(id);

  request= Object.assign(request,{receivedAt:new Date()})
  const updatedRequest = await IngineerRequests.findByIdAndUpdate(
    id,
    {...request, id},
    {
      new: true,
    }
  );
  console.log(updatedRequest)
  res.json(updatedRequest);
};

export const deleteIngineerRequest = async (req, res) => {
  const { id: id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  await IngineerRequests.findByIdAndRemove(id);

  res.json({ message: "Request deleted successfully" });
};
