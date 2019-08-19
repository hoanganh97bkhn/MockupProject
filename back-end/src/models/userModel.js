import mongoose, { model } from 'mongoose';
import bcrypt from 'bcrypt';

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  nickname: String,
  gender: {type: String, default: "male"},
  phone: {type: String, default: null},
  address: {type: String, default: null},
  avatar: {type: String, default: "avatar-default.jpg"},
  role: {type: String, default: "user"},
  local: {
    email: {type: String, trim: true},
    password: String,
    isActive: {type: Boolean, default: false},
    verifyToken: String
  },
  facebook: {
    uid: String,
    token: String,
    email: {type: String, trim: true},
  },
  google: {
    uid: String,
    token: String,
    email: {type: String, trim: true},
  },
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null}
});

UserSchema.statics = {
  createNew(item){
    return this.create(item);
  },
  findUserById (id){
    return this.findById(id,{_id:1,'local.email':1, nickname:1, avatar: 1, address:1, phone:1, gender: 1}).exec()
  },
  findByEmail(email){
    return this.findOne({"local.email": email}).exec();
  },
  removeById (id) {
    return this.findByIdAndRemove(id).exec();
  },
  findByToken (token){
    return this.findOne({"local.verifyToken" : token}).exec()
  },
  verify(token){
    return this.findOneAndUpdate(
      {"local.verifyToken" : token},
      {"local.isActive" : true, "local.verifyToken" : null}
    ).exec()
  },
  findByFacebookUid(uid){
    return this.findOne({"facebook.uid" : uid}).exec();
  }
}

UserSchema.methods = {
  comparePassword(password){
    return bcrypt.compare(password, this.local.password)
  }
}

module.exports = mongoose.model("user", UserSchema);