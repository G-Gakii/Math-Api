import express, { Request, Response } from "express";
import axios from "axios";
import NodeCache from "node-cache";
import http from "http";
import https from "https";

const agent = new http.Agent({ keepAlive: true, maxSockets: 100 });
const secureAgent = new https.Agent({ keepAlive: true, maxSockets: 100 });

const cache = new NodeCache({ stdTTL: 3600 });

const isPrime = (num: number) => {
  if (num <= 3) return num > 1;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

const isPerfect = (num: number) => {
  if (num <= 1) return false;
  let sum = 1;
  const limit = Math.sqrt(num);
  for (let i = 2; i <= limit; i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== limit) sum += num / i;
    }
  }
  return sum === num;
};

const getSum = (num: number) => {
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.trunc(num / 10);
  }
  return sum;
};

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

const aboutNumber = async (req: Request, res: Response) => {
  const num = parseInt(req.query.number as string);

  if (isNaN(num)) {
    res.status(400).json({
      number: "alphabet",
      error: true,
    });
    return;
  }
  if (num < 0) {
    res
      .status(400)
      .json({ message: "Negative numbers are not allowed ", error: true });
    return;
  }
  const cachedResponse = cache.get(num.toString());
  if (cachedResponse) {
    res.json(cachedResponse);
    return;
  }

  const is_Prime = isPrime(num);
  const is_perfect = isPerfect(num);
  const numProperties = getProperties(num);
  const sum = getSum(num);

  let funfact = "Sorry, no fun fact available.";
  try {
    const response = await axios.get(`http://numbersapi.com/${num}`, {
      httpAgent: agent,
      httpsAgent: secureAgent,
    });
    funfact = response.data;
  } catch (error) {
    let err = error as Error;
    console.error("Error fetching fun fact:", err);
  }
  const responsePayload = {
    number: num,
    is_prime: is_Prime,
    is_perfect: is_perfect,
    properties: numProperties,
    digit_sum: sum,
    fun_fact: funfact,
  };

  cache.set(num.toString(), responsePayload);

  res.json(responsePayload);
};

export default aboutNumber;
