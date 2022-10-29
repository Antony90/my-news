'''
Pull news articles from API, several sources
analyze each article, store article + sent under source 
'''

import json
from re import A
from provider import NewsProvider
from transformers import pipeline
import tensorflow as tf
from numpy import argmax
import numpy as np
from random import sample


class AnalyzeNews:
    def __init__(self):
        self.sentiment_pipeline = pipeline("sentiment-analysis")
        self.providers: list[NewsProvider] = self._init_providers()

    def _init_providers(self):
        return [
            NewsProvider(source, feed_url) for source, feed_url in [
                ('Daily Mail', 'https://www.dailymail.co.uk/articles.rss'),
                ('The Telegraph', 'https://www.telegraph.co.uk/rss.xml'),
                ('BBC', 'http://feeds.bbci.co.uk/news/rss.xml'),
                ('Sky News', 'https://feeds.skynews.com/feeds/rss/home.xml')
            ]
        ]

    def _get_articles(self):
        return {prov.source: prov.get_articles() for prov in self.providers}

    def get_sentiment(self, articles):
        article_titles = [article.get('title') for article in articles]
        predictions = self.sentiment_pipeline(article_titles)
        return predictions
        # batch_input_ids = self.tokenizer.batch_encode_plus(article_titles,
        #                         padding='longest',
        #                         truncation=True,
        #                         return_tensors="tf")
        # predictions = self.model(batch_input_ids)

    def update_database(self):
        sources = self._get_articles()
        for source, articles in sources.items():
            print(f"{source=}")
            sentiment = self.get_sentiment(articles)

            # Add sentiment key to each dict
            for article, sentiment in zip(articles, sentiment):
                article['sentiment'] = sentiment.get('label')

            print(json.dumps(sample(articles, 2), indent=2))

            # Update articles database


if __name__ == '__main__':
    task = AnalyzeNews()
    task.update_database()
