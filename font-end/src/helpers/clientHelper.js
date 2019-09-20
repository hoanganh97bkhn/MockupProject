import moment from 'moment';

export let bufferToBase64 = (buffer) => {
  return Buffer.from(buffer).toString("base64")
}

export let covertTimestampToHumanTime = (timestamp) => {
  if(!timestamp){
    return "";
  }
  return moment(timestamp).locale("vi").startOf("seconds").fromNow();
}
