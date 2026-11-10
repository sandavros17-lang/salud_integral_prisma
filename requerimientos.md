Entidades

1 Especialidad: Catálogo de especialidades médicas disponibles en la clínica.														
                                                        
2 Medico: Profesionales de la salud vinculados a la clínica.														
                                                        
3 Paciente: Personas que reciben los servicios médicos.														
                                                        
4 Cita: Registro de programación y agendamiento de citas médicas.														
                                                        
5 HistoriaClinica: Registro médico de la atención brindada durante una consulta.														
                                                        
6 Factura: Control financiero y de cobros asociado a las atenciones o citas														


2. Atributos de cada Entidad		
        
1. Especialidad		
        
Nombre Atributo	Tipo de Dato	Notas
id	Int / UUID	[PK], Obligatorio
nombre	String	Único, Obligatorio
descripcion	String	Opcional
        
2. Médico		
        
Nombre Atributo	Tipo de Dato	Notas
id	Int / UUID	[PK], Obligatorio
documentoIdentidad	String	Único, Obligatorio (Cédula)
nombre	String	Obligatorio
apellido	String	Obligatorio
correo	String	Único, Obligatorio
telefono	String	Obligatorio
especialidadId	Int / UUID	[FK] (Especialidad), Obligatorio
estado	Boolean / Enum	Obligatorio (Activo / Inactivo)
        
3. Paciente		
        
Nombre Atributo	Tipo de Dato	Notas
id	Int / UUID	[PK], Obligatorio
documentoIdentidad	String	Único, Obligatorio
nombre	String	Obligatorio
apellido	String	Obligatorio
fechaNacimiento	DateTime	Obligatorio
telefono	String	Obligatorio
direccion	String	Obligatorio
correo	String	Único, Obligatorio
        
4. Cita		
        
Nombre Atributo	Tipo de Dato	Notas
id	Int / UUID	[PK], Obligatorio
fechaHora	DateTime	Obligatorio
estado	String / Enum	Obligatorio (Programada, Atendida, Cancelada)
motivo	String	Obligatorio
pacienteId	Int / UUID	[FK] (Paciente), Obligatorio
medicoId	Int / UUID	[FK] (Médico), Obligatorio
        
5. HistoriaClinica		
        
Nombre Atributo	Tipo de Dato	Notas
id	Int / UUID	[PK], Obligatorio
fechaCreacion	DateTime	Obligatorio
diagnostico	String	Obligatorio
tratamiento	String	Obligatorio
observaciones	String	Opcional
citaId	Int / UUID	[FK] (Cita), Único, Obligatorio
pacienteId	Int / UUID	[FK] (Paciente), Obligatorio
medicoId	Int / UUID	[FK] (Médico), Obligatorio
        
6. Factura		
        
Nombre Atributo	Tipo de Dato	Notas
id	Int / UUID	[PK], Obligatorio
fechaEmision	DateTime	Obligatorio
valorTotal	Decimal / Float	Obligatorio
estado	String / Enum	Obligatorio (Pendiente, Pagada, Anulada)
citaId	Int / UUID	[FK] (Cita), Único, Obligatorio


3. Relaciones entre Entidades

Especialidad y Medico: Una Especialidad puede tener muchos Médicos, pero un Médico pertenece a una sola Especialidad.

Medico y Cita: Un Medico puede tener muchas Citas, pero una Cita pertenece a un solo Medico.

Paciente y Cita: Un Paciente puede tener muchas Citas, pero una Cita pertenece a un solo Paciente.

Cita y HistoriaClinica: Una Cita puede tener una sola HistoriaClinica, y una HistoriaClinica pertenece a una sola Cita.

Paciente y HistoriaClinica: Un Paciente puede tener muchas HistoriasClinicas, pero una HistoriaClinica pertenece a un solo Paciente.

Medico y HistoriaClinica: Un Medico puede redactar muchas HistoriasClinicas, pero una HistoriaClinica es registrada por un solo Médico.

Cita y Factura: Una Cita puede generar una sola Factura, y una Factura corresponde a una sola Cita.
