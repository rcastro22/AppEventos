export interface CarritoRoot {
    Carrito: Carrito[]
    Asignados: number
  }
  
  export interface Carrito {
    Evento: string
    Carrera: string
    Descripcion: string
    Codmovto: any
    Precio: string
    Horario: string
    Diploma: string
    Fechaini: string
    Fechafin: string
    Tituloevento: string
    Status: string
    Codigo: string
    Descuento: string
    Total: string
    Ordendepago: any
    Categoria: string
    Perfil: string
    Reqdescuento: string
    Pagos: string
    Cursolibre: string
    Existe_Descuento: string
    Asignarportrack: string
    Mensaje_Previopago: any
    Tipo_Donacion: string
    No_Quitarcarrito: string
    No_Procederpago: string
    Asignar_Actividades: string
    Administrador_Evento: string
    No_Aplicardescuento: string
    Desc_Coddescuento: string
    Mostrar_Desdescuento: string
  }
  