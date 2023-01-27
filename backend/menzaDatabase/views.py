from django.http import HttpResponse


def indexView(request):
    return HttpResponse("<br>".join(["<h1>Index</h1>", "This is the index page"]))
