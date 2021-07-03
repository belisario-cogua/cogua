#archivo creado manualmente
from django import forms
from .models import Hotel

class HotelForm(forms.ModelForm):
	class Meta:
		model = Hotel
		fields = ['nombre','precio','descripcion','publico','imagen']
		widgets = {
			'nombre': forms.TextInput(
				attrs = {
					'class': 'form-control',
					'autocomplete': "off",
					'onfocus': "this.placeholder = ''",
					'onblur': "this.placeholder='Ingresar un nombre para la cabaña'",
					'placeholder': 'Ingresar un nombre para la cabaña',
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
					'onblur': "this.placeholder='Ingresar una descripcion para la cabaña'",
					'placeholder': 'Ingresar una descripcion para la cabaña',
					'rows': 6,
					'cols': 30
				}
			),
			'publico': forms.CheckboxInput(
				attrs={
				'class':"form-check-input",
				'type':"checkbox", 
				'style':'width:20px;height:20px;margin-left:15px;cursor:pointer'
				})

		}
