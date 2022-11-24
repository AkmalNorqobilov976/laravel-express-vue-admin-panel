/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function validEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}


export const validTypes = {
  string: 'string',
  number: 'number'
}
export const typesMessage = {
  string: "harflardan",
  number: "sonlardan"
};
export const validFunction = (name, type) => {
  return (rule, value, callback) => {
    if (!value) {
      callback(new Error(`${name} bo\'sh bo\'lmasligi kerak!!!`))
    } else {
      callback()
    }

    if (typeof value === type) {
      callback(new Error(`${name} ${typesMessage[type]} iborat bo\'lishi kerak!!!`))
    } else {
      callback()
    }
  }
}

export const validFile = (name) => {
  return (rule, value, callback) => {
    if (!value) {
      callback(new Error(`${name} bo\'sh bo\'lmasligi kerak!!!`))
    } else {
      callback()
    }
  }
}