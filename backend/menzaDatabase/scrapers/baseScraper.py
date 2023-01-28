from abc import ABC, abstractmethod


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
    def get(self):
        pass
