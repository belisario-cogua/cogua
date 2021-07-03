#archivo creado manualmente
from django import forms
from .models import Plato

class PlatoForm(forms.ModelForm):
	class Meta:
		model = Plato
		fields = ['nombre','precio','descripcion','cantidad','publico','imagen']
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
			'precio': forms.NumberInput(
				attrs = {
					'class': 'form-control',
					'autocomplete': "off",
					'step': 'any',
					'min':"1",
					'onkeypress':'return event.charCode >= 46 && event.charCode <= 57 ',
					'onfocus': "this.placeholder = ''",
					'onblur': "this.placeholder='$'",
					'placeholder': '$'
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
			),
			'cantidad': forms.NumberInput(
				attrs = {
					'class': 'form-control',
					'autocomplete': "off",
					'min':"1",
					'onkeypress':'return event.charCode >= 48 && event.charCode <= 57',
					'onfocus': "this.placeholder = ''",
					'onblur': "this.placeholder='Ingresar una descripcion para el lugar turistico'",
					'placeholder': 'Ingresar una descripcion para el lugar turistico'
				}
			),
			'publico': forms.CheckboxInput(
				attrs={
				'class':"form-check-input",
				'type':"checkbox",
				'style':'width:20px;height:20px;margin-left:15px;cursor:pointer'
				})

		}
