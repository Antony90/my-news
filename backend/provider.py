from dataclasses import dataclass
import json
from feedparser import parse

article_attrs = ['title', 'link', 'summary', 'published_parsed']

@dataclass
class NewsProvider:
    source: str
    feed_url: str

    def get_articles(self) -> list[dict]:
        xml = parse(self.feed_url)
        if xml.get('status') != 200:
            return []
        articles = xml.entries

        # Filter dictionary
        articles = [{key: val for (key, val) in article.items() if key in article_attrs}
                    for article in articles]
        return articles


if __name__ == '__main__':
    prov = NewsProvider(
        source='Telegraph',
        feed_url='https://www.telegraph.co.uk/rss.xml'
    )
    articles = prov.get_articles()
    
    print(articles[0].keys())
    print(json.dumps(articles[0], indent=4))
    print(f'{len(articles)} articles')
