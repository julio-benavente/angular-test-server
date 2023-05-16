const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const createJWT = require("../utils/createJWT");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function ({ email, password }) {
  const user = await this.findOne({ email }, "email password");

  if (!user) {
    throw Error("Invalid email");
  }

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    throw Error("Invalid password");
  }

  const {
    password: { userPassword },
    ...dataToSendFromDocument
  } = user._doc;
  return {
    token: createJWT({ email: user._doc.email }),
    ...dataToSendFromDocument,
  };
};

module.exports = User = mongoose.model("user", UserSchema);
