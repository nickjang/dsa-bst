/* eslint-disable eqeqeq */
/**
 * 1. Draw a BST
 *           3
 *         1    4
 *           2     6
 *               5   9
 *                  7
 *
 *              E
 *         A         S
 *           E    Q      Y
 *               I      U
 *                 O  S
 *                N    T
 */

/**
 * 2. Remove the root
 *            4
 *         1     5
 *           2      6
 *                    9
 *                   7
 *
 *
*               I
 *         A          S
 *           E     Q     Y
 *               N      U
 *                 O  S
 *                     T
 */

/**
 * 3. Create a BST class
 */
class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    // if root is null
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null)
        this.left = new BinarySearchTree(key, value, this);
      else
        this.left.insert(key, value);
    } else {
      if (this.right == null)
        this.right = new BinarySearchTree(key, value, this);
      else
        this.right.insert(key, value);
    }
  }

  find(key) {
    if (key == this.key)
      return this.value;
    else if (key < this.key && this.left)
      return this.left.find(key);
    else if (key > this.key && this.right)
      return this.right.find(key);
    else
      throw new Error('Key error');
  }

  remove(key) {
    if (key == this.key) {
      if (this.left && this.right) {
        const successor = this._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replacewith(this.left);
      } else if (this.right) {
        this._replacewith(this.right);
      } else {
        this._replacewith(null);
      }
    } else if (key < this.key && this.left) {
      return this.left.remove(key);
    } else if (key > this.key && this.right) {
      return this.right.remove(key);
    } else {
      throw new Error('Key error');
    }
  }

  _replacewith(node) {
    if (this.parent) {
      if (this == this.parent.left)
        this.parent.left = node;
      else if (this == this.parent.right)
        this.parent.right = node;
      if (node)
        node.parent = this.parent;
      node.parent = this.parent;
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left)
      return this;
    return this.left._findMin();
  }
}

/**
 * 4. What does this program do?
 */
function tree(t) {
  if (!t) {
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}
/**
 * It returns the sum of all the nodes in the tree.
 */

/**
 * 5. Height of a BST;
 */
function bstHeight(bst) {
  if (!bst) return 0;
  return 1 + Math.max(bstHeight(bst.left), bstHeight(bst.right));
}
// const bst = new BinarySearchTree();
// for (const i of [4, 7, 2, 5, 8, 1, 3])
//   bst.insert(i);
// console.log(bstHeight(bst));

/**
 * 6. Is it a BST?
 */
function isBST(bst) {
  if (!bst) return true;
  if (bst.left && bst.left.key > bst.key)
    return false;
  if (bst.right && bst.right.key < bst.key)
    return false;
  return isBST(bst.left) && isBST(bst.right);
}
// const bst = new BinarySearchTree();
// for (const i of [4, 7, 2, 5, 8, 1, 3])
//   bst.insert(i);
// bst.left.left.key = 9;
// console.log(isBST(bst));

/**
 * 7. 3rd largest node
 */
function firstSecondThird(bst, first = null, second = null, third = null) {
  if (!bst) return { first, second, third };
  if (bst.key >= first) {
    third = second;
    second = first;
    first = bst.key;
  } else if (bst.key >= second) {
    third = second;
    second = bst.key;
  } else if (bst.key > third) {
    third = bst.key;
  }
  ({ first, second, third } = firstSecondThird(bst.left, first, second, third));
  ({first, second, third} = firstSecondThird(bst.right, first, second, third));
  return { first, second, third };
}
function thirdLargestNode(bst) {
  return firstSecondThird(bst).third;
}
// const bst = new BinarySearchTree();
// for (const i of [4, 7, 2, 5, 8, 1, 3])
//   bst.insert(i);
// console.log(thirdLargestNode(bst));

/**
 * 8. Balanced BST
 */
function isBalanced(bst) {
  if (!bst) return true;
  const leftHeight = bstHeight(bst.left);
  const rightHeight = bstHeight(bst.right);
  if (Math.abs(leftHeight - rightHeight) > 1) 
    return false;
  return true;
}
// const bst = new BinarySearchTree();
// for (const i of [3, 1, 7, 8, 5, 4, 9])
//   bst.insert(i);
// console.log(isBalanced(bst));

/**
 * 9. Are they the same BSTs?
 * [3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0] -> true
 */
function isSameHelper(bst1, bst2, rootIdx, end) {
  let idx1 = rootIdx + 1;
  let idx2 = rootIdx + 1;
  let ptr1 = rootIdx + 1;
  let ptr2 = rootIdx + 1;

  if (bst1[rootIdx] !== bst2[rootIdx]) return false;
  if (end - rootIdx <= 1) return true;

  while (ptr1 < end) {
    let temp;
    if (bst1[ptr1] > bst1[rootIdx]) {
      temp = bst1[ptr1];
      bst1[ptr1] = bst1[idx1];
      bst1[idx1] = temp;
      idx1++;
    }
    if (bst2[ptr2] > bst2[rootIdx]) {
      temp = bst2[ptr2];
      bst2[ptr2] = bst2[idx2];
      bst2[idx2] = temp;
      idx2++;
    }
    ptr1++;
    ptr2++;
  }
  if (idx1 !== idx2) return false;
  return isSameHelper(bst1, bst2, rootIdx + 1, idx1) 
    && isSameHelper(bst1, bst2, idx1, end);
}
function isSame(bst1, bst2) {
  if (bst1 && !bst2 || !bst1 && bst2) return false;
  if (bst1.length !== bst2.length) return false;
  return isSameHelper(bst1, bst2, 0, bst1.length);
}
/**
 * O(nlog(n))
 */
//console.log(isSame([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]));
