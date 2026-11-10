-- CreateTable
CREATE TABLE "especialidades" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "especialidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicos" (
    "id" SERIAL NOT NULL,
    "documentoIdentidad" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "especialidadId" INTEGER NOT NULL,

    CONSTRAINT "medicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" SERIAL NOT NULL,
    "documentoIdentidad" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "correo" TEXT NOT NULL,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "citas" (
    "id" SERIAL NOT NULL,
    "fechaHora" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PROGRAMADA',
    "motivo" TEXT NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "medicoId" INTEGER NOT NULL,

    CONSTRAINT "citas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historias_clinicas" (
    "id" SERIAL NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diagnostico" TEXT NOT NULL,
    "tratamiento" TEXT NOT NULL,
    "observaciones" TEXT,
    "citaId" INTEGER NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "medicoId" INTEGER NOT NULL,

    CONSTRAINT "historias_clinicas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facturas" (
    "id" SERIAL NOT NULL,
    "fechaEmision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valorTotal" DECIMAL(10,2) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "citaId" INTEGER NOT NULL,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "especialidades_nombre_key" ON "especialidades"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_documentoIdentidad_key" ON "medicos"("documentoIdentidad");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_correo_key" ON "medicos"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_documentoIdentidad_key" ON "pacientes"("documentoIdentidad");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_correo_key" ON "pacientes"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "historias_clinicas_citaId_key" ON "historias_clinicas"("citaId");

-- CreateIndex
CREATE UNIQUE INDEX "facturas_citaId_key" ON "facturas"("citaId");

-- AddForeignKey
ALTER TABLE "medicos" ADD CONSTRAINT "medicos_especialidadId_fkey" FOREIGN KEY ("especialidadId") REFERENCES "especialidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "medicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historias_clinicas" ADD CONSTRAINT "historias_clinicas_citaId_fkey" FOREIGN KEY ("citaId") REFERENCES "citas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historias_clinicas" ADD CONSTRAINT "historias_clinicas_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historias_clinicas" ADD CONSTRAINT "historias_clinicas_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "medicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_citaId_fkey" FOREIGN KEY ("citaId") REFERENCES "citas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
