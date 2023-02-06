from .baseScraper import MenuBase, ScraperBase


class Scrapers:

    def __init__(self):
        self.scrapers = []

    def registerScraper(self, scraper: ScraperBase):
        self.scrapers.append(scraper)

    def getMenus(self) -> list[MenuBase]:

        menuArray = []
        for scraper in self.scrapers:
            for menu in scraper.get():
                menuArray.append(menu)

        return menuArray
