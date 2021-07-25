from Turismo.configuracion.base import *

DEBUG = True

ALLOWED_HOSTS = ['74.207.224.109','192.168.193.240','coguabelisarioquevedo.com','www.coguabelisarioquevedo.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'turcoguabelisario',
        'USER': 'coguabelisarioquevedo',
        'PASSWORD': 'belisario172coguatursetecientos',
        'PORT': '5432',
        'HOST': 'localhost',
    }
}

FILE_UPLOAD_MAX_MEMORY_SIZE = 200000000

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
)

STATIC_ROOT = os.path.join(BASE_DIR, "live-static", "static-root")

MEDIA_URL = "/media/"

MEDIA_ROOT = os.path.join(BASE_DIR, "live-static", "media-root")

#lineas de configuracion para envio de correo electrino de confirmacion al crear nuevos usuarios
EMAIL_USE_TLS = True 
EMAIL_HOST = 'smtp.gmail.com' 
EMAIL_HOST_USER = 'gad10cogua@gmail.com' 
EMAIL_HOST_PASSWORD = get_config('EMAIL_HOST_PASSWORD') 
EMAIL_PORT = 587
#fin lineas de configuracion para envio de correo electrino de confirmacion al crear nuevos usuarios
DJANGO_NOTIFICATIONS_CONFIG = {
      'USE_JSONFIELD': True,
}