from abc import ABC, abstractmethod
import requests
from bs4 import BeautifulSoup


class MenuBase():

    dinerName: str = ""
    soupString: str = ""
    dishString: str = ""

    def __repr__(self):
        return f"{self.dinerName} {self.soupString} {self.dishString}"


class ScraperBase(ABC):

    # it must match a the diners name in the database
    @property
    @abstractmethod
    def name(self):
        pass

    @property
    @abstractmethod
    def url(self):
        pass

    @abstractmethod
    def parser(self, soup: BeautifulSoup) -> list[MenuBase]:
        pass

    def get(self) -> list[MenuBase]:
        # get the site
        req = requests.get(self.url, allow_redirects=False)
        soup = BeautifulSoup(req.content, "html.parser")

        if (req.status_code != 200):
            return None

        # TODO: Maybe define the exception
        try:
            menus = self.parser(soup)
            return menus
        except Exception as e:
            return []
