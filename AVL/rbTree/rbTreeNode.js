const SearchNode = require('../searchTree/searchTreeNode');

class rbTreeNode extends SearchNode {
  constructor(value) {
    super(value);
    this.color = 'red';
  }
  // 兄弟节点
  get brother() {
    if (this === this.parent.leftChild) {
      return this.parent.rightChild;
    } else {
      return this.parent.leftChild;
    }
  }

  // 远端的侄子
  get farNephew() {
    if (this === this.parent.leftChild) {
      return this.parent.rightChild.rightChild;
    } else {
      return this.parent.leftChild.leftChild;
    }
  }

  // 近端的侄子
  get newphew() {
    if (this === this.parent.leftChild) {
      return this.parent.rightChild.leftChild;
    } else {
      return this.parent.leftChild.rightChild;
    }
  }

  get uncle() {
    const gp = this.parent.parent;
    if (gp.leftChild === this.parent) {
      return gp.rightChild;
    } else {
      return gp.leftChild;
    }
  }
}

module.exports = rbTreeNode;
