from django.shortcuts import render
from users.models import User

def game(request):
	context = {
		'userId' : request.user.pk
	}
	return render(request, "game.html", context)