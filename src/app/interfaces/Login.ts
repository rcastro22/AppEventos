export interface Login {
    Perfil: Perfil[];
}

export interface Perfil {
    Email:                   string;
    Idemail:                 string;
    Tiporeceptor:            string;
    RazonSocial:             string;
    Nombres:                 string;
    Apellidos:               string;
    Telefono:                string;
    Nacionalidad:            string;
    Dpi:                     string;
    Pasaporte:              string;
    Fechanac:                Date;
    Pas_Pais:                string;
    Lugar_Trabajo:           string;
    Puesto:                  string;
    Telefono_Trabajo:        string;
    Compartir:               string;
    Cambiardocumento:        string;
    Dpi_Pais:                string;
    Desctitulo:              string;
    Descinstitucion:         string;
    Direccion:               string;
    Aniograd:                string;
    Edocivil:                string;
    Sexo:                    string;
    Id_Galileo:              string;
    Idfoto:                  string;
    Nit:                     string;
    Correo_Verificado:       string;
    Como_Conocio:            string;
    ConsumidorFinalCheck:    string;
    ConsumidorFinalDisabled: string;
    EsMenor:                 boolean;
}