const carRepository = require("../repositories/carRepository.js");

//Service for create car
async function addProduct(car_name, price, size) {
  const car = await carRepository.addCar({
    car_name,
    price,
    size,
  });
  return {
    id: car.id,
    car_name: car.car_name,
    price: car.price,
    size: car.size,
  };
}

//Service for delete car
async function deleteProduct(car_name) {
  const car = await carRepository.deleteCar(car_name);
}

//Servoce for show cars
async function getProduct() {
  const car = await carRepository.getCar();
  return car;
}

//Service for update car
async function updateProduct(data, name) {
  const { car_name, price, size } = data;
  const car = await carRepository.updateCar(
    {
      car_name,
      price,
      size,
    },
    name
  );
  return car;
}

//Export modules.
module.exports = {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
};
