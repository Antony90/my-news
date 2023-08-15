# My News

A News app with article Sentiment filtering and analysis.

---

## Overview

A React web app for a backend service which polls popular RSS news feeds for articles and performs
sentiment analysis on headlines and descriptions.

### Purpose
- Classify and filter news articles via their sentiment - positive/neutral/negative.
- Develop a backend to collate news articles and query sentiment results.
- Emphasize news article sentiment visually with UI sliders and bold colors.
- Concisely present articles from various feeds.

### Tech used
- MongoDB
- React
- redux
- Mantine UI library
- transformers

----

## Backend
Article headlines and descriptions are given a positivity score between -1 and 1. The model used is based on BERT,
via the `transformers` python package.

Sentiment results are stored with article metadata on a MongoDB database which is exposed to the web app.

## Installation and Usage

Requires `nodejs`, my [RSS feed sentiment analysis service]() and a MongoDB database to store news articles.

1. Run the web server locally
  ```npm run start```

2. Start the backend service to collect news articles, see the linked repository.
