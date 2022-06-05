import Plans from "../models/plan.js";
import mongoose from "mongoose";

export const getPlans = async (req, res) => {
  try {
    const plans = await Plans.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPlan = async (req, res) => {
  const content = req.body;
  console.log("user id ", req);
  const newPlan = new Plans({
    ...content,
    creatorId: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPlan.save();

    res.status(201).json(newPlan);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePlan = async (req, res) => {
  const { id } = req.params;
  const content = req.body;

  const plan = await Plans.findById(id);

  if (!req.userId) return res.json({ message: "Unautheticated" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  const index = plan.creator.findIndex((id) => id === String(req.userId));
  if (index !== -1) {
    const updatePlan = awaitPlans.findByIdAndUpdate(
      id,
      { ...content, id },
      {
        new: true,
      }
    );
  }
};

export const deletePlan = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id");

  const deletePlan = await Plans.findByIdAndRemove(id);

  res.json({ message: "Employer deleted successfully" });
};

/*export const activatePlan = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no plan with that id");

  const plan = await Plans.findById(id);
  const updatedPlan = await Plans.findByIdAndUpdate(
    id,
    { disabled: false },
    {
      new: true,
    }
  );
};*/

export const votePlan = async (req, res) => {
  const { id } = req.params;

  //si l'utilisateur n'est pas connecté on informe et retourne rien
  if (!req.userId) return res.json({ message: "unauthenticated" });
  //si il n ya pas d'un plan avec l'id passé en paramétre on informe et retourne rien
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no plan with that id");
  //on cherche le plan qui posséde l'id passé en paramétre
  const plan = await Plans.findById(id);

  //on cherche l'id d'utilisateur dans les id situer dans votes[]
  const index = plan.votes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    //vote the plan
    plan.votes.push(req.userId);
  } else {
    //unvote the plan
    plan.votes = plan.votes.filter((id) => id !== String(req.userId));
  }
  
  const updatedPlan = await Plans.findByIdAndUpdate(id, plan, {
    new: true,
  });
  console.log(updatedPlan);

  res.json(updatedPlan);
};

export const disactivatePlan = async (req, res) => {
  const { id } = req.params;
  console.log(id)

  if (!req.userId) return res.json({ message: "unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no plan with that id");

  const plan = await Plans.findById(id);
  let updatedPlan = null;
  //you must delete all data if this auth middlware is new
  if (plan.creatorId === req.userId) {
    updatedPlan = await Plans.findByIdAndUpdate(
      id,
      { disabled: true },
      {
        new: true,
      }
    );
  }

  res.json(updatedPlan);
};

export const activatePlan = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no plan with that id");

  const plan = await Plans.findById(id);
  let updatedPlan = null;

  if (plan.creator === req.userId) {
    updatedPlan = await Plans.findByIdAndUpdate(
      id,
      { disabled: false },
      {
        new: true,
      }
    );
  }

  res.json(updatedPlan);
};
