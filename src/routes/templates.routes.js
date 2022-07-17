const {
    createTemplates,
    getTemplatesById,
    updateTemplateById,
    deleteTemplateById,
    getAllTemplates
  } = require("../controllers/cv.generator.js");
  const router = require("express").Router();
  
  router.post("/", createTemplates);
  router.get("/", getAllTemplates);
  // router.get("/",download_cv);
  router.get("/:id", getTemplatesById);
  router.put('/:id',updateTemplateById);
  router.delete('/:id',deleteTemplateById);
  module.exports = router;