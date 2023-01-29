from baseScraper import ScraperBase


class Scrapers:

    def __init__(self):
        self.scrapers = list()
        pass

    def registerScraper(self, scraper: ScraperBase):
        self.scrapers.append(scraper)

    def getScrapers(self):
        return self.scrapers
