import Requests from "../models/request.js";
import IngineerRequests from "../models/ingineerRequest.js";
import mongoose from "mongoose";

export const getRequestsBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const name = new RegExp(searchQuery, "i"); //i means accept test Test TEST...
    const requests = await Requests.find({
      name,
      /*$or: [{name}, {details: {$in: details.split(',')}}] */
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRequests = async (req, res) => {
  try {
    const requests = await Requests.find();

    res.status(200).json(requests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserRequests = async (req, res) => {
  try {
    console.log(req.userId)
    const request = await Requests.find({creatorId:req.userId});
    console.log(request)
    res.status(200).json(request);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRequest = async (req, res) => {
  let content = req.body;
  
  content = { ...content, createdAt: new Date() };
  let newRequest
  if(req.userId)
    newRequest = new Requests({
    ...content,
    creatorId: req.userId,
    createdAt: new Date().toISOString(),
  }) 
  else
   newRequest = new Requests(content);

  await newRequest.save();
  res.status(201).json(newRequest);
}

export const updateRequest = async (req, res) => {
  const { id } = req.params;
  const content = req.body;

  console.log(id,content)
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no request with that id");

    let line = JSON.parse(
      "{" + '"' + content.key + '":"' + content.value + '"' + "}"
    );

    const ref = await Requests.findById(id)
    var object 
    if(ref&&line)
      object = Object.assign(ref, line);
    const updatedRequest = await Requests.findByIdAndUpdate(id, {...object,status:"changed"}, {
    new: true,
  });
  res.status(201).json(updatedRequest);
};

export const deleteRequest = async (req, res) => {
  const { id: id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  await Requests.findByIdAndRemove(id);

  res.json({ message: "Request deleted successfully" });
};

export const accepteRequest = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no request with that id");
  var request = await Requests.findById(id);

  request= Object.assign(request,{status:"accepted"})
  const updatedRequest = await Requests.findByIdAndUpdate(
    id,
    {...request, id},
    {
      new: true,
    }
  );
  res.json(updatedRequest);
};

export const refuseRequest = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no request with that id");
  var request = await Requests.findById(id);

  request= Object.assign(request,{status:"refused"})
  const updatedRequest = await Requests.findByIdAndUpdate(
    id,
    {...request, id},
    {
      new: true,
    }
  );
  res.json(updatedRequest);
};
