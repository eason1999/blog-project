/**
 * @description test demo
 */
function sum(a, b) {
  return a + b
}
test('1 + 1 = 2', () => {
  // expect(sum(1, 1)).not.toBe(3)
  expect(sum(1, 1)).toBe(2)
})