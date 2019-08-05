export default function (name, data) {
  let messageData = { name, ...data, source: 'auth-web-form' }
  console.log(messageData)
  window.parent.postMessage(messageData, '*')
}
