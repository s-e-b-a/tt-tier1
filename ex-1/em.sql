-- MySQL Script generated by MySQL Workbench
-- Sat Apr  2 10:50:42 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Banco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Banco` (
  `idBanco` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idBanco`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Sucursal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Sucursal` (
  `idSucursal` INT NOT NULL AUTO_INCREMENT,
  `idBanco` INT NOT NULL,
  `dirección` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idSucursal`),
  INDEX `idBanco_idx` (`idBanco` ASC) VISIBLE,
  CONSTRAINT `FK_SucursalBanco`
    FOREIGN KEY (`idBanco`)
    REFERENCES `mydb`.`Banco` (`idBanco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `rut` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `fechaNacimiento` DATETIME NOT NULL,
  `hash_password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `rut_UNIQUE` (`rut` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Empleado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Empleado` (
  `idEmpleado` INT NOT NULL AUTO_INCREMENT,
  `idSucursal` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`idEmpleado`),
  INDEX `FK_EmpleadoSucursal_idx` (`idSucursal` ASC) VISIBLE,
  INDEX `FK_EmpleadoUsuario_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `FK_EmpleadoSucursal`
    FOREIGN KEY (`idSucursal`)
    REFERENCES `mydb`.`Sucursal` (`idSucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_EmpleadoUsuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Vigilante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Vigilante` (
  `idVigilante` INT NOT NULL AUTO_INCREMENT,
  `fechaContrato` DATETIME NULL,
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`idVigilante`),
  INDEX `FK_VigilanteUsuario_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `FK_VigilanteUsuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`AsignacionSucursalVigilante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`AsignacionSucursalVigilante` (
  `idSucursal` INT NOT NULL,
  `idVigilante` INT NULL,
  PRIMARY KEY (`idSucursal`),
  INDEX `FK_AsignacionSucursalVigilanteVigilante_idx` (`idVigilante` ASC) VISIBLE,
  UNIQUE INDEX `idSucursal_UNIQUE` (`idSucursal` ASC) VISIBLE,
  CONSTRAINT `FK_AsignacionSucursalVigilanteSucursal`
    FOREIGN KEY (`idSucursal`)
    REFERENCES `mydb`.`Sucursal` (`idSucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_AsignacionSucursalVigilanteVigilante`
    FOREIGN KEY (`idVigilante`)
    REFERENCES `mydb`.`Vigilante` (`idVigilante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Riesgo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Riesgo` (
  `idRiesgo` INT NOT NULL AUTO_INCREMENT,
  `idSucursal` INT NOT NULL,
  `comentario` VARCHAR(45) NULL,
  `isLlamadaCarabineros` TINYINT NULL,
  `fechaRiesgo` DATETIME NULL,
  PRIMARY KEY (`idRiesgo`),
  INDEX `FK_RiesgoAsignacion_idx` (`idSucursal` ASC) VISIBLE,
  CONSTRAINT `FK_RiesgoAsignacion`
    FOREIGN KEY (`idSucursal`)
    REFERENCES `mydb`.`AsignacionSucursalVigilante` (`idSucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`LogAcceso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`LogAcceso` (
  `idLogAcceso` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `fechaAcceso` DATETIME NULL,
  `comentario` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idLogAcceso`),
  INDEX `FK_LogAccesoUsuario_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `FK_LogAccesoUsuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
