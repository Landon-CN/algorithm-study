const Node = require('./rbTreeNode');

class rbTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      this.root.color = 'black';
      return;
    }
    this.root.insert(newNode);
    this.balance(newNode);
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

  balance(node) {
    // 根节点不需要继续平衡
    if (node === this.root) {
      node.color = 'black';
      return;
    }

    // 父节点为黑色，天然平衡
    if (node.parent.color === 'black') return;

    // 父节点为红，叔叔节点为黑
    if (node.parent.color === 'red' && (!node.uncle || node.uncle.color === 'black')) {
      const gp = node.parent.parent;
      const p = node.parent;

      if (gp.rightChild === p && p.rightChild === node) {
        /**
         * resolve: 父黑，祖红，以祖父左旋
         *
         * 插入结构长这样
         * 2
         *  \
         *   4
         *    \
         *     5
         */
        p.color = 'black';
        gp.color = 'red';
        this.rotateLeft(gp);
        return this.balance(gp);
      } else if (gp.rightChild === p && p.leftChild === node) {
        /**
         * resolve: 父节点右旋，递归父节点
         *
         * 插入结构长这样
         * 2
         *  \
         *   4
         *  /
         * 3
         */

        this.rotateRight(p);
        return this.balance(p);
      } else if (gp.leftChild === p && p.leftChild === node) {
        /**
         * resolve: 父黑，祖红，以祖父右旋
         *
         * 插入结构长这样
         *     5
         *    /
         *   4
         *  /
         * 3
         */
        p.color = 'black';
        gp.color = 'red';
        this.rotateRight(gp);
        return this.balance(gp);
      } else {
        /**
         * resolve: 父节点左旋
         *
         * 插入结构长这样
         *     5
         *    /
         *   4
         *    \
         *    4.5
         */
        this.rotateLeft(p);
        return this.balance(p);
      }
    } else if (node.parent.color === 'red' && node.uncle.color === 'red') {
      // 父节点和叔叔节点都是红色
      // 父和叔变黑，祖父变红,balance递归祖父
      node.parent.color = 'black';
      node.uncle.color = 'black';
      node.parent.parent.color = 'red';
      this.balance(node.parent.parent);
      return;
    }
  }

  deleteFix(node) {
    // 1.一边有节点，且节点是红色
    // resolve: 子节点染黑，算法结束
    // 2. 双黑节点
    if (node.leftChild && node.leftChild.color === 'red') {
      node.leftChild.color = 'black';
      return;
    } else if (node.rightChild && node.rightChild.color === 'red') {
      node.rightChild.color = 'black';
      return;
    } else {
      // 双黑情况
      node = node.leftChild || node.rightChild || node;

      if (node.brother.color === 'red') {
      }
      // 兄弟节点为黑色，远侄子为红色
      // resolve: 把兄弟结点染为双黑结点的父亲结点的颜色，把远侄子染为黑色，再把父结点染为黑色；然后针对父结点进行一次旋转
      else if (node.brother.color === 'black' && node.farNephew.color === 'red') {
        node.brother.color === node.parent.color;
        node.farNephew.color = 'black';
        node.parent.color = 'black';
        if (node === node.parent.leftChild) {
          // 左旋
          this.rotateLeft(node.parent);
        } else {
          // 右旋
          this.rotateRight(node.parent);
        }
        return;
      } else if (node.brother.color === 'black' && node.newphew.color === 'red') {
        // 兄弟为黑，近侄子为红,远侄子为黑
        // 针对双黑结点的兄弟做一次旋转，结果使双黑结点的近侄子成为双黑结点新的兄弟；将新兄弟结点着为双黑结点的父结点的颜色，父结点着为黑色，再针对父做一次旋转
        if (node === node.parent.leftChild) {
          // 兄弟右旋
          this.rotateRight(node.brother);
          // 父左旋
          this.rotateLeft(node.parent);
        } else {
          // 兄弟左旋
          this.rotateLeft(node.brother);
          // 父右旋
          this.rotateRight(node.parent);
        }
      }

      return;
    }
  }

  delete(node) {
    const p = node.parent;
    if (node.leftChild) {
      p.replaceChild(node, node.leftChild);
    } else if (node.rightChild) {
      p.replaceChild(node, node.rightChild);
    } else {
      p.deleteChild(node);
    }
  }
  // http://gengning938.blog.163.com/blog/static/1282253812011420103852696/
  remove(value) {
    let deleteNode = this.root.find(value);
    // 有两个子节点
    if (deleteNode.leftChild && deleteNode.rightChild) {
      // 寻找左树最大子节点
      let child = deleteNode.leftChild;
      while (child.rightChild) child = child.rightChild;
      // 交换值
      const value = deleteNode.value;
      deleteNode.value = child.value;
      child.value = value;
      deleteNode = child;
    }

    this.delete(deleteNode);

    if (deleteNode.color === 'black') {
      this.deleteFix(deleteNode);
    }
  }

  remove2() {
    let node = this.root.find(value);
    // 有两个子节点
    if (node.leftChild && node.rightChild) {
      // 被取代节点
      let replace = node.rightChild;
      while (replace.leftChild) replace = replace.leftChild;

      if (node.parent) {
        // 不是根节点
        if (node.parent.leftChild === node) {
          node.parent.leftChild = replace;
        } else node.parent.rightChild = replace;
      } else {
        this.root = replace;
      }

      // child为取代节点的右孩子，需要被调整
      let child = replace.rightChild;
      let parent = replace.parent;
      let color = replace.color;

      if (parent === node) {
        parent = replace;
      } else {
        // if(child)
      }
    }
  }
  removeFix3(x, p) {
    while (x !== this.root && (!x || x.color === 'black')) {
      // 左孩子
      if (x === p.leftChild) {
        let w = p.rightChild;

        // Case 1: x是“黑+黑”节点，x的兄弟节点是红色。(此时x的父节点和x的兄弟节点的子节点都是黑节点)。
        //   (01) 将x的兄弟节点设为“黑色”。
        //   (02) 将x的父节点设为“红色”。
        //   (03) 对x的父节点进行左旋。
        //   (04) 左旋后，重新设置x的兄弟节点。
        if (w && w.color === 'red') {
          w.color = 'black';
          p.color = 'red';
          this.rotateLeft(p);
          w = p.rightChild;
        }

        if (
          (!w.leftChild || w.leftChild.color === 'black') &&
          (!w.rightChild || w.rightChild.color === 'black')
        ) {
          // Case 2: x是“黑+黑”节点，x的兄弟节点是黑色，x的兄弟节点的两个孩子都是黑色。
          //   (01) 将x的兄弟节点设为“红色”。
          //   (02) 设置“x的父节点”为“新的x节点”。
          w.color = 'red';
          x = p;
          p = x.parent;
        } else {
          if (!w.rightChild || w.rightChild.color === 'black') {
            // Case 3: x是“黑+黑”节点，x的兄弟节点是黑色；x的兄弟节点的左孩子是红色，右孩子是黑色的。
            //   (01) 将x兄弟节点的左孩子设为“黑色”。
            //   (02) 将x兄弟节点设为“红色”。
            //   (03) 对x的兄弟节点进行右旋。
            //   (04) 右旋后，重新设置x的兄弟节点。
            w.leftChild.color = 'black';
            w.color = 'red';
            this.rotateRight(w);
            w = p.rightChild;
            // 其实旋转后情况变成了case 4
          }
          // Case 4: x是“黑+黑”节点，x的兄弟节点是黑色；x的兄弟节点的右孩子是红色的，左孩子任意颜色s。
          //   (01) 将x父节点颜色 赋值给 x的兄弟节点。
          //   (02) 将x父节点设为“黑色”。
          //   (03) 将x兄弟节点的右子节设为“黑色”。
          //   (04) 对x的父节点进行左旋。
          //   (05) 设置“x”为“根节点”。
          w.color = p.color;
          p.color = 'black';
          w.rightChild.color = 'black';
          this.rotateLeft(p);
          x = this.root;
        }
      } else {
        let w = p.leftChild;

        // Case 1: x是“黑+黑”节点，x的兄弟节点是红色。(此时x的父节点和x的兄弟节点的子节点都是黑节点)。
        //   (01) 将x的兄弟节点设为“黑色”。
        //   (02) 将x的父节点设为“红色”。
        //   (03) 对x的父节点进行右旋。
        //   (04) 右旋后，重新设置x的兄弟节点。
        if (w && w.color === 'red') {
          w.color = 'black';
          p.color = 'red';
          this.rotateRight(p);
          w = p.leftChild;
        }

        if (
          (!w.leftChild || w.leftChild.color === 'black') &&
          (!w.rightChild || w.rightChild.color === 'black')
        ) {
          // Case 2: x是“黑+黑”节点，x的兄弟节点是黑色，x的兄弟节点的两个孩子都是黑色。
          //   (01) 将x的兄弟节点设为“红色”。
          //   (02) 设置“x的父节点”为“新的x节点”。
          w.color = 'red';
          x = p;
          p = x.parent;
        } else {
          if (!w.leftChild || w.leftChild.color === 'black') {
            // Case 3: x是“黑+黑”节点，x的兄弟节点是黑色；x的兄弟节点的右孩子是红色，左孩子是黑色的。
            //   (01) 将x兄弟节点的右孩子设为“黑色”。
            //   (02) 将x兄弟节点设为“红色”。
            //   (03) 对x的兄弟节点进行左旋。
            //   (04) 左旋后，重新设置x的兄弟节点。
            w.rightChild.color = 'black';
            w.color = 'red';
            this.rotateLeft(w);
            w = p.leftChild;
            // 其实旋转后情况变成了case 4
          }
          // Case 4: x是“黑+黑”节点，x的兄弟节点是黑色；x的兄弟节点的左孩子是红色的，右孩子任意颜色。
          //   (01) 将x父节点颜色 赋值给 x的兄弟节点。
          //   (02) 将x父节点设为“黑色”。
          //   (03) 将x兄弟节点的左子节设为“黑色”。
          //   (04) 对x的父节点进行右旋。
          //   (05) 设置“x”为“根节点”。
          w.color = p.color;
          p.color = 'black';
          w.leftChild.color = 'black';
          this.rotateRight(p);
          x = this.root;
        }
      }
    }
    x.color = 'black';
  }
  remove3(value) {
    let node = this.root.find(value);
    let y = null;
    let x = null;
    if (node.leftChild && node.rightChild) {
      let replace = node.rightChild;
      while (replace.leftChild) replace = replace.leftChild;
      y = replace;
    } else {
      y = node;
    }

    if (y.leftChild) {
      x = y.leftChild;
    } else if (y.rightChild) {
      x = y.rightChild;
    }
    if (x) x.parent = y.parent;

    if (!y.parent) {
      // 根节点
      this.root = x;
    } else if (y === y.parent.leftChild) {
      y.parent.leftChild = x;
    } else {
      y.parent.rightChild = x;
    }

    if (y !== node) {
      node.value = y.value;
    }
    if (y.color === 'black') {
      this.removeFix3(x, y.parent);
    }

    return y;
  }
}

module.exports = rbTree;
