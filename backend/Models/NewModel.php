<?php

class NewModel extends BaseModel
{
    const TABLE = 'news';

    // HÀM CƠ BẢN 
    public function store($data)
    {
        return $this->create(self::TABLE, $data);
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
        $sql = "SELECT `$table`.*, author.name AS author, category.name AS category FROM `$table`
        INNER JOIN author ON `$table`.author_id = author.id
        INNER JOIN category ON `$table`.category_id = category.id
        ";

        $query = $this->_query($sql);
        $data = [];

        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }

        return $data;
    }

    public function findId($id)
    {
        $table = self::TABLE;
        $sql = "SELECT `$table`.*, author.name AS author, category.name AS category FROM `$table`
        INNER JOIN author ON `$table`.author_id = author.id
        INNER JOIN category ON `$table`.category_id = category.id
        WHERE `$table`.id = $id 
        LIMIT 1";

        $query = $this->_query($sql);
        return mysqli_fetch_assoc($query);
    }

    public function Views($id)
    {
        $table = self::TABLE;
        $sql = "SELECT views FROM `$table`
        WHERE id = $id 
        LIMIT 1";
        $query = mysqli_fetch_assoc($this->_query($sql))['views']+1;
        return $this->update(self::TABLE, $id, [ "views" => $query]);
    }
}
