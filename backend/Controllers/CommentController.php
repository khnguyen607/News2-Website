<?php

class CommentController extends BaseController
{
    private $commentModel;

    public function __construct()
    {
        $this->loadModel('CommentModel');
        $this->commentModel = new CommentModel;
    }

    public function index()
    {
        $news = $this->commentModel->getAll();

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($news);
    }

    public function getinNew()
    {
        $id = $_GET['id'];
        $new = $this->commentModel->inNew($id);
        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($new);
    }

    public function addComment()
    {
        $data = [
            'content'      => $_POST['content'],
            'user_id'  => $_COOKIE['user_id'],
            'new_id'       => $_GET['new_id']
        ];
        $this->commentModel->store($data);
        header("Location: ../frontend/new.html?id=".$_GET['new_id']);
    }

    public function delCmt()
    {
        $id = $_GET['id'];
        $data = [
            'status' => '0'
        ];
        $this->commentModel->edit($id, $data);
        header("Location: ../frontend/admin/comment.html");
    }

}
