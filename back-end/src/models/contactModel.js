import mongoose from 'mongoose';
import { user } from '../services';

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
  userId: String,
  contactId: String,
  status: {type: Boolean, default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null}
});

ContactSchema.statics = {
  createNew(item){
    return this.create(item);
  },
  
  findAllByUser(userId){
    return this.find({
      $or: [
        {"userId" : userId},
        {"contactId" : userId}
      ]
    }).exec()
  },

  checkExists(userId, contactId) {
    return this.findOne({
      $or: [
        {$and: [
          {"userId" : userId},
          {"contactId" : contactId}
        ]},
        {$and: [
          {"userId" : contactId},
          {"contactId": userId}
        ]}
      ]
    }).exec();
  },
  removeRequestContactSent(userId, contactId) {
    return this.remove({
      $and: [
        {"userId" : userId},
        {"contactId" : contactId},
        {'status' : false}
      ]
    }).exec()
  },

  removeRequestContactReceived(userId, contactId) {
    return this.remove({
      $and: [
        {"userId" : contactId},
        {"contactId" : userId},
        {'status' : false}
      ]
    }).exec()
  },

  removeContact(userId ,contactId) {
    return this.remove({
      $or: [
        {$and : [
          {"userId" : contactId},
          {"contactId" : userId},
          {'status' : true}
        ]},
        {$and : [
          {"userId" : userId},
          {"contactId" : contactId},
          {'status' : true}
        ]},
      ]
    }).exec();
  },

  confirmRequestContactReceived(userId, contactId) {
    return this.findOneAndUpdate({
      $and: [
        {"userId" : contactId},
        {"contactId" : userId},
        {'status' : false}
      ]
    },{'status' : true}).exec();
  },


  /**
   * get friends by userId
   * @param {String} userId 
   * @param {Number} limit 
   */
  getContacts(userId, limit) {
    return this.find({
      $and: [
        {$or:[
          {"userId" : userId},
          {"contactId" : userId},
        ]},
        {'status' : true}
      ]
    }).sort({"createdAt": -1}).limit(limit).exec();
  },

  /**
   * get contacts watting request
   * @param {*} userId 
   * @param {*} limit 
   */
  getContactsSent(userId, limit) {
    return this.find({
      $and: [
        {'userId' : userId},
        {'status' : false}
      ]
    }).sort({"createdAt": -1}).limit(limit).exec();
  },

  /**
   * get list contacts onfirm friend
   * @param {*} userId 
   * @param {*} limit 
   */
  getContactsReceived(userId, limit) {
    return this.find({
      $and: [
        {"contactId" : userId},
        {"status" : false}
      ]
    }).sort({"createdAt": -1}).limit(limit).exec()
  },

/**
 * get count
 * @param {*} userId 
 */
  countAllContacts(userId) {
    return this.count({
      $and: [
        {$or:[
          {"userId" : userId},
          {"contactId" : userId},
        ]},
        {'status' : true}
      ]
    }).exec();
  },

  /**
   * get count
   * @param {*} userId 
   */
  countAllContactsSent(userId) {
    return this.count({
      $and: [
        {"userId" : userId},
        {"status" : false}
      ]
    }).exec()
  },

  /**
   * get count
   * @param {*} userId 
   */
  countAllContactsReceived(userId) {
    return this.count({
      $and: [
        {"contactId" : userId},
        {"status" : false}
      ]
    }).exec()
  },

  /**
   * readMoreContacts
   * @param {*} userId 
   * @param {*} skip 
   * @param {*} limit 
   */
  readMoreContacts(userId, skip, limit) {
    return this.find({
      $and: [
        {$or:[
          {"userId" : userId},
          {"contactId" : userId},
        ]},
        {'status' : true}
      ]
    }).sort({"createdAt": -1}).skip(skip).limit(limit).exec();
  },

  /**
   * readMoreContacts
   * @param {*} userId 
   * @param {*} skip 
   * @param {*} limit 
   */
  readMoreContactsSent(userId, skip, limit) {
    return this.find({
      $and: [
        {'userId' : userId},
        {'status' : false}
      ]
    }).sort({"createdAt": -1}).skip(skip).limit(limit).exec();
  },

  /**
   * readMoreContacts
   * @param {*} userId 
   * @param {*} skip 
   * @param {*} limit 
   */
  readMoreContactsReceived(userId, skip, limit) {
    return this.find({
      $and: [
        {"contactId" : userId},
        {"status" : false}
      ]
    }).sort({"createdAt": -1}).skip(skip).limit(limit).exec();
  },
};

module.exports = mongoose.model("contact", ContactSchema);
