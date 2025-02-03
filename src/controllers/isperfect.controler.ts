const isPerfect = (num: number) => {
  if (num < 0) return false;
  if (num <= 1) return false;
  let sum = 1;
  const limit = Math.sqrt(num);
  for (let i = 2; i <= limit; i++) {
    if (num % i === 0) {
      sum += i;
      if (i * i !== num) sum += num / i;
    }
  }
  return sum === num;
};

export default isPerfect;
