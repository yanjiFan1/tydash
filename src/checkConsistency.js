/*
 * @Author: xiaofan.zhao fanshaogithub@126.com
 * @Date: 2024-05-11 23:58:53
 * @LastEditors: xiaofan.zhao fanshaogithub@126.com
 * @LastEditTime: 2024-05-25 17:58:04
 * @Description: 
 * 判断数组中对象的属性是否满足a的值一致，则属性 b 的值也必须一致；反之亦然

    思路：
    遍历数组中的每个对象，并收集所有独特的 a 值和 b 值。
    对于每个独特的 a 值，检查与其对应的所有 b 值是否相同。
    对于每个独特的 b 值，检查与其对应的所有 a 值是否相同。
    如果发现任何不一致的情况，则返回 false。
    如果遍历完所有对象后都没有发现不一致的情况，则返回 true。
    eg:
    const arr1 = [
      { a: 1, b: 'x' },
      { a: 2, b: 'y' },
      { a: 1, b: 'x' }, // a值一致，b值也一致
      { a: 3, b: undefined }, // a值不一致，允许b为undefined
      { a: 3, b: undefined },
      { a: 4, b: undefined }
    ];
 */
export default function checkConsistency(arr, field1 = 'a', field2 = 'b') {
  if (!Array.isArray(arr)) {
    throw new Error('first filed must be an array');
  }
  const aToBValues = new Map(); // 用于存储a值到b值集合的映射
  // 遍历数组中的每个对象
  for (const obj of arr) {
      const a = obj[field1];
      const b = obj[field2];

      // 检查当前a值是否已存在于映射中
      if (aToBValues.has(a)) {
        // 如果a值已存在，则获取对应的b值集合
        const bValues = aToBValues.get(a);

        // 检查当前b值是否已在集合中，或者集合中是否包含undefined
        if (!bValues.has(b)) {
            // 如果集合中已有b值（且为undefined），或者集合中没有b值但b不是undefined，则不一致
            return false;
        }

        bValues.add(b);
      } else {
        // 如果a值不存在于映射中，则创建新的映射项
        const newBValues = new Set();
        newBValues.add(b);
        if (a !== undefined) {
          aToBValues.set(a, newBValues);
        }
      }
    }

    return true; // 遍历完所有对象后没有发现不一致的情况，返回true
}