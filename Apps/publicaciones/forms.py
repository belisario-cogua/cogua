#archivo creado manualmente
from django import forms
from .models import Publicacion

class PublicacionForm(forms.ModelForm):
	class Meta:
		model = Publicacion
		fields = ['nombre','descripcion','imagen']
		widgets = {
			'nombre': forms.TextInput(
				attrs = {
					'class': 'form-control',
					'autocomplete': "off",
					'onfocus': "this.placeholder = ''",
					'onblur': "this.placeholder='Ingresar un nombre para el Plato Tipico'",
					'placeholder': 'Ingresar un nombre para el Plato Tipico',
					'id': 'nombre'
				}
			),
			'descripcion': forms.Textarea(
				attrs = {
					'class': 'form-control',
					'onfocus': "this.placeholder = ''",
					'onblur': "this.placeholder='Ingresar una descripcion para el Plato Tipico'",
					'placeholder': 'Ingresar una descripcion para el Plato Tipico',
					'rows': 6,
					'cols': 30
				}
			)

		}
