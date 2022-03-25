const awilix = require("awilix");
const ItemLogic = require("../logic/itemLogic");
const TestLogic = require("../logic/testApiLogic");
const ItemRepo = require("../repository/itemRepo");
const logger = require("../utils/logger");

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

function diSetup(){
  container.register({
    itemLogic: awilix.asClass(ItemLogic),
    testLogic: awilix.asClass(TestLogic),
    itemRepo: awilix.asClass(ItemRepo),
    logger: awilix.asValue(logger),
  });
}

module.exports = { container, diSetup };