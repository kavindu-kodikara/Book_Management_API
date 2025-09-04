import Router from "express";
import publisherController from "../controllers/publisherController.js";
import {idValidator} from "../middlewares/validators/idValidator.js";
import publisherValidator from "../middlewares/validators/publisherValidator.js";

const router = Router();

router.get("/",publisherController.getAllPublishers);
router.get("/:id",idValidator,publisherController.getPublisherById);
router.post("/",publisherValidator.validatePublisher,publisherController.createPublisher);
router.put("/:id",publisherValidator.validateUpdatePublisher,publisherController.updatePublisher);
router.delete("/:id",idValidator,publisherController.deletePublisher);

export default router;