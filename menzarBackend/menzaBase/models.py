from django.db import models

MENZA_IDs = {
    1: "roznakuhna",
    2: "marjetica",
}


class MenzaDateBase(models.Model):
    date = models.DateField()


class MenzaDateMeniBase(models.Model):
    menzaDateID = models.ForeignKey(MenzaDateBase, on_delete=models.CASCADE)
    meniString = models.CharField(max_length=500)


class RoznaKuhnaDateMeni(MenzaDateMeniBase):
    menzaID = models.IntegerField(default=1)


class MarjeticaDateMeni(MenzaDateMeniBase):
    menzaID = models.IntegerField(default=2)
