const { container } = require("../dependency-injection-setup/di-setup");
let router = require("express").Router();

const itemLogic = container.resolve("itemLogic");
const testLogic = container.resolve("testLogic");

router.get("/test", testLogic.test);

router.get("/item", itemLogic.getAllItems);

router.get("/item/:id", itemLogic.getItemById);

router.delete("/item/:id", itemLogic.deleteItemById)

router.post("/item", itemLogic.addItem);

module.exports = router;
