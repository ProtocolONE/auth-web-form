import assert from 'assert';
import { invert } from 'lodash-es';

export const sendingMessagesNames = {
  INITED: 'inited',
  LOADED: 'loaded',
  FORM_RESIZE: 'formResize',
  TOKEN_RECEIVED: 'tokenReceived',
  REDIRECT_REQUESTED: 'redirectRequested',
  IS_LOGOUT: 'isLogout',
};

export function postMessage(nameID, data = {}) {
  const name = sendingMessagesNames[nameID];
  assert(name, `Undefined postMessage nameID: ${nameID}`);
  window.parent.postMessage({
    source: 'P1_AUTH_FORM',
    name,
    data,
  }, '*');
}

export function receiveMessages(sourceName, receivingMessagesNames, objectWithCallbacks) {
  const receivingMessagesNamesInverted = invert(receivingMessagesNames);
  window.addEventListener('message', (event) => {
    if (event.data && event.data.source !== sourceName) {
      return;
    }
    const { name } = event.data;
    const callback = objectWithCallbacks[receivingMessagesNamesInverted[name]];
    if (!callback) {
      return;
    }
    callback(event.data.data);
  });
}
