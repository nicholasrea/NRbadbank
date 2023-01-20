const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const uri = `badbank-db:27017/test`;

// Connect to MongoDB using the MONGODB_URI from the .env file
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  }
});

const User = mongoose.model('User', UserSchema);

const getUserByUsername = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (email, password) => {
  const user = new User({ email, password });
  return await user.save();
};

const updateUser = async (user, bal) => {
  const filter = { email: user.email }
  const update = { balance: bal}
  return await User.findOneAndUpdate(filter, update, {
    new: true,
    upsert: false
  });
}


module.exports = {
  getUserByUsername,
  createUser,
  updateUser
};
