<?php

class AuthorModel extends BaseModel
{
    const TABLE = 'author';

    // ---CÁC PHƯƠNG THỨC CƠ BẢN--- 
    public function getAll($select = ['*'])
    {
        return $this->all(self::TABLE, $select);
    }
    public function findId($id)
    {
        return $this->find(self::TABLE, $id);
    }
    public function edit($id, $data)
    {
        return $this->update(self::TABLE, $id, $data);
    }
    public function delM($id)
    {
        return $this->delete(self::TABLE, $id);
    }

    // ---CÁC PHƯƠNG THỨC BỔ SUNG---
    // Phương thức để thiết lập mật khẩu
    private function setPassword($password)
    {
        return password_hash($password, PASSWORD_BCRYPT);
    }

    // Phương thức để kiểm tra mật khẩu
    public function checkPassword($pass, $decodePass)
    {
        return password_verify($pass, $decodePass);
    }

    // thêm tài khoản mới 
    public function store($data)
    {
        $data['pass'] = $this->setPassword($data['pass']);
        return $this->create(self::TABLE, $data);
    }

    // Kiểm tra username tồn tại hay chưa
    public function checkuser_name($user)
    {
        $table = self::TABLE;
        $sql = "SELECT `user` FROM `$table` WHERE user = '$user'";
        $check = mysqli_fetch_assoc($this->_query($sql));
        return (isset($check) ? False : True);
    }

    // Kiểm tra tính hợp lệ tài khoản
    public function isValidUser($data)
    {
        $user = $data['user'];
        $pass = $data['pass'];

        $table = self::TABLE;
        $sql = "SELECT * FROM `$table` WHERE user = '$user' LIMIT 1";
        $user = mysqli_fetch_assoc($this->_query($sql));
        if(!isset($user)) return False;
        if(!$this->checkPassword($pass, $user['pass'])) return False;
        
        setcookie("author_id", $user['id'], time() + 3600, "/");
        return True;
    }
}
