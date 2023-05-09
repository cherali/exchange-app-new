interface ItemObject {
  [key: string]: any
}

export function removeItem<T extends ItemObject>(data: T, name: string) {
  return Object.keys(data)
    .filter(key => key !== name)
    .reduce((obj: ItemObject, key) => {
      obj[key] = data[key]
      return obj
    }, {})
}
