# Number Classification API

## Description

This API takes a number and returns interesting mathematical properties about it, along with a fun fact.

## Technology Stack

- Node.js
- Express
- TypeScript
- Axios

## Features

- Get number properties
- Get a fun fact about the number

## Setup Instructions

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository

```
 git clone <repository-url>
 cd project-directory
```

2.Install dependencies

```
npm install
```

3. Create .env file
   `PORT=3000` or port of your choice

### Running the Application

- To start the server, use the following command:`npm run dev`

### API Endpoint

- Method:`GET`
- Base(local): `http://localhost:3000/`
- Endpoint : `/api/classify-number?number=371`
- Success Response:
  - Code: 200 OK
  - Content:
  ````
  {
  "number": 208,
  "is_prime": false,
  "is_perfect": false,
  "properties": [
  "even"
  ],
  "digit_sum": 10,
  "fun_fact": "208 is the heaviest stable isotope of any element (lead)."
  }```
  ````
- Error (400 Bad Request)
  ```
  {
  "error": "Invalid input"
  }
  ```

### Example usage

- local : `http://localhost:3000/api/classify-number?number=208`
-
- online :
  - Base:`https://math-api-qhxl.onrender.com/api/classify-number?number=17`
