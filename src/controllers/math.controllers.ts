import express, { Request, Response } from "express";
import axios from "axios";
import NodeCache from "node-cache";
import isPrime from "./isPrime.controllers";
import isPerfect from "./isperfect.controler";
import getSum from "./sum.controller";
import getProperties from "./properties.controller";
import fetch from "node-fetch";

const cache = new NodeCache({ stdTTL: 3600 });

const aboutNumber = async (req: Request, res: Response) => {
  const num = parseInt(req.query.number as string);

  if (isNaN(num)) {
    res.status(400).json({ number: "alphabet", error: true });
    return;
  }
  // if (num < 0) {
  //   res
  //     .status(400)
  //     .json({ message: "Negative numbers are not allowed", error: true });
  //   return;
  // }

  const cachedResponse = cache.get(num.toString());
  if (cachedResponse) {
    res.json(cachedResponse);
    return;
  }

  let funfact = cache.get(`funfact-${num}`);
  if (!funfact) {
    try {
      const funFactResponse = await axios(`http://numbersapi.com/${num}`);
      funfact = funFactResponse.data;
    } catch (error) {
      console.error("Error fetching fun fact:", error);
      funfact = "Sorry, no fun fact available.";
    }
  }

  try {
    const [is_Prime, is_Perfect, numProperties, sum] = await Promise.all([
      isPrime(num),
      isPerfect(num),
      getProperties(num),
      getSum(num),
    ]);

    const responsePayload = {
      number: num,
      is_prime: is_Prime,
      is_perfect: is_Perfect,
      properties: numProperties,
      digit_sum: sum,
      fun_fact: funfact,
    };

    cache.set(num.toString(), responsePayload);

    res.json(responsePayload);
  } catch (error) {
    console.error("Error processing number:", error);
    res.status(500).json({ message: "Internal server error", error: true });
  }
};

export default aboutNumber;
