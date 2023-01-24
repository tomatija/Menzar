from django.db import models


class Order(models.Model):
    orderID = models.AutoField(primary_key=True)
    menzaName = models.CharField(max_length=100)
    orderDate = models.DateTimeField()
    orderName = models.CharField(max_length=100)
    orderPrice = models.DecimalField(max_digits=5, decimal_places=2)
    orderUserID = models.CharField(max_length=20)
    # orderMenu = models.ForeignKey(MenzaDateMeniBase, on_delete=models.CASCADE)
    studentBon = models.BooleanField()

    def __str__(self):
        return self.orderString
