const Tree = require('./searchTree');

const arr = [4, 5, 6, 2, 1, 3, 1.5, 1.4];

const tree = new Tree(arr[0]);

for (let i = 1; i < arr.length; i++) {
  tree.insert(arr[i]);
}

tree.remove(1.5);

console.log(tree);

// console.log(tree.find(4.5));
// console.log(tree.find(1));
// console.log(tree.find(5));

