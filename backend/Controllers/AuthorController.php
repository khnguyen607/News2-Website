<?php

class AuthorController extends BaseController
{
    private $authorModel;

    public function __construct()
    {
        $this->loadModel('AuthorModel');
        $this->authorModel = new AuthorModel;
    }

    public function index()
    {
        $author = $this->authorModel->getAll();

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($author);
    }

    public function findAuthor()
    {
        $id = $_GET['id'];
        $author = $this->authorModel->findId($id);

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($author);
    }

    public function addAuthor()
    {
        $data = [
            'email'  => $_POST['email'],
            'name'  => $_POST['name'],
            'user'  => $_POST['user'],
            'pass'  => $_POST['pass']
        ];

        if ($this->authorModel->checkuser_name($data['user'])) {
            $this->authorModel->store($data);
            header("Location: ../frontend/admin/author.html");
        } else {
            header("Location: ../frontend/admin/author.html?signupF=" . $data['user']);
        }
    }

    public function editUser()
    {
        $id = $_GET['id'];
        $data = [
            'email'  => $_POST['email'],
            'name'  => $_POST['name']
        ];

        $this->authorModel->edit($id, $data);
        header("Location: ../frontend/dashboard.html?tab=mgr__user");
    }

    public function delAuthor()
    {
        $id = $_GET['id'];
        $data = [
            'status' => '0'
        ];
        $this->authorModel->edit($id, $data);
        header("Location: ../frontend/admin/author.html");
    }

    public function login()
    {
        $data = [
            'user'  => $_POST['user'],
            'pass'  => $_POST['pass']
        ];

        $check = $this->authorModel->isValidUser($data);
        if ($check) {
            header("Location: ../frontend/admin/index.html");
        } else {
            header("Location: ../frontend/admin/login.html?loginF=" . $data['user']);
        }
    }

    public function logout()
    {
        setcookie("author_id", "", time() - 3600, "/");
        header("Location: ../frontend/admin/login.html");
    }

}
