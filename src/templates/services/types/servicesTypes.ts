export interface ServicesType {
  id: number;
  pasajero: PasajeroType;
  destino: DestinoType;
  origen: DestinoType;
  novedad: null;
  estadoAssing: StatusList;
  procedimiento: string;
  tipo_ruta: string;
  operador: OperadorType;
  novedades: NovedadesType;
  cliente: ClienteType;
  nDocumentoAcompañante: string;
  nombreAcompañante: string;
  telefonoAcompañante: string;
  observacionesServicio: string;
  pre_autorizacion: string;
  nAutorizacion: string;
  fechaServicio: Date;
  horaRecogida: Date;
  fechaRegistro: Date;
  lote: null;
  detalle: boolean;
  fecha_inicio_autorizacion: Date;
  fecha_fin_autorizacion: Date;
  modified: Date;
  comentario: string;
  is_assing_masive: boolean;
  firma: null;
  latitudeStart: string;
  longitudeStart: string;
  latitudeFinish: string;
  longitudeFinish: string;
  AddressStart: string;
  AddressFinish: string;
  timeInicio: null;
  cierre: null;
  observacionesOperador: null;
  bloqueado: number;
  estadoServicio: number;
  seguimiento: number;
  tipoAtencion: number;
  tipoTrayecto: number;
  tipoProcedimiento: number;
  tipoRuta: number;
  codigoServicio: number;
  tipo_servicio: number;
  documentoAcompañante: number;
  tipoAutorizacion: number;
  conductor: number;
  usuario: number;
  solicitud: number;
}
export type StatusList = 'Liberado' | 'Aceptado' | 'Rechazado';

export interface ClienteType {
  id: number;
  nit: string;
  nombreRazonSocial: string;
  direccion: string;
  telefono: string;
  correo: string;
  estado: number;
  sector: number;
  barrio: number;
}

export interface DestinoType {
  id: number;
  nombre: string;
  direccion: string;
  barrio: BarrioType;
  claseDestino: null;
  descripcion: string;
  pasajero: null;
  tipoDestino: number;
  estado: number;
  aK: null | string;
  latitude: string;
  longitude: string;
}

export interface BarrioType {
  id: number;
  nombre: string;
  Upz: UpzType;
}

export interface UpzType {
  id: number;
  nombre: string;
  Localidad: LocalidadType;
}

export interface LocalidadType {
  id: number;
  nombre: string;
  Ciudad: CiudadType;
}

export interface CiudadType {
  id: number;
  nombre: string;
  Departamento: DepartamentoType;
}

export interface DepartamentoType {
  id: number;
  nombre: string;
  pais: number;
}

export interface NovedadesType {
  novedad: boolean;
  novedad_id: string;
  estado_novedad: string;
  estado_servicio: string;
  pasajero: string;
  origen: string;
  destino: string;
}

export interface OperadorType {
  nombre: string;
  apellido: string;
  telefono: string;
  placa: string;
}

export interface PasajeroType {
  numero_documento: string;
  id: number;
  primer_nombre: string;
  primer_apellido: string;
  telefono_Celular1: string;
  telefono_Celular2: string;
  observaciones: string;
  tipoDocumento: TipoDocumentoType;
  categoria_Pasajero: CategoriaPasajeroType;
  medio: MedioType;
  cliente: ClienteType;
  estado: CategoriaPasajeroType;
  vehiculo: VehiculoType[];
}

export interface CategoriaPasajeroType {
  id: number;
  nombre: string;
}

export interface MedioType {
  id: number;
  nombre: string;
  estado: number;
}

export interface TipoDocumentoType {
  id: number;
  nombre: string;
  sigla: string;
}

export interface VehiculoType {
  id: number;
  nombre: string;
  capacidad: string;
  completo: string;
  estado: number;
}
