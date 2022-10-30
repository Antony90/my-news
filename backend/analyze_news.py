'''
Pull news articles from API, several sources
analyze each article, store article + sent under source 
'''
from datetime import datetime
from database import get_database
from provider import NewsProvider
from transformers import pipeline
from pymongo.errors import DuplicateKeyError


class AnalyzeNews:
    def __init__(self):
        self.sentiment_pipeline = pipeline("sentiment-analysis")
        self.providers: list[NewsProvider] = self._init_providers()
        self.db = get_database()

    def _init_providers(self):
        '''
        RSS Feeds are listed by category
        '''
        provider_category_feeds ={
            'BBC': [
                'http://feeds.bbci.co.uk/news/rss.xml',
                'http://feeds.bbci.co.uk/news/technology/rss.xml',
                'http://feeds.bbci.co.uk/news/world/rss.xml',
                'http://feeds.bbci.co.uk/news/politics/rss.xml',
                'http://feeds.bbci.co.uk/news/business/rss.xml',
                'http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml'
            ],
            'Sky News': [
                'https://feeds.skynews.com/feeds/rss/home.xml',
                'https://feeds.skynews.com/feeds/rss/technology.xml',
                'https://feeds.skynews.com/feeds/rss/world.xml',
                'https://feeds.skynews.com/feeds/rss/politics.xml',
                'https://feeds.skynews.com/feeds/rss/business.xml',
                'https://feeds.skynews.com/feeds/rss/entertainment.xml'
            ],
            'Daily Mail': [
                'https://www.dailymail.co.uk/news/index.rss',
            ]
        }
        return [NewsProvider(source, feed_category_urls)
                for source, feed_category_urls in provider_category_feeds.items()
                ]

    def _fetch_all_articles(self):
        providers = (prov.get_articles() for prov in self.providers)
        all_articles = []
        for prov_articles in providers:
            all_articles.extend(prov_articles)
        return all_articles

    def save_articles(self, articles: list[dict]):
        articles_collection = self.db.get_collection('articles')
        insert_count = 0
        for article in articles:
            try:
                articles_collection.insert_one(article)
            except DuplicateKeyError:  # Article has existing link
                continue
            else:
                insert_count += 1
        return insert_count

    def get_sentiment(self, articles):
        article_titles = [article.get('title') for article in articles]
        predictions = self.sentiment_pipeline(article_titles)
        return predictions
        # batch_input_ids = self.tokenizer.batch_encode_plus(article_titles,
        #                         padding='longest',
        #                         truncation=True,
        #                         return_tensors="tf")
        # predictions = self.model(batch_input_ids)

    def run(self):
        articles = self._fetch_all_articles()
        print(f'[analyzer] Analyzing sentiment of {len(articles)} articles')
        sentiment = self.get_sentiment(articles)

        # Add sentiment key to each dict
        for article, sentiment in zip(articles, sentiment):
            i = 1 if sentiment.get('label') == 'POSITIVE' else -1
            article['sentiment'] = i * sentiment.get('score')

        # Update articles database
        num_saved = self.save_articles(articles)
        print(
            f"[analyzer] [{datetime.now().strftime('%H:%M')}] Saved {num_saved} articles")


if __name__ == '__main__':
    task = AnalyzeNews()
    task.run()
