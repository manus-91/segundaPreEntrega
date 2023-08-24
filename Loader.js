import cartsModel from "./src/dao/models/carts.model.js";
import carts from "./src/data/carts.js";

const Loader = async () => {
try {
    await cartsModel.insertMany(carts);
} catch (error) {
    console.log(error);
}
};

export default Loader;
