<?php

class NewController extends BaseController
{
    private $newModel;

    public function __construct()
    {
        $this->loadModel('NewModel');
        $this->newModel = new NewModel;
    }

    public function index()
    {
        $news = $this->newModel->getAll();

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($news);
    }

    public function findNew()
    {
        $id = $_GET['id'];
        $new = $this->newModel->findId($id);
        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($new);
    }

    public function incViews()
    {
        $id = $_GET['id'];
        $this->newModel->Views($id);
    }

    public function addNew()
    {
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);
        $data['author_id'] = $_COOKIE['author_id'];
        if($this->newModel->store($data)){
            header('Content-Type: application/json');
            echo json_encode(True);
        }
    }

    public function editNew()
    {
        $id = $_GET['id'];

        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);
        if( $this->newModel->edit($id, $data)){
            header('Content-Type: application/json');
            echo json_encode(True);
        }
    }

    public function delNew()
    {
        $id = $_GET['id'];
        $data = [
            'status' => '0'
        ];
        $this->newModel->edit($id, $data);
        header("Location: ../frontend/admin/index.html");
    }


}
