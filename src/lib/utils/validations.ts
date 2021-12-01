import i18n from '@/plugins/i18n';
import { bnum } from '.';

export function isRequired(field = '') {
  const _field = field ? `${field} ` : 'Input ';
  return v => !!v || `${_field}${i18n.global.t('isRequired')}`;
}

export function minChar(minLength: number, field = '') {
  const _field = field ? `${field} ` : '';
  return v =>
    !v ||
    v.length >= minLength ||
    `${_field}${i18n.global.t('mustBeAtLeast', [minLength])}`;
}

export function isPositiveCheck(number: number | string) {
  return bnum(number).isGreaterThanOrEqualTo(0);
}
export function isPositive() {
  return v => !v || isPositiveCheck(v) || i18n.global.t('mustBePositive');
}

export function isLessThanOrEqualTo(max: number | string, msg = '') {
  return v =>
    !v ||
    bnum(v).isLessThanOrEqualTo(max) ||
    (msg ? msg : i18n.global.t('mustBeLessThan', [max]));
}

export const isEmailCheck = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

export function isEmail() {
  return v => !v || isEmailCheck(v) || i18n.global.t('mustBeValidEmail');
}
