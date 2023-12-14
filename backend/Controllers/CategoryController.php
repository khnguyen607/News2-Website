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

    public function findNew()
    {
        $id = $_GET['id'];
        $room = $this->categoryModel->findId($id);
        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($room);
    }

    public function addRoom()
    {
        $data = [
            'name'      => $_POST['name'],
            'location'  => $_POST['location'],
            'img'       => $_POST['img'],
            'capacity'  => $_POST['capacity'],
            'utility'   => $_POST['utility']
        ];

        $this->categoryModel->store($data);
        header("Location: ../frontend/dashboard.html?tab=mgr__room");
    }

    public function editRoom()
    {
        $id = $_GET['id'];
        $data = [
            'name'      => $_POST['name'],
            'location'  => $_POST['location'],
            'img'       => $_POST['img'],
            'capacity'  => $_POST['capacity'],
            'utility'   => $_POST['utility']
        ];

        $this->categoryModel->edit($id, $data);

        header("Location: ../frontend/dashboard.html?tab=mgr__room");
    }

    public function delRoom()
    {
        $id = $_GET['id'];
        $data = [
            'status' => '0'
        ];
        $this->categoryModel->edit($id, $data);
        header("Location: ../frontend/dashboard.html?tab=mgr__room");
    }


}
