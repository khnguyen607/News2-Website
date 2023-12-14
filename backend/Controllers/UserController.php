<?php

class UserController extends BaseController
{
    private $userModel;

    public function __construct()
    {
        $this->loadModel('UserModel');
        $this->userModel = new UserModel;
    }

    public function index()
    {
        $users = $this->userModel->getAll();

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($users);
    }

    public function findUser()
    {
        $id = $_GET['id'];
        $user = $this->userModel->findId($id);

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($user);
    }

    public function addUser()
    {
        $data = [
            'email'  => $_POST['email'],
            'name'  => $_POST['name'],
            'user'  => $_POST['user'],
            'pass'  => $_POST['pass']
        ];

        if ($this->userModel->checkuser_name($data['user'])) {
            $this->userModel->store($data);
            header("Location: ../frontend/login.html?signupT=" . $data['user']);
        } else {
            header("Location: ../frontend/register.html?signupF=" . $data['name']);
        }
    }

    public function delUser()
    {
        $id = $_GET['id'];
        $data = [
            'status' => '0'
        ];
        $this->userModel->edit($id, $data);
        header("Location: ../frontend/admin/user.html");
    }

    public function login()
    {
        $data = [
            'user'  => $_POST['user'],
            'pass'  => $_POST['pass']
        ];

        $check = $this->userModel->isValidUser($data);
        if ($check) {
            header("Location: ../frontend/index.html");
        } else {
            header("Location: ../frontend/login.html?loginF=" . $data['user']);
        }
    }

    public function logout()
    {
        setcookie("user_id", "", time() - 3600, "/");
        header("Location: ../frontend/index.html");
    }

}
