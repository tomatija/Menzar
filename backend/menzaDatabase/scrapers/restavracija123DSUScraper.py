import requests
from bs4 import BeautifulSoup
from .baseScraper import MenuBase, ScraperBase

from django.utils import timezone


class Restavracija123DSUScraper(ScraperBase):

    date = timezone.now().date()
    strDate = date.strftime("%Y-%m-%d")
    url = f"https://www.restavracija123.si/api/getDailyMenu/4697/{strDate}/"
    name = 'restavracija123DSU'
    display_name = "Restavracija 123 - DSU"

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36'
    }

    def parser(self, soup: BeautifulSoup) -> list[MenuBase]:
        pass

    def get(self) -> list[MenuBase]:
        # get the site
        req = requests.get(self.url, headers=self.headers,
                           allow_redirects=False)

        if (req.status_code != 200):
            return []

        try:
            json = req.json()
            dinerMenus = []
            for submenugroup in json:
                if submenugroup not in ["ocvrto", "solate", "zar"]:
                    for dish in json[submenugroup]:
                        dishName = dish.get("title", "")
                        if dishName == "":
                            continue
                        dinerMenus.append(dishName)

            finalMenus = []
            for dish in dinerMenus:
                menu = MenuBase()
                menu.dishString = dish
                menu.soupString = ""
                menu.dinerName = self.name

                finalMenus.append(menu)

            return finalMenus

        except Exception as e:
            print("Error while parsing menus:", e)
            return []
