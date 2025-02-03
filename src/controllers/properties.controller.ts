import isPerfect from "./isperfect.controler";
import isPrime from "./isPrime.controllers";

const getProperties = (num: number) => {
  const numStr = num.toString();
  const numDigits = numStr.length;
  let properties = [];
  if (num % 2 === 0) properties.push("even");
  if (num % 2 !== 0) properties.push("odd");
  if (isPrime(num)) properties.push("prime");
  if (isPerfect(num)) properties.push("perfect");
  if (
    num ===
    numStr
      .split("")
      .map(Number)
      .reduce((acc, digit) => acc + Math.pow(digit, numDigits), 0)
  ) {
    properties.push("armstrong");
  }

  return properties;
};

export default getProperties;
