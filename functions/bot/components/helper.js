
exports.getUser = info => {
  const { id, times: times, is_bot: isBot, first_name: firstName, last_name: lastName } = info
  const name = (firstName ? firstName : '' + ' ' + lastName ? lastName : '').trim()
  return { id, isBot, name, times }
}