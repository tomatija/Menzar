from django.http import HttpResponse
from menzaBase.models import MENZA_IDs


def indexView(request):
    menzas = [MENZA_IDs[key] for key in MENZA_IDs]
    menzaurls = []
    for menza in menzas:
        menzaurls.append(f"<a href='/menze/{menza}'><h1>{menza}</h1></a>")

    return HttpResponse("<br>".join(menzaurls))


def roznakuhnaView(request):
    return HttpResponse("Smo v odlični gostilni, znani po imenu Rožna Kuhna.")


def marjeticaView(request):
    return HttpResponse("Smo v odlični gostilni, znani po imenu Marjetica.")
