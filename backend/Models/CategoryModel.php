<?php

class CategoryModel extends BaseModel
{
    const TABLE = 'category';

    public function getAll($select = ['*'])
    {
        return $this->all(self::TABLE, $select);
    }

    public function findId($id)
    {
        return $this->find(self::TABLE, $id);
    }

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
}
