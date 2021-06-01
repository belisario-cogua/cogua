"""
WSGI config for Turismo project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

#por default=> os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Turismo.settings')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Turismo.configuracion.produccion')

application = get_wsgi_application()
