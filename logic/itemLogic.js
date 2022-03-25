class ItemLogic{
  constructor({itemRepo, logger}){
    this.itemRepo = itemRepo;
    this.logger = logger;
    // do this or use arrow function bcz this refers to context from where these functions are called
    this.getAllItems = this.getAllItems.bind(this);
    this.getItemById = this.getItemById.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItemById = this.deleteItemById.bind(this);
  }

  async getAllItems(request, response) {
    this.logger.info("Get all items api is being accessed");
    try {
      let items = await this.itemRepo.getAllItems();
      if (items.length == 0) {
        response.status(200).send({
          message: "Items not available",
          items: [],
        });
        return;
      }
      response.status(200).send({
        message: `Total items: ${items.length}`,
        items: items,
      });
      return;
    } catch (error) {
      this.logger.error("Problem in fetching all items");
      response.status(400).send("Unknown error occured");
    }
  }

  async getItemById(request, response) {
    this.logger.info("Get item by id api is being accessed");
    try {
      let item = await this.itemRepo.getItemById(request.params.id);
      response.status(200).send(item);
      return;
    } catch (error) {
      this.logger.error("Item not found with id: " + request.params.id);
      response.status(404).send(error);
      return;
    }
  }

  async addItem(request, response) {
    this.logger.info("Add item api is being accessed");
    try {
      let addedItemObject = await this.itemRepo.addItem(request.body);
      response.status(201).send(addedItemObject);
      return;
    } catch (error) {
      this.logger.error("Error while adding item- " + error.message);
      response.status(400).send(error);
      return;
    }
  }

  async deleteItemById(request, response) {
    this.logger.info("Delete by id api is being accessed");
    try {
      let deletedItemObject = await this.itemRepo.deleteItemById(request.params.id);
      response.status(200).send(deletedItemObject);
      return;
    } catch (error) {
      this.logger.error("Item not found with id: " + request.params.id);
      response.status(404).send(error);
      return;
    }
  }
};

module.exports = ItemLogic;
