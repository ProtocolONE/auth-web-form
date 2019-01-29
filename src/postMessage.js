import assert from 'assert';
import { invert } from 'lodash-es';

export const payoneSdkSourceName = 'PAYONE_JS_SDK';

export const sendingMessagesNames = {
  INITED: 'inited',
  LOADED: 'loaded',
  FORM_RESIZE: 'formResize',
  PAYMENT_BEFORE_CREATED: 'paymentBeforeCreated',
  PAYMENT_CREATED: 'paymentCreated',
  PAYMENT_FAILED_TO_CREATE: 'paymentFailedToCreate',
  PAYMENT_PENDING: 'paymentPending',
  PAYMENT_COMPLETED: 'paymentCompleted',
  PAYMENT_CANCELLED: 'paymentCancelled',
  PAYMENT_DECLINED: 'paymentDeclined',
  PAYMENT_INTERRUPTED: 'paymentInterrupted',
  ORDER_RECREATE_STARTED: 'orderRecreateStarted',
};

export const receivingMessagesNames = invert({
  REQUEST_INIT_FORM: 'requestInitForm',
});

export function postMessage(nameID, data = {}) {
  const name = sendingMessagesNames[nameID];
  assert(name, `Undefiend postMessage nameID: ${nameID}`);
  window.parent.postMessage({
    source: 'PAYONE_PAYMENT_FORM',
    name,
    data,
  }, '*');
}

export function receiveMessages(from, objectWithCallbacks) {
  from.addEventListener('message', (event) => {
    if (event.data && event.data.source !== payoneSdkSourceName) {
      return;
    }
    const { name } = event.data;
    const callback = objectWithCallbacks[receivingMessagesNames[name]];
    if (!callback) {
      return;
    }
    callback(event.data.data);
  });
}
