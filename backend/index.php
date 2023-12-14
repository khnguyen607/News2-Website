<?php
require 'Core/Database.php';
require 'Models/BaseModel.php';
require 'Controllers/BaseController.php';

$controllerName = ucfirst($_GET['controller']) . 'Controller';
$action = $_GET['action'] ?? 'index';

require "Controllers/$controllerName.php";

$controllerObj = new $controllerName;
$controllerObj->$action();