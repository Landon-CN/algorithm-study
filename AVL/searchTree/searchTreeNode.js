const BinaryNode = require('../binaryTreeNode');

class SearchTreeNode extends BinaryNode {
  insert(node) {
    if (this.value < node.value) {
      if (this.rightChild) {
        return this.rightChild.insert(node);
      }
      this.insertRight(node);
    } else {
      if (this.leftChild) {
        return this.leftChild.insert(node);
      }
      this.insertLeft(node);
    }
  }

  find(value) {
    if (this.value === value) return this;
    else if (this.value < value) {
      if (this.rightChild) return this.rightChild.find(value);
      return null;
    } else {
      if (this.leftChild) return this.leftChild.find(value);
      return null;
    }
  }
}

module.exports = SearchTreeNode;
