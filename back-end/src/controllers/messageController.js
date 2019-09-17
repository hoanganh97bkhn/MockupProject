import {message} from './../services/index';
import {validationResult} from "express-validator/check";
import formidable from 'formidable';
import fsExtra from 'fs-extra';

let dir = `./public/images/chat/messages`;

let addNewTexEmoji = async(req, res) => {
  //validate
  let errorArr = []
    let validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
      let erros = Object.values(validationErrors.mapped());
      erros.forEach(item => {
        errorArr.push(item.msg)
      });
    res.statusMessage = errorArr;
    return res.status(500).send(errorArr);
    }
  
  //service
  try {
    let sender = {
      id: req.user._id,
      name : req.user.nickname,
      avatar : req.user.avatar
    };
    let receiverId = req.body.uid;
    let messageVal = req.body.messageVal;
    let isGroup = req.body.isGroup;

    let newMessage = await message.addNewTexEmoji(sender, receiverId, messageVal, isGroup);

    res.status(200).send(newMessage)
  } catch (error) {
    res.statusMessage = "Server error!"
    res.status(500).send(error)
  }
}

let imageMessageUploadFile = (req)=>{
  /** Setup folder images */
  return new Promise(async(resolve, reject) => {
    await fsExtra.ensureDir(dir, err => {
      if(err){
        console.log('...')
      }
    })

    let form = new formidable.IncomingForm(); 
    form.uploadDir = `${dir}`;
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; //10mb
    form.multiples = true;
    await form.parse(req, (err, fields, files) => {
      req.file = files["file"];
      req.body.uid = fields['uid'];
      req.body.isGroup = fields['isGroup'] === 'true';
      resolve('success');
      if(err){
        reject(err)
      }
    });
  })
}

let addNewImage = async(req, res) => {
  //service
  try {
    await imageMessageUploadFile(req);
    let sender = {
      id: req.user._id,
      name : req.user.nickname,
      avatar : req.user.avatar
    };
    let receiverId = req.body.uid;
    let messageVal = req.file;
    messageVal.originalName = req.file.path.split('/')[4];
    let isGroup = req.body.isGroup;

    let newMessage = await message.addNewImage(sender, receiverId, messageVal, isGroup);
    console.log('========',newMessage)
    //remove imgae
    console.log(`${dir}/${messageVal.originalName}`)
    await fsExtra.remove(`${dir}/${messageVal.originalName}`);
    res.status(200).send(newMessage)
  } catch (error) {
    res.statusMessage = "Server error!"
    res.status(500).send(error)
  }
}

let addNewFile = async(req, res) => {
  //service
  try {
    await imageMessageUploadFile(req);
    let sender = {
      id: req.user._id,
      name : req.user.nickname,
      avatar : req.user.avatar
    };
    let receiverId = req.body.uid;
    let messageVal = req.file;
    messageVal.originalName = req.file.path.split('/')[4];
    let isGroup = req.body.isGroup;

    let newMessage = await message.addNewFile(sender, receiverId, messageVal, isGroup);
    console.log('========',newMessage)
    //remove imgae
    console.log(`${dir}/${messageVal.originalName}`)
    await fsExtra.remove(`${dir}/${messageVal.originalName}`);
    res.status(200).send(newMessage)
  } catch (error) {
    res.statusMessage = "Server error!"
    res.status(500).send(error)
  }
}

let readMoreAllChat = async(req, res) =>{
  try {
    let skipUser = +(req.query.skipUser);
    let skipGroup = +(req.query.skipGroup);

    let newAllConversation = await message.readMoreAllChat(req.user._id, skipUser, skipGroup);
    res.status(200).send(newAllConversation)
  } catch (error){
    res.status(500).send(error)
  }
}

let readMoreUserChat = async(req, res) =>{
  try {
    let skipUser = +(req.query.skipUser);

    let newAllConversation = await message.readMoreUserChat(req.user._id, skipUser);
    res.status(200).send(newAllConversation)
  } catch (error){
    res.status(500).send(error)
  }
}

let readMoreGroupChat = async(req, res) =>{
  try {
    let skipGroup = +(req.query.skipGroup);

    let newAllConversation = await message.readMoreGroupChat(req.user._id, skipGroup);

    res.status(200).send(newAllConversation)
  } catch (error){
    res.status(500).send(error)
  }
}

let readMoreMessage = async(req, res)=>{
  try {
    let skipMessage = +(req.query.skipMessage);
    let targetId = req.query.targetId;
    let chatInGroup = req.query.chatInGroup === "true" ? true : false;

    let newAllConversation = await message.readMoreMessage(req.user._id, skipMessage, targetId, chatInGroup);

    res.status(200).send(newAllConversation)
  } catch (error){
    res.status(500).send(error)
  }
}

module.exports = {
  addNewTexEmoji,
  addNewImage,
  addNewFile,
  readMoreAllChat,
  readMoreUserChat,
  readMoreGroupChat,
  readMoreMessage
}
