const Tree = require('./rbTree');

const arr = [12, 1, 9, 2, 0, 11, 7, 19, 4, 15, 18, 5, 14, 13, 10, 16, 6, 3, 8, 17];
// const arr = [11,2,14];
// const arr = [4, 3, 2];
// 40,18,50,17,20,45,16,19,30
const tree = new Tree();

for (let i = 0; i < arr.length; i++) {
  tree.insert(arr[i]);
}

// tree.insert(4)

// console.log(tree);
let remove = [12, 1, 9, 2, 0, 11, 7, 19, 4, 15, 18, 5, 14, 13, 10, 16, 6, 3];
for (let r of remove) {
  tree.remove3(r);
}

console.log(tree);
// console.log(tree.find(1));
// console.log(tree.find(5));
