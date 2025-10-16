/* eslint-disable no-useless-escape */
/* eslint-disable security/detect-non-literal-regexp */

import { NEW_LINE } from './consts'
import { isString } from './utils'

const TAGS = {
  br: '\n',
  rb: '\u001B[31;1m', // red bold
  bb: '\u001B[34;1m', // blue bold
  b: '\u001B[1m', // bold
  i: '\u001B[3m', // italic
  u: '\u001B[4m', // underline
  '/': '\u001B[m', // reset
}

const keys = Object.keys(TAGS)
const tags = new RegExp(`<(${keys.join('|')})>`, 'gi')
const lookup = (_, tag) => TAGS[tag] ?? ''
const encode = (s) => s.replace(tags, lookup)

const filter = (s) =>
  s.replaceAll('<br>', NEW_LINE).replaceAll(/<\/?[^>]+>/gi, '')

export default (formatLogMessage) => (message) =>
  formatLogMessage(
    isString(message)
      ? window.chrome
        ? encode(message)
        : filter(message)
      : message,
  )

/* eslint-enable security/detect-non-literal-regexp */
/* eslint-enable no-useless-escape */
