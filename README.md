# ChallengeStack Builders - Backend

This is the backend of the ChallengeStack Builders project, built using **Node.js**, **Express**, and **Puppeteer** for web scraping. The backend exposes an API that retrieves articles from [Hacker News](https://news.ycombinator.com/) and provides them to the frontend.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [License](#license)

## Technologies Used

- Node.js
- Express
- Puppeteer
- CORS

## Installation

1. Clone this repository:

   git clone https://github.com/FabricioAlejandroFranco/challengeStack-BuildersUIO.git
   cd challengeStack-BuildersUIO/backend

2. Install dependencies:

   npm install

3. Start the server:

   npm start

## Usage

The backend runs a server on `http://localhost:3000` and provides a single API route that scrapes and returns articles from [Hacker News](https://news.ycombinator.com/).

## API Endpoints

- `GET /api`: Fetches a list of articles from Hacker News.

### Example Response

```json
[
  {
    "id": "41805391",
    "number": "1.",
    "title": "WordPress Alternatives",
    "points": "528 points",
    "numberComments": "89 comments"
  },
  {
    "id": "41805391",
    "number": "2.",
    "title": "DeskPad – A virtual monitor for screen sharing",
    "points": "320 points",
    "numberComments": "45 comments"
  }
]
```
