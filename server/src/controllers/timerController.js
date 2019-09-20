import {timer} from './../services/index';

let resetCountNotifGeneral = async(req, res) => {
  try {
    await timer.resetCountNotifGeneral(req.user._id);
    res.status(200).send("success");
  } catch (error) {
    res.status(500).send(error)
  }
}

let resetCountNotifContact = async(req,res) => {
  try {
    await timer.resetCountNotifContact(req.user._id);
    res.status(200).send("success");
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  resetCountNotifGeneral,
  resetCountNotifContact
};
