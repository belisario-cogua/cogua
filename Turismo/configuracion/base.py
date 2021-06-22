import os
from django.contrib.messages import constants as message_constants
MESSAGE_TAGS = {message_constants.DEBUG: 'debug',
                message_constants.INFO: 'info',
                message_constants.SUCCESS: 'success',
                message_constants.WARNING: 'warning',
                message_constants.ERROR: 'danger',}
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
#por default => os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
#otra alternativa => os.path.dirname(os.path.realpath(os.path.dirname(__file__) + "/.."))
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

#lineas de codigo para llamar a las variables de entorno, es decir a las pssss.
import json
from django.core.exceptions import ImproperlyConfigured

with open(os.path.join(BASE_DIR, 'static/personal/config/config.json')) as config_file:
    config = json.load(config_file)

def get_config(setting, config = config ):
    """Obtenemos la configuracion o falla capturando con ImproperlyConfigured"""
    try:
        return config[setting]
    except KeyError:
        raise ImproperlyConfigured("El atributo {} no es correcto".format(setting))
#fin lineas de codigo para llamar a las variables de entorno, es decir a las pssss.

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'e(ap(#0*o43#5cgyvuz_$+6chi+6)q4z2%#pi&6t=&b&w&i)yl'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'import_export',
    'Apps.deportes',
    'Apps.home',
    'Apps.hoteles',
    'Apps.perfil',
    'Apps.platos',
    'Apps.reservas',
    'Apps.turismos',
    'Apps.usuarios',
    'Apps.publicaciones',
    'bootstrap4',
    'smartfields',
    'widget_tweaks',
    'preventconcurrentlogins',
    'notifications',
]


MIDDLEWARE = [
    'Apps.usuarios.middleware.PruebaMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django_session_timeout.middleware.SessionTimeoutMiddleware',
    'preventconcurrentlogins.middleware.PreventConcurrentLoginsMiddleware',

]
SITE_ID = 1
ROOT_URLCONF = 'Turismo.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'Templates')],
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

WSGI_APPLICATION = 'Turismo.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

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
#para crear el modelo user
AUTH_USER_MODEL = 'usuarios.Usuario'
# lineas para caducar la session de
#SESSION_EXPIRE_SECONDS => caduca la session en segundos desde que el usuario inicia sesion.
SESSION_EXPIRE_SECONDS = 1800
#SESSION_EXPIRE_AFTER_LAST_ACTIVITY => caduca la sesion despues de la ultima actividad mediante el tiempo configurado en SESSION_EXPIRE_SECONDS
SESSION_EXPIRE_AFTER_LAST_ACTIVITY = True
#SESSION_COOKIE_AGE = 30 * 60 # Resultado 5 minutos (Por defecto viene 1209600)
# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'es'

TIME_ZONE = 'America/Guayaquil'

USE_I18N = True

USE_L10N = True

USE_TZ = True



#lineas de configuracion para envio de correo electrino de confirmacion al crear nuevos usuarios
EMAIL_USE_TLS = True 
EMAIL_HOST = 'smtp.gmail.com' 
EMAIL_HOST_USER = 'gad10cogua@gmail.com' 
EMAIL_HOST_PASSWORD = get_config('EMAIL_HOST_PASSWORD') 
EMAIL_PORT = 587
#fin lineas de configuracion para envio de correo electrino de confirmacion al crear nuevos usuarios
