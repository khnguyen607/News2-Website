<?php
class BaseModel extends Database
{
    protected $connect;

    public function __construct()
    {
        $this->connect =  $this->connect();
    }

    // truy vấn sql
    protected function _query($sql)
    {
        return mysqli_query($this->connect, $sql);
    }

// ------------------------------MỘT SỐ HÀM DÙNG CHUNG VIẾT SẴN -------------------------------------
    // Lấy tất cả dữ liệu 
    public function all($table, $select = ['*'])
    {
        $select = implode(',', $select);
        $sql = "SELECT $select FROM `$table`";
        $query = $this->_query($sql);
        $data = [];

        while ($row = mysqli_fetch_assoc($query)) {
            array_push($data, $row);
        }

        return $data;
    }

    // lấy ra dữ liệu 1 bản ghi trong bảng
    public function find($table, $id)
    {
        $sql = "SELECT * FROM `$table` WHERE id = $id LIMIT 1";
        $query = $this->_query($sql);
        return mysqli_fetch_assoc($query);
    }

    // thêm dữ liệu 
    public function create($table, $data = [])
    {
        $values = implode("','", array_values($data));
        $columns = implode(',', array_keys($data));
        $sql = "INSERT INTO `$table`($columns) VALUES ('$values')";
        $this ->_query($sql);
        return "Thành công: $sql";
    }

    // cập nhật dữ liệu
    public function update($table, $id, $data)
    {
        // $values = implode("','", array_values($data));
        $values = [];
        foreach($data as $key => $value){
            array_push($values, "`$key`='$value'");
        }
        $values = implode(',', $values);
        $sql = "UPDATE `$table` SET $values WHERE `id`= $id";
        $this ->_query($sql);
        return "Thành công: $sql";
    }

    // xóa dữ liệu 
    public function delete($table, $id)
    {
        $sql = "DELETE FROM `$table` WHERE `id` = $id";
        $this ->_query($sql);
        return "Thành công: $sql";
    }

}
