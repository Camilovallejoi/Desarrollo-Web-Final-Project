-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 30-05-2024 a las 13:59:54
-- Versión del servidor: 5.7.39
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mi-base-datos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comics`
--

CREATE TABLE `comics` (
  `id` int(11) NOT NULL,
  `nombre` varchar(300) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `precio` varchar(255) NOT NULL,
  `imagen` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comics`
--

INSERT INTO `comics` (`id`, `nombre`, `descripcion`, `precio`, `imagen`) VALUES
(12, 'comic 2', 'Descripcion comic 2', '20000', 'uploads/1716387262505.png'),
(13, 'comic nuevo', 'nuevo', '10000', 'uploads/1717077104800.jpeg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comics`
--
ALTER TABLE `comics`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comics`
--
ALTER TABLE `comics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
