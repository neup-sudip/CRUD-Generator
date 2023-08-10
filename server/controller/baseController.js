const BaseModel = require("../models/BaseModel");
const controllerCreator = require("../utils/controllerCreate");
const modelCreator = require("../utils/modelCreate");
const routeCreator = require("../utils/routeCreate");

const baseController = {
  create: async (req, res) => {
    const model = await BaseModel.findOne({ ModelName: req.body.ModelName })
      .then((doc) => doc)
      .catch(() => {
        return res.json({
          result: false,
          message: "Error creating Model",
          data: "",
        });
      });

    if (model) {
      return res.json({
        result: false,
        message: "Model already exist",
        data: "",
      });
    }

    const newModel = await BaseModel.create({
      ...req.body,
    })
      .then((doc) => doc._id)
      .catch((er) => null);

    if (!newModel) {
      return res.json({
        result: false,
        message: "Error creating Model",
        data: "",
      });
    }

    modelCreator(req.body);
    controllerCreator(req.body.ModelName);
    routeCreator(req.body.ModelName);

    return res.json({
      result: true,
      message: "Model Created Successfully",
      data: newModel,
    });
  },

  getAll: async (req, res) => {
    const models = await BaseModel.find({})
      .then((docs) => docs)
      .catch((err) => null);

    if (!models) {
      return res.json({
        result: false,
        message: "Error fetching Models",
        data: "",
      });
    }

    return res.json({
      result: true,
      message: "Models fetched Successfully",
      data: models,
    });
  },

  getOne: async (req, res) => {
    const { id } = req.params;
    const model = await BaseModel.findOne({ _id: id })
      .then((doc) => doc)
      .catch((err) => null);

    if (!model) {
      return res.json({
        result: false,
        message: "Error fetching model",
        data: "",
      });
    }

    return res.json({
      result: true,
      message: "Model fetched Successfully",
      data: model,
    });
  },
  update: async (req, res) => {},
  delete: async (req, res) => {},
};

module.exports = baseController;
