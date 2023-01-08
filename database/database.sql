-- Script generación BD

-- Tabla grupoInvestigacion
CREATE TABLE grupoInvestigacion (
    id NUMBER,
    descripcion CLOB,
    numIntegrantes NUMBER,
    
    CONSTRAINT grupoInvestigacion_pk PRIMARY KEY (id)
);

-- Tabla investigador
CREATE TABLE investigador (
    numColegiado NUMBER,
    nombre VARCHAR2(50) NOT NULL,
    apellidos VARCHAR2(50),
    correo VARCHAR2(50),
    institucion VARCHAR2(50),
    idGrupo NUMBER,
    CONSTRAINT investigador_pk PRIMARY KEY (numColegiado),
    CONSTRAINT check_num_colegiado
    CHECK (length(to_char(numColegiado)) = 9) 
);

-- Tabla lineaInvestigacion
CREATE TABLE lineaInvestigacion (
    numLinea NUMBER,
    nombre VARCHAR2(100),
    descripcion CLOB,
    numArticulos NUMBER,
    CONSTRAINT lineaInvestigacion_pk PRIMARY KEY (numLinea)
);

-- Tabla revista
CREATE TABLE revista (
    nombre VARCHAR2(50),
    ubicacion VARCHAR2(50),
    director VARCHAR2(50) NOT NULL,
    CONSTRAINT revista_pk PRIMARY KEY (nombre)
);

-- Tabla articulo
CREATE TABLE articulo (
    doi NUMBER,
    titulo VARCHAR2(150),
    fecha DATE,
    resumen CLOB,
    numColegiado number,
    revista VARCHAR2(50),
    numLinea NUMBER,
    CONSTRAINT articulo_pk PRIMARY KEY (doi),
    CONSTRAINT fk1_articulo FOREIGN KEY (numColegiado) REFERENCES investigador(numColegiado),
    CONSTRAINT fk2_articulo FOREIGN KEY (revista) REFERENCES revista(nombre),
    CONSTRAINT fk3_articulo FOREIGN KEY (numLinea) REFERENCES lineaInvestigacion(numLinea)
);

CREATE TABLE audit_articulo (
    accionOcurrida VARCHAR(25),
    fechaAccion DATE,
    nombreUsuario VARCHAR(50)
);
