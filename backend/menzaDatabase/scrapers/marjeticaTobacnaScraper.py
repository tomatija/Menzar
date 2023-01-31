from .baseScraper import ScraperBase, MenuBase
from django.utils import timezone


class MarjeticaTobacnaScraper(ScraperBase):
    url = "https://www.marjetice.si/"
    name = 'marjetica'

    def parser(self, soup) -> list[MenuBase]:
        elements = soup.find_all("p", {"style": "text-align: center;"})
        currentDate = timezone.now().date().strftime("%d.%m.%Y")

        menuArray = []
        for element in elements:
            # choices are split by <br> tag
            choices = element.split("<br/>")

            menuDate = element.find("strong").text.split(" ")[1]

            if menuDate == currentDate:

                menuArray = [e for e in str(element).split("<br/>")]
                menuArray = menuArray[1::]
                menuArray[-1] = menuArray[-1].replace("</p>", "")
                print(menuArray)
                menu = MenuBase()
                menu.dinerName = self.name
                menu.soupString = ""  # soup choices are not available

                for choice in choices[1::]:
                    menu.dishName = choice
                    menuArray.append(menu)

        return menuArray
