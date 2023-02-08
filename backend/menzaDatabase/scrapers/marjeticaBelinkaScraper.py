from .baseScraper import ScraperBase, MenuBase
from django.utils import timezone

from datetime import datetime


class MarjeticaBelinkaScraper(ScraperBase):
    url = "https://www.marjetice.si/domov-belinka"
    name = 'marjeticabelinka'

    def parser(self, soup) -> list[MenuBase]:
        elements = soup.find_all("p", {"style": "text-align: center;"})
        menuArray = []
        for element in elements:
            date = element.strong
            # check if we have a date
            if date is None:
                continue

            # get the date string and format it into an actual date
            # NOTE: This is a hacky way to remove any spaces from the date string
            dateString = date.string.split(" ")[1::]
            dateString = "".join(dateString)
            date = datetime.strptime(dateString, '%d.%m.%Y').date()

            # if it is todays menu
            if date != datetime.now().date():
                continue

            for dish in element.contents:
                if isinstance(dish, str):
                    menu = MenuBase()
                    menu.dinerName = self.name
                    menu.soupString = ""
                    menu.dishString = dish
                    menuArray.append(menu)

        return menuArray
