const Tree = require('./avlTree');

const arr = [40, 18, 50, 17, 20, 45, 16, 19, 30];
// const arr = [4, 3, 2];
// 40,18,50,17,20,45,16,19,30
const tree = new Tree();

for (let i = 0; i < arr.length; i++) {
  tree.insert(arr[i]);
}

// console.log(tree);

tree.remove(40);

console.log(tree);
// console.log(tree.find(1));
// console.log(tree.find(5));
