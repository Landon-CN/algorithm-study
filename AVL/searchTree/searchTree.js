const Node = require('./searchTreeNode');

class SearchTree {
  constructor(value) {
    this.root = new Node(value);
  }

  insert(value) {
    const newNode = new Node(value);
    this.root.insert(newNode);
    newNode.updateAllHeight();
  }

  find(value) {
    return this.root.find(value);
  }

  remove(value) {
    const node = this.find(value);
    if (!node) return false;
    const parent = node.parent;

    // 叶子节点
    if (!node.leftChild && !node.rightChild) {
      if (parent) {
        parent.deleteChild(node);
      } else {
        // 根节点
        this.root = null;
      }
    } else if (node.leftChild && !node.rightChild) {
      // 只有左子树
      if (parent) {
        // 非根节点
        node.leftChild.parent = parent;
        parent.rightChild = node.leftChild;
      } else {
        this.root = node.leftChild;
        node.leftChild.parent = null;
      }
    } else {
      // 既有左子树，也有右子树
      let child = node.leftChild;

      while (child.rightChild) {
        child = child.rightChild;
      }

      // 左子节点断开重连
      if (child.leftChild) {
        child.parent.rightChild = child.leftChild;
        child.leftChild.parent = child.parent;
      } else {
        child.parent.rightChild = null;
      }

      // 最大子节点替换删除节点
      if (node.leftChild) {
        child.leftChild = node.leftChild;
        node.leftChild.parent = child;
      } else {
        child.leftChild = null;
      }

      if (node.rightChild) {
        child.rightChild = node.rightChild;
        node.rightChild.parent = child;
      } else {
        child.rightChild = null;
      }
      child.parent = parent;

      parent.deleteChild(node);
    }
  }
}
module.exports = SearchTree;
