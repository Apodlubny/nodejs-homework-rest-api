const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const { requestError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });

  const passCompare = await bcrypt.compare(password, candidate.password);

  if (!candidate || !passCompare) {
    throw requestError(401, 'Email or password is wrong');
  }

  const payload = { id: candidate._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  await User.findByIdAndUpdate(candidate._id, { token });

  res.json({ status: 'success', code: 200, data: { token } });
};

module.exports = login;