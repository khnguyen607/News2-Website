<?php

class BaseController{
    const MODEL_FOLDER = 'Models';

    protected function loadModel($modelPath){
        return require self::MODEL_FOLDER . '/' . $modelPath . '.php';
    }
}