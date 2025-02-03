const isPrime = (num: number) => {
  if (num < 1) return false;
  if (num <= 3) return num > 1;
  if (num % 2 === 0 || num % 3 === 0) return false;
  const sqrtNum = Math.sqrt(num);
  for (let i = 5; i <= sqrtNum; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

export default isPrime;
