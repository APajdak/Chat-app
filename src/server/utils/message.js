getTime = function () {
  let msgTime = new Date()
  let hours = (msgTime.getHours() < 10 ? '0' : '') + msgTime.getHours();;
  let minutes = (msgTime.getMinutes() < 10 ? '0' : '') + msgTime.getMinutes();
  let seconds = (msgTime.getSeconds() < 10 ? '0' : '') + msgTime.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
}

let generateMessage = (from, msg, color) => {
  return {
    from,
    msg,
    color,
    sendedAt: getTime()
  }
}

module.exports = { generateMessage }
