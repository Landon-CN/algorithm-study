const Node = require('./avlTreeNode');

class AVLTree {
  constructor() {
    this.root = null;
  }

  findInsertParent(value) {
    let node = this.root;
    while (node) {
      if (value < node.value && node.leftChild) {
        node = node.leftChild;
      } else if (value > node.value && node.rightChild) {
        node = node.rightChild;
      } else {
        return node;
      }
    }
  }

  rotateLeft(node) {
    const p = node.parent;
    const rn = node.rightChild;
    if (rn.leftChild) {
      node.rightChild = rn.leftChild;
      node.rightChild.parent = node;
    } else {
      node.rightChild = null;
    }
    node.parent = rn;
    rn.leftChild = node;
    rn.parent = p;
    if (p === null) {
      this.root = rn;
    } else {
      p.replaceChild(node, rn);
    }
  }

  rotateRight(node) {
    const ln = node.leftChild;
    const p = node.parent;
    if (ln.rightChild) {
      node.leftChild = ln.rightChild;
      node.leftChild.parent = node;
    } else {
      node.leftChild = null;
    }

    ln.rightChild = node;
    node.parent = ln;
    ln.parent = p;

    if (p === null) {
      this.root = ln;
    } else {
      p.replaceChild(node, ln);
    }
  }

  rotateRightLeft(node) {
    this.rotateRight(node.rightChild);
    this.rotateLeft(node);
  }
  rotateLeftRight(node) {
    this.rotateLeft(node.leftChild);
    this.rotateRight(node);
  }

  balance(node) {
    if (node.balanceFactor() < -1) {
      if (node.rightChild.balanceFactor() <= 0) {
        // 左旋
        this.rotateLeft(node);
      } else if (node.rightChild.balanceFactor() > 0) {
        // 右旋-左旋
        this.rotateRightLeft(node);
      }
    } else if (node.balanceFactor() > 1) {
      if (node.leftChild.balanceFactor() >= 0) {
        // 右旋
        this.rotateRight(node);
      } else if (node.leftChild.balanceFactor() > 0) {
        // 左旋-右旋
        this.rotateLeftRight(node);
      }
    }

    node.updateAllHeight();
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) return (this.root = newNode);

    this.root.insert(newNode);
    let node = newNode.parent;
    while (node) {
      node.updateHeight();
      const balanceFactor = node.balanceFactor();
      if (balanceFactor > 1 || balanceFactor < -1) {
        this.balance(node);
        break;
      }
      node = node.parent;
    }
  }

  remove(value) {
    let node = this.root.find(value);

    if (!node.leftChild && !node.rightChild) {
      // 叶子节点直接删除
      node.parent.deleteChild(node);
    } else if (node.leftChild && !node.rightChild) {
      // 只有左节点
      const p = node.parent;
      const leftChild = node.leftChild;
      p.leftChild = leftChild;
      p.leftChild.parent = p;
    } else if (node.rightChild && !node.leftChild) {
      // 只有右节点
      const p = node.parent;
      const rightChild = node.rightChild;
      p.rightChild = rightChild;
      p.rightChild.parent = p;
    } else {
      // 都有
      // 1. 寻找右子树最小值
      // 2. 交换
      // 3. 删除
      let r = node.rightChild;
      while (r.leftChild) {
        r = r.leftChild;
      }
      node.value = r.value;
      r.parent.deleteChild(r);
      node = r;
    }

    let p = node.parent;
    p.updateHeight();
    while (p) {
      if (p.balanceFactor() > 1 || p.balanceFactor() < -1) {
        // 失衡重平衡
        this.balance(p);
      }
      p.updateHeight();
      p = p.parent;
    }
  }
}

module.exports = AVLTree;
