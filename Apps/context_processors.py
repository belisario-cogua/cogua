from Apps.reservas.models import ReservaHotel, ReservaDeporte, ReservaPlato, ReservaTurismo
from datetime import date, datetime 
#nota: para que estas variables se puedan agregar a todos los remplates se debe agregar en la seccion de TEMPLATES de settings.py
#contextos para validar si existen reservas
reserva_deportes = ReservaDeporte.objects.all()
reserva_hoteles = ReservaHotel.objects.all()
reserva_platos = ReservaPlato.objects.all()
reserva_turismos = ReservaTurismo.objects.all()
#contexto para agregar el total de solicitudes en la opcion solicitudes del perfil admin
fecha_actual = datetime.today()
modelo1 = ReservaDeporte.objects.filter(fecha_inicial__gte = fecha_actual).count()
modelo2 = ReservaTurismo.objects.filter(fecha_inicial__gte = fecha_actual).count()
modelo3 = ReservaPlato.objects.filter(fecha_inicial__gte = fecha_actual).count()
modelo4 = ReservaHotel.objects.filter(fecha_inicial__gte = fecha_actual).count()
contexto = modelo1 + modelo2 + modelo3 + modelo4
def data_templates(request):
     
    return {
    	#contextos para validar si existen reservas
    	'reserva_deportes': reserva_deportes,
    	'reserva_hoteles': reserva_hoteles,
    	'reserva_platos': reserva_platos,
    	'reserva_turismos': reserva_turismos,
    	#contexto para agregar el total de solicitudes en la opcion solicitudes del perfil admin
        'reservas_vigentes': contexto
    } 