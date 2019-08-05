class Storage {
  #storage = sessionStorage

  set (name, value) {
    try {
      this.#storage.setItem(name, JSON.stringify(value))
    }
    catch (err) {
      console.error(err)
    }
    return value
  }

  get (name) {
    try {
      let value = this.#storage.getItem(name)
      return JSON.parse(value)
    }
    catch (err) {
      console.error(err)
    }
    return null
  }
}

export default new Storage()
