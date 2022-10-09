class List {
  constructor(listArray = []) {
    this.dataStore = listArray;
  }

  listSize = this.dataStore.length || 0;
  
  pos = 0;

  length() {
    return this.listSize;
  }

  clear() {
    delete this.dataStore;
    this.dataStore = [];
  }

  toString() {
    return this.dataStore;
  }

  getElement() {
    return this.dataStore[this.pos];
  }

  insert(element, after) {
    const insertPos = this.find(after);
    if (insertPos > -1) {
      this.dataStore.splice(insertPos+1, 0, element);
      return true;
    }
    return false;
  }

  append(element) {
    this.dataStore[this.length++] = element;
  }

  remove(element) {
    const foundAt = this.find(element);
    if (foundAt > -1) {
      this.dataStore.splice(foundAt, 1);
      return true;
    }
    return false;
  }

  contains(element) {
    for (let i = 0; i < this.dataStore.length; ++i) {
      if (this.dataStore[i] === element) {
        return true;
      }
    }
    return false;
  }

  front() {
    this.pos = 0;
  }

  end() {
    this.pos = this.listSize - 1;
  }

  prev() {
    if (this.pos > 0) --this.pos;
  }

  next() {
    if (this.pos < this.listSize -1) ++this.pos;
  }

  currPos() {
    return this.pos;
  }

  moveTo(position) {
    this.pos = position;
  }

  find(element) {
    for (let i = 0; i < this.length; ++i) {
      if (this.dataStore[i] === element) {
        return i;
      }
    }
    return -1;
  }
  
}