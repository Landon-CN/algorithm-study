class BinaryTreeNode {
  constructor(value) {
    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;

    this.height = 0;
    this.value = value;
  }

  leftHeight() {
    if (!this.leftChild) {
      return 0;
    }
    return this.leftChild.height + 1;
  }
  rightHeight() {
    if (!this.rightChild) {
      return 0;
    }
    return this.rightChild.height + 1;
  }

  /**
   * 平衡因子
   */
  balanceFactor() {
    return this.leftHeight() - this.rightHeight();
  }

  updateHeight() {
    this.height = Math.max(this.leftHeight(), this.rightHeight());
  }

  /**
   * 更新自己和其父的高度
   */
  updateAllHeight() {
    let node = this;
    while (node) {
      node.updateHeight();
      node = node.parent;
    }
  }

  insertLeft(node) {
    this.leftChild = node;
    node.parent = this;
  }

  insertRight(node) {
    this.rightChild = node;
    node.parent = this;
  }

  replaceChild(node, newNode) {
    if (this.leftChild === node) {
      this.leftChild = newNode;
    } else {
      this.rightChild = newNode;
    }
    newNode.parent = this;
  }

  deleteChild(node) {
    if (this.leftChild === node) {
      this.leftChild = null;
      return true;
    } else if (this.rightChild === node) {
      this.rightChild = null;
      return true;
    }
    return false;
  }
}

module.exports = BinaryTreeNode;
