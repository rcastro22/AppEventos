export interface DetalleLogin {
    Detalle:            Detalle[];
    Horario:            Horario[];
    Personal:           Personal[];
    PersonalExterno:    PersonalExterno[];
    Galeria:            Galeria[];
    Agenda:             Agenda[];
    ActividadesxSemana: ActividadesxSemana;
}

export interface Detalle {
    Evento: string
    Detalle: string
    Correlativo: string
  }

export interface Horario {
    Dia:         string;
    Dianombre:   string;
    Horaini:     Date;
    Horafin:     Date;
    Torre:       String;
    Salon:       string;
    Correlativo: string;
}

export interface Personal {
    Nombre:      string;
    Puesto:      string;
    Correlativo: string;
    FOTO:        string;    
}

export interface PersonalExterno {
    Evento:         string;
    Id:             string;
    Nombre:         string;
    Descripcion:    string;
    Puesto:         string;
    Codpuesto:      string;
    Perfillinkedin: null;
    Bandera:        null;
    Fotos:          Galeria[];
    RUTA:           Ruta[];
}

export interface Ruta {
    RUTA: string;
}


export interface Galeria {
    IDARCHIVO:    number;
    CONTEO:       number;
    CAJA:         null;
    NOMBREAPP:    string;
    NOMBRECAT:    string;
    APLICACION:   string;
    CATEGORIA:    number;
    NOMBRE:       string;
    USUARIO:      string;
    EXTENSION:    string;
    FECHA:        Date;
    AUTOMATIZADO: number;
    RUTA:         string;
}

export interface Agenda {
    Actividad:       string;
    Descripcion:     string;
    Categoria:       string;
    Horaini:         Date;
    Horafin:         Date;
    Fecha_Actividad: Date;
    Torre:           string;
    Salon:           null;
    Track:           string;
    Titulo:          string;
    Fecha_Ini:       null;
    Fecha_Fin:       null;
    Dia:             null;
    Rangohora:       string;
    Color:           string;
    Activo:          string;
    Fecha_Encuesta:  null;
    HorainiStr:      Date;
    HorafinStr:      Date;
    MesFecha:        number;
    AñoFecha:        number;
    DiaSemana:       number;
    SemanaMes:       number;
}

export interface ActividadesxSemana {
    Actividades: any[];
}