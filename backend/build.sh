#!/usr/bin/env bash
# exit on error
set -o errexit

pip install poetry -U
poetry install

python manage.py collectstatic --no-input
python manage.py migrate

#Uncomment this if there is no superuser
#echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('$ADMIN_USERNAME', '$ADMIN_MAIL', '$ADMIN_PASSWORD')" | python manage.py shell
python manage.py crontab add