// Servidor

// Rutas para Movil
// const url_server = "https://betaeventos.galileo.edu:8081";     // BETA
const url_server = "https://betaeventos.galileo.edu";                // PRODUCCION

// Rutas para Computadora
// const url_server_prxy = "/proxyapibeta";                       // BETA
 const url_server_prxy = "/proxyapi";                             // PRODUCCION

// Rutas
export const url_services = url_server + '/api/';
export const url_images = url_server;

export const url_services_proxy = url_server_prxy + "/api/";
