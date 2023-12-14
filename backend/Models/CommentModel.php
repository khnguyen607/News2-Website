<?php

class CommentModel extends BaseModel
{
    const TABLE = 'comments';

    // HÀM CƠ BẢN 
    public function store($data)
    {
        return $this->create(self::TABLE, $data);
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

    // METHOD BỔ SUNG 
    public function getAll()
    {
        $table = self::TABLE;
        $sql = "SELECT `$table`.*, users.name AS `user`, news.title AS `new` FROM `$table`
        INNER JOIN `users` ON `$table`.user_id = users.id
        INNER JOIN `news` ON `$table`.new_id = news.id
        ";

        $query = $this->_query($sql);
        $data = [];

        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }

        return $data;
    }

    // METHOD BỔ SUNG 
    public function inNew()
    {
        $table = self::TABLE;
        $id = $_GET['id'];
        $sql = "SELECT `$table`.*, users.name AS `user` FROM `$table`
            INNER JOIN `users` ON `$table`.user_id = users.id
            INNER JOIN `news` ON `$table`.new_id = news.id
            WHERE `$table`.new_id = $id";

        $query = $this->_query($sql);
        $data = [];

        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }

        return $data;
    }
}
