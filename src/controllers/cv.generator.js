const Template = require("../models/template.js");
const uuid = require("uuid");
const User = require("../models/user.js");

const createTemplates = async (req, res) => {
  const { body } = req;
  const template = await Template.create({ ...body, user: req.user });
  res.status(200).send(template);
};

const getAllTemplates = async (req, res) => {
  const template = await Template.find({ user: req.user });
  if (!template) {
    return res.status(400).send({ message: " not found" });
  }
  return res.status(200).send(template);
};

const getTemplatesById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const template = await Template.findOne({ _id: id, user: req.user });
    return res.status(200).send(template);
  } catch (err) {
    if(err?.name === "CastError")
      return res.status(404).send({ message: "not found" });
     console.error(err);
    return res.status(500).send(err);
  }
};

const updateTemplateById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const template = await Template.findOne({ _id: id, user: req.user });
  if (!template) {
    return res
      .status(404)
      .send({ statusCode: 404, message: " templates not found" });
  }
  template.set(body);
  await template.save();
  res.status(200).send(template);
};

const deleteTemplateById = async (req, res) => {
  const { id } = req.params;

  const template = await Template.findOne({ _id: id ,user: req.user} );
  if (!template) {
    return res
      .status(400)
      .send({ statusCode: 400, message: "template doesn't exist" });
  }
  template.delete();
  res.status(204).send({ message: "Template  successfully deleted" });
};

module.exports = {
  createTemplates,
  getTemplatesById,
  updateTemplateById,
  deleteTemplateById,
  getAllTemplates,
};