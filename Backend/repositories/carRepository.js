const { Car } = require("../models");

//Create item
async function addCar(car) {
  return await Car.create(car);
}

//Delete item
async function deleteCar(car_name) {
  return await Car.destroy({ where: { car_name } });
}

//Show one item
async function getCarByName(name) {
  return await Car.findOne({ where: { name } });
}

//Show items
async function getCar() {
  return await Car.findAll();
}

//Update item
async function updateCar(data, car_name){
  return await Car.update(data,{where: { car_name } });
}

module.exports = {
  addCar,
  getCarByName,
  deleteCar,
  getCar,
  updateCar,
};

