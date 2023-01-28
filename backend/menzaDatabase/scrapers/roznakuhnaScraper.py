import requests
from bs4 import BeautifulSoup
from .baseScraper import ScraperBase


class RoznaKuhnaScraper(ScraperBase):

    url = "https://www.stud-dom-lj.si/bivanje-v-sdl/restavracija-in-bar/"
    name = 'roznakuhna'

    # this will return an list of menu strings
    def parser(self, html):
        menu_array = []
        elements = html.find_all("h3", {"class": "card-title"})
        for element in elements:
            menuArray = element.find_next("div").text.split("  ")
            menuArray = [element.strip()
                         for element in menuArray if element != '' and element != '\r\n']
            menu_array.append(",".join(menuArray))
        return menu_array

    def get(self):
        req = requests.get(self.url, allow_redirects=False)
        soup = BeautifulSoup(req.content, "html.parser")

        print(soup)
        if (req.status_code != 200):
            return None

        return self.parser(soup)
