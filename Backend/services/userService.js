const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository.js");
const authService = require("./authService.js");

//Service for register
async function register(name, email, password, role) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.addUser({
    name,
    email,
    password: hashedPassword,
    role,
  });
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

//Service for login
async function login(email, password) {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  const token = await authService.authenticate(email, password);
  return { id: user.id, email: user.email, role: user.role, token };
}

//Export modules
module.exports = {
  register,
  login,
};
