from abc import ABC, abstractmethod


class MenuBase():

    @property
    @abstractmethod
    def dinerName(self):
        pass

    @property
    @abstractmethod
    def soupString(self):
        pass

    @property
    @abstractmethod
    def dishName(self):
        pass


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
    def get(self) -> list[MenuBase]:
        pass
