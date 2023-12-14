<?php

class CategoryController extends BaseController
{
    private $categoryModel;

    public function __construct()
    {
        $this->loadModel('CategoryModel');
        $this->categoryModel = new CategoryModel;
    }

    public function index()
    {
        $rooms = $this->categoryModel->getAll();

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($rooms);
    }

    public function addCategory()
    {
        $data = [
            'name' => $_POST['name']
        ];

        $this->categoryModel->store($data);
        header("Location: ../frontend/admin/index.html");
    }

    public function delCategory()
    {
        $id = $_GET['id'];
        $data = [
            'status' => '0'
        ];
        $this->categoryModel->edit($id, $data);
        header("Location: ../frontend/admin/index.html");
    }


}
