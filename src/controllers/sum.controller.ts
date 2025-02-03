const getSum = (num: number) => {
  let number = Math.abs(num);
  let sum = 0;
  while (number > 0) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }
  return sum;
};
export default getSum;
