
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const mockInterviewSchema = new mongoose.Schema({
  jsonMockResp: { type: String, required: true },
  jobPosition: { type: String, required: true },
  jobDesc: { type: String, required: true },
  jobExperience: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: String, default: () => new Date().toISOString() },
  mockId: { type: String, required: true }
}, { timestamps: true });

const MockInterview = mongoose.model("MockInterview", mockInterviewSchema);

const userAnswerSchema = new mongoose.Schema({
  mockId: { type: String, required: true },
  question: { type: String, required: true },
  correctAns: String,
  userAns: String,
  feedback: String,
  rating: String,
  userEmail: String,
  createdAt: { type: String, default: () => new Date().toISOString() }
});

const UserAnswer = mongoose.model("UserAnswer", userAnswerSchema);

const userSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  userPass: { type: String, required: true },
  refreshToken: { type: String }

}, { timestamps: true })

userSchema.pre("save", async function (next) {

  if (!this.isModified("userPass")) {
    return next();
  }

  try {
    this.userPass = await bcrypt.hash(this.userPass, 10);
    next();

  } catch (err) {
    next(err);

  }
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.userPass);
}

userSchema.methods.generateToken = function () {
  const accessToken = jwt.sign(
    { _id: this._id, email: this.userEmail },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { _id: this._id, email: this.userEmail },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )
  return { accessToken, refreshToken }
}

const Users = mongoose.model("Users", userSchema);

module.exports = {
  MockInterview,
  UserAnswer,
  Users,
};