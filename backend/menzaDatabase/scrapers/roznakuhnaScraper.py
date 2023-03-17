import requests
from bs4 import BeautifulSoup
from .baseScraper import MenuBase, ScraperBase


class RoznaKuhnaScraper(ScraperBase):

    url = "https://www.stud-dom-lj.si/bivanje-v-sdl/restavracija-in-bar/"
    name = 'roznakuhna'
    display_name = "Rožna Kuh'na"

    # this will return an list of menu strings
    def parser(self, html) -> list[MenuBase]:
        menu_array = []

        # get all menu elements that are in h3
        elements = html.find_all("h3", {"class": "card-title"})

        # iterate over all menus
        for element in elements:

            menuArray = element.find_next("div").text.split("  ")

            # remove empty and newline elements
            menuArray = [element.strip()
                         for element in menuArray if element != '' and element != '\r\n']

            # create new menu
            menu = MenuBase()
            menu.dinerName = self.name
            menu.soupString = menuArray[0]
            menu.dishString = ",".join(menuArray[1::])

            menu_array.append(menu)

        return menu_array
