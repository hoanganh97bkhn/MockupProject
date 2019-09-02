import {message} from './../services/index';
import {validationResult} from "express-validator/check";

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

    res.status(200).send('success')
  } catch (error) {
    res.statusMessage = "Server error!"
    res.status(500).send(error)
  }
}

module.exports = {
  addNewTexEmoji,
  
}
