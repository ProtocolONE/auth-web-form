import Vue from 'vue';
import { get, extend } from 'lodash-es';

function $getFieldErrorMessages(fieldPath) {
  const field = get(this.$v, fieldPath);

  if (!field) {
    return [];
  }

  return Object.keys(field.$params).filter(name => !field[name])
    .map((name) => {
      const message = this.$t(`${this.$view}.errorMessages.${name}`);
      const params = field.$params[name];
      return message.replace(/%(.+?)%/g, (a, variable) => params[variable]);
    });
}

function $getFieldErrorText(fieldPath) {
  return $getFieldErrorMessages.call(this, fieldPath).join('; ');
}

function $isFieldInvalid(fieldPath) {
  const field = get(this.$v, fieldPath);
  if (!field) {
    return false;
  }
  return Boolean(field.$invalid && field.$dirty);
}

extend(Vue.prototype, {
  $getFieldErrorMessages,
  $getFieldErrorText,
  $isFieldInvalid,
});
