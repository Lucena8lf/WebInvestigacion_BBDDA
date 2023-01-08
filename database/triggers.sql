-- 1. Disparador de auditoria
CREATE or REPLACE trigger Articulo_Audit
after insert or update or delete on Articulo
for each row
DECLARE
  accion varchar2(25);
BEGIN
  IF INSERTING THEN 
     accion:='Insercion';            
  ELSIF UPDATING THEN 
        accion:='Actualizado';
  ELSE
      accion:='Borrado';
  END IF;
  --
  INSERT INTO audit_articulo (accionOcurrida, fechaAccion, nombreUsuario)
  VALUES(accion, sysdate, user); 
END;

-- Prueba del trigger
UPDATE articulo SET fecha='13-02-1999' WHERE doi=108881;

---------
-- 2. Disparador de seguridad
CREATE or REPLACE trigger Date_Articulo
before insert or update on Articulo
for each row
DECLARE
    date_error EXCEPTION;
BEGIN
    IF :new.Fecha > Sysdate then
         RAISE date_error;
    END IF;
    
    EXCEPTION
    WHEN date_error THEN
        RAISE_APPLICATION_ERROR(-20001, 'La fecha del artículo no puede ser posterior a la actual');
END;

-- Prueba del trigger
UPDATE articulo SET fecha='22-02-2023' WHERE doi=117135; -- Se activará el disparador
UPDATE articulo SET fecha='22-01-2022' WHERE doi=117135; -- NO se activará


---------
-- 3. Disparador que sustituya una restriccion de dominio existente
CREATE or REPLACE trigger DOI_Articulo
before insert or update on Articulo
for each row
DECLARE
    doi_length_error EXCEPTION;
    doi_sintax_error EXCEPTION;
BEGIN
    IF length(to_char(:new.DOI)) > 6 THEN
        RAISE doi_length_error;
    ELSIF to_char(:new.DOI) not like '10%' and to_char(:new.DOI) not like '11%' THEN
        RAISE doi_sintax_error;
    END IF;
    
    
    EXCEPTION
    WHEN doi_length_error THEN
        RAISE_APPLICATION_ERROR(-20002, 'El DOI del artículo debe estar compuesto por 6 dígitos');
    
    WHEN doi_sintax_error THEN
        RAISE_APPLICATION_ERROR(-20002, 'El DOI siempre debe empezar por 10 o por 11');
END;

--Prueba del trigger
UPDATE articulo SET doi=11990001 WHERE doi=117135; -- Se activará el disparador por tener el DOI mas de 6 digitos
UPDATE articulo SET doi=117138 WHERE doi=117135; -- NO se activará el disparador ya que el DOI es correcto
UPDATE articulo SET doi=098812 WHERE doi=117135; -- Se activará el disparador porque el DOI no empieza ni por 10 ni por 11


---------
-- 4. Trigger que sustituye una restricción de integridad existente
CREATE or REPLACE trigger Reference_GrupoInvestigador
before insert or update on Investigador
for each row
DECLARE
    CURSOR c IS SELECT * from GrupoInvestigacion;
    reference_group_error EXCEPTION;
    exist boolean:=false;
BEGIN
    -- Recorremos la tabla de GrupoInvestigacion para ver si tiene el nuevo elemento introducido
    FOR num_row IN c LOOP
        IF num_row.id = :new.idgrupo THEN
            exist := true;
        END IF;
    END LOOP;
    
    IF exist = false THEN
        RAISE reference_group_error;
    END IF;
    
    EXCEPTION
    WHEN reference_group_error THEN
        RAISE_APPLICATION_ERROR(-20002, 'Se debe asignar al investigador un grupo existente');
END;

-- Prueba del trigger
INSERT INTO investigador(numcolegiado, nombre, apellidos, correo, institucion, idgrupo)
VALUES (123456789, 'Antonio', 'Gómez López', 'antonio@gmail.com', 'Universidad Pública', 8); -- Se activará el disparador ya que el ID del grupo no existe

INSERT INTO investigador(numcolegiado, nombre, apellidos, correo, institucion, idgrupo)
VALUES (123456789, 'Antonio', 'Gómez López', 'antonio@gmail.com', 'Universidad Pública', 2); -- NO se activará el disparador ya que el ID del grupo sí existe

---------
-- 5. Disparador en función de la extensión de otra tabla
CREATE or REPLACE trigger GrupoIntegrantes_Count
after insert or update or delete on Investigador
for each row
BEGIN
    -- Al haber insertado en la tabla Investigador se habrá introducido un nuevo investigador
    -- el cual pertencerá a un nuevo grupo. Por lo tanto, a ese nuevo grupo en la tabla
    -- grupoInvestigacion deberemos incrementar en 1 el atributo numIntegrantes
    IF INSERTING THEN
        UPDATE grupoInvestigacion SET numIntegrantes = numIntegrantes + 1
        WHERE :new.idGrupo = id;
        
    ELSIF UPDATING THEN
    -- Si se ha actualizado debemos comprobar si ese investigador ha cambiado de grupo. En caso
    -- afirmativo debemos disminuir el grupo donde estaba antes en 1 e incrementar el grupo nuevo en 1
        IF :old.idGrupo != :new.idGrupo THEN
            UPDATE grupoInvestigacion SET numIntegrantes = numIntegrantes - 1
            WHERE :old.idGrupo = id;
            
            UPDATE grupoInvestigacion SET numIntegrantes = numIntegrantes + 1
            WHERE :new.idGrupo = id;
    
        END IF;
    
    ELSE
    -- Si se ha borrado solo disminuimos el numero de integrantes del grupo en el que estaba en 1
    UPDATE grupoInvestigacion SET numIntegrantes = numIntegrantes - 1
    WHERE :old.idGrupo = id;
    
    END IF;
END;

-- Prueba del trigger
INSERT INTO investigador(numcolegiado, nombre, apellidos, correo, institucion, idgrupo)
VALUES (123456311, 'Antonio', 'Gómez López', 'antonio@gmail.com', 'Universidad Pública', 5); -- El disparador se activará incrementando el numero de integrantes del grupo 5 en 1

SELECT * FROM grupoInvestigacion;

UPDATE investigador SET idGrupo = 4 WHERE numcolegiado=123456311; -- El disparador se activará disminuyendo el numero de integrantes del grupo 5 en 1 e incrementando el grupo 4 en 1

UPDATE investigador SET nombre='Juanjo' WHERE numcolegiado=123456311; -- El disparador NO se activará ya que no ha cambiado de grupo

DELETE FROM investigador WHERE numcolegiado=123456311;  -- El disparador se activará disminuyendo el numero de integrantes del grupo 5 en 1