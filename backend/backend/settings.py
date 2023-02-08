"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import os
import dj_database_url
from menzaDatabase.scrapers.scrapers import Scrapers
from menzaDatabase.scrapers.marjeticaBelinkaScraper import MarjeticaBelinkaScraper
from menzaDatabase.scrapers.marjeticaTobacnaScraper import MarjeticaTobacnaScraper
from menzaDatabase.scrapers.roznakuhnaScraper import RoznaKuhnaScraper
from menzaDatabase.scrapers.menzaBFScraper import MenzaBFScraper
from menzaDatabase.scrapers.menzaIJSScraper import MenzaIJSScraper
from menzaDatabase.scrapers.menzaPFScraper import MenzaPFScraper
from menzaDatabase.scrapers.menzaFEScraper import MenzaFEScraper
from menzaDatabase.scrapers.dijaskiDomVicScraper import DijaskiDomVicScraper

DINER_SCRAPERS = Scrapers()
DINER_SCRAPERS.registerScraper(MarjeticaTobacnaScraper())
DINER_SCRAPERS.registerScraper(MarjeticaBelinkaScraper())
DINER_SCRAPERS.registerScraper(MenzaBFScraper())
DINER_SCRAPERS.registerScraper(RoznaKuhnaScraper())
DINER_SCRAPERS.registerScraper(DijaskiDomVicScraper())
DINER_SCRAPERS.registerScraper(MenzaIJSScraper())
DINER_SCRAPERS.registerScraper(MenzaPFScraper())
DINER_SCRAPERS.registerScraper(MenzaFEScraper())


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-5!o3+^w*(+4zb_v_qk0fkg_q&$)b+c93b@lcdq+l&zz-1tmh@&'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = 'RENDER' not in os.environ

# https://docs.djangoproject.com/en/3.0/ref/settings/#allowed-hosts

BACKEND_URL = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
FRONTEND_URL = os.environ.get('FRONTEND_URL')

# TODO: REMOVE THIS '*' ALLOWED HOSTS
ALLOWED_HOSTS = ['*']
CORS_ALLOWED_ORIGINS = ['*']

# CORS_ALLOWED_ORIGINS = [
#    'http://localhost:3000',
#    'https://mojamenza.onrender.com'
# ]
if FRONTEND_URL:
    CORS_ALLOWED_ORIGINS.append(FRONTEND_URL)
if DEBUG:
    ALLOWED_HOSTS.append('[::1]')

CRONJOBS = [
    ('*/1 * * * *', 'menzaDatabase.cron.my_scheduled_job')
]

# Application definition

INSTALLED_APPS = [
    'menzaDatabase.apps.MenzadatabaseConfig',
    'django_crontab',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework.authtoken',
    'djoser',
]

# configure DRF
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}

DJOSER = {
    "USER_ID_FIELD": "username"
}

MIDDLEWARE = [
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = dict()
if DEBUG == True:
    DATABASES["default"] = {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
else:
    DATABASES["default"] = dj_database_url.config(
        # Feel free to alter this value to suit your needs.
        default='postgresql://postgres:postgres@localhost:5432/mysite',
        conn_max_age=600
    )


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True
TIME_ZONE = 'Europe/Berlin'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

# This setting tells Django at which URL static files are going to be served to the user.
# Here, they well be accessible at your-domain.onrender.com/static/...
STATIC_URL = '/static/'

# Following settings only make sense on production and may break development environments.
if not DEBUG:
    # Tell Django to copy statics to the `staticfiles` directory
    # in your application directory on Render.
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

    # Turn on WhiteNoise storage backend that takes care of compressing static files
    # and creating unique names for each version so they can safely be cached forever.
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
