<h1 align="center">My News</h1>

<p align="center">A News app with Sentiment analysis, Recommendations and Data Visualization.</p>


## Overview

A React frontend for my [backend service and REST API]() which polls popular RSS news feeds for articles and performs sentiment analysis on headlines and descriptions.

### Main Features
- Classify news articles with their sentiment score from 1 to -1, positive/neutral/negative.
  - Tokenized with BERT transformer, then classified with a regression neural network (NN) to output sentiment scores between 1 and -1.
- Recommendation system using OpenAI text embeddings - filter by semantically similar articles
  - Generates a joint text embedding of article titles, genre, description which is stored in a Pinecone vector database
  - Similar embeddings are queried and ranked based on the cosine distance between these vectors.

- User voting system for sentiment, inspired by [hotukdeals](https://www.hotukdeals.com/) and [Reddit](https://www.reddit.com)
- Articles filtering by metadata - sentiment rating, source and topic.
- Anonymous commenting / discussion.
- Data visualization with MongoDB Charts

### Tech used
- MongoDB
- React
- Redux
- Mantine React Framework
- FastAPI
- Python transformers
- Pinecone - vector database

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