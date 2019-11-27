const store = {}
export function setStore (key, val) {
    store[key] = val
}
export function getStore (key) {
  return store[key]
}