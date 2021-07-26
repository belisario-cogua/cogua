//url perfil admin
Mousetrap.bind(['alt+a'], function() {
  window.open("/admin/","_self")
  return false;
});
//url perfil
Mousetrap.bind(['p'], function() {
  window.open("/perfil/","_self")
  return false;
});
//url psolicitudes
Mousetrap.bind(['s'], function() {
  window.open("/perfil_admin/solicitudes/reservas/","_self")
  return false;
});
//url administracion usuarios
Mousetrap.bind(['a u'], function() {
  window.open("/perfil_admin/usuarios/","_self")
  return false;
});
//url administracion cabañas
Mousetrap.bind(['a c'], function() {
  window.open("/perfil_admin/cabañas/","_self")
  return false;
});
//url administracion deportes
Mousetrap.bind(['a d'], function() {
  window.open("/perfil_admin/deportes/","_self")
  return false;
});
//url administracion turismos
Mousetrap.bind(['a l'], function() {
  window.open("/perfil_admin/turismos/","_self")
  return false;
});
//url administracion platos
Mousetrap.bind(['a t'], function() {
  window.open("/perfil_admin/platos/","_self")
  return false;
});
//url administracion publicaciones
Mousetrap.bind(['a p'], function() {
  window.open("/perfil_admin/publicaciones/","_self")
  return false;
});
//url reservaciones cabañas
Mousetrap.bind(['r c'], function() {
  window.open("/perfil_admin/reservas/hoteles/","_self")
  return false;
});
//url reservaciones deportes
Mousetrap.bind(['r d'], function() {
  window.open("/perfil_admin/reservas/deportes/","_self")
  return false;
});
//url reservaciones lugares
Mousetrap.bind(['r l'], function() {
  window.open("/perfil_admin/reservas/turismos/","_self")
  return false;
});
//url reservaciones platos
Mousetrap.bind(['r t'], function() {
  window.open("/perfil_admin/reservas/platos/","_self")
  return false;
});
//url pagina cabañas
Mousetrap.bind(['c'], function() {
  window.open("/listado-cabañas-disponibles/","_self")
  return false;
});
//url pagina deportes
Mousetrap.bind(['d'], function() {
  window.open("/listado-deportes-disponibles/","_self")
  return false;
});
//url pagina platos
Mousetrap.bind(['t'], function() {
  window.open("/listado-platos-tipicos-disponibles/","_self")
  return false;
});
//url pagina lugares
Mousetrap.bind(['l'], function() {
  window.open("/listado-lugares-turisticos-disponibles/","_self")
  return false;
});
//url pagina home
Mousetrap.bind(['h'], function() {
  window.open("/","_self")
  return false;
});

//buscar en perfil
Mousetrap.bind(['b'], function() {
  $("#search").show();
  $("#search").focus();
  return false;
});
