let items = [
    {
        id: 1,
        name: "item1",
    },
    {
        id: 2,
        name: "item2",
    },
    {
        id: 3,
        name: "item3",
    },
    {
        id: 4,
        name: "item4",
    },
];

class ItemRepo {
    constructor({ logger }){
        this.logger = logger;
    }

    getAllItems(){
        return new Promise((res,rej)=>{ 
            res(items);
        });
    }

    getItemById(id){
        return new Promise((resolve, reject) => {
            let item  = items.find(i => i.id == id);
            if(item == null){
                reject(`Item not found with id : ${id}`);
                return;
            }
            resolve(item);
            return;
        });
    }

    addItem(itemBody){
        return new Promise((resolve, reject) => {
            let newItem = {};
            if(itemBody.id){
                this.logger.warn("No need to send id while adding item");
            }
            if(items.length > 0){
                newItem["id"] = items[items.length - 1].id + 1;
            } else {
                newItem["id"] = 1;
            }
            if(itemBody.hasOwnProperty("name")){
                newItem["name"] = itemBody.name;
            } else {
                reject({message: "item body does not contain \"name\" property"});
                return;
            }
            items.push(newItem);
            resolve({message: "item added successfully", addedItem: newItem});
            return;
        });
    }

    deleteItemById(id){
        return new Promise((resolve, reject) => {
            let itemIndex = items.findIndex(item => item.id == id);
            if(itemIndex === -1){
                reject({message: `Item not found wiht id: ${id}`, deletedItem: null});
                return;
            }
            let item  = items[itemIndex];
            items.splice(itemIndex, 1);
            resolve({
                message: `Item deleted successfully with id ${id}`,
                deletedItem: item,
            });
            return;
        });
    }
}

module.exports = ItemRepo;