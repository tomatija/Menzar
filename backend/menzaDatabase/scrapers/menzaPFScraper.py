from .baseScraper import ScraperBase, MenuBase
from django.utils import timezone

from datetime import datetime


class MenzaPFScraper(ScraperBase):
    year = timezone.now().date().strftime("%Y")
    url = "https://www.studentska-prehrana.si/sl/restaurant/Details/1474"
    name = 'menzapf'

    def parser(self, soup) -> list[MenuBase]:
        elements = soup.find_all(
            'div', {"class": "col col-md-8 margin-left-10"})
        menuArray = []
        for element in elements:
            dish = element.contents[1].string.split("\xa0")[1].lstrip()
            soup = element.contents[3].contents[1].contents[1].string

            if soup == None:
                soup = ""

            menu = MenuBase()
            menu.dinerName = self.name
            menu.soupString = soup
            menu.dishString = dish
            menuArray.append(menu)

        return menuArray
