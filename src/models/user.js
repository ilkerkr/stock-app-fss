"use strict";
const { mongoose } = require("../configs/dbConnection");
//!-----------------------------------------------------------------!//

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },

    firstName: {
      type: String,
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isStaff: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const passwordEncrypt = require("../helpers/passwordEncrypt");

UserSchema.pre(["save", "updateOne"], function (next) {
  const data = this?._update ?? this;

  // Email Control:
  const isEmailValidated = data.email
    ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    : true;

  if (isEmailValidated) {
    const isPasswordValidated = data.password
      ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
          data.password
        )
      : true;

    if (isPasswordValidated) {
      if (this?._update) {
        // UPDATE:
        this._update.password = passwordEncrypt(data.password);
      } else {
        // CREATE:
        this.password = passwordEncrypt(data.password);
      }

      next();
    } else {
      next(new Error("Password is not validated."));
    }
  } else {
    next(new Error("Email is not validated."));
  }
});

//!-----------------------------------------------------------------!//

module.exports = mongoose.model("User", UserSchema);
