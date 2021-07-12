#archivo creado manualmente
from django import forms
from .models import Imagehome

class ImagehomeForm(forms.ModelForm):
	class Meta:
		model = Imagehome
		fields = ['imagen']
