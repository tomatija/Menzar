from .baseScraper import ScraperBase, MenuBase
from django.utils import timezone


class MarjeticaBelinkaScraper(ScraperBase):
    url = "https://www.marjetice.si/domov-belinka"
    name = 'marjetica'

    def parser(self, soup) -> list[MenuBase]:
        elements = soup.find_all("p", {"style": "text-align: center;"})
        day = int(timezone.now().date())
        month = int(timezone.now().date())
        year = int(timezone.now().date())
        currentDate = f"{day}.{month}.{year}"
        menuArray = []
        for element in elements:

            menuDate = ""
            if str(element.strong) != 'None':
                menuDate = str(element.strong.text).split(" ")[1]
            else:
                continue
            print(str(menuDate), currentDate, str(menuDate) == currentDate)
            if str(menuDate) == currentDate:
                print("IT is", element.text)
                continue
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
