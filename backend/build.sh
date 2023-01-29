#!/usr/bin/env bash
# exit on error
set -o errexit

pip install poetry -U
poetry install

python manage.py collectstatic --no-input
python manage.py migrate