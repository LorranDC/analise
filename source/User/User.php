<?php
namespace Source\User;

use Source\Models;

class User extends Models {

    /**
     * Create a new user.
     * @param array $data Must include 'username', 'email', 'password'
     * @return bool True on success.
     */
    public function create(array $data) {
        // Hash the password before inserting
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        return $this->insert('site_users', $data, false);
    }

    /**
     * Get a user by email.
     * @param string $email
     * @return array|false
     */
    public function getUserByEmail(string $email) {
        $pdo = $this->getDB();
        $stmt = $pdo->prepare("SELECT * FROM site_users WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Get a user by ID.
     * @param int $id
     * @return array|false
     */
    public function getUser(int $id) {
        $pdo = $this->getDB();
        $stmt = $pdo->prepare("SELECT id, username, email FROM site_users WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Update an existing user.
     * @param int $id
     * @param array $data Can include 'username', 'email', 'password'
     * @return bool
     */
    public function update(int $id, array $data) {
        // If a new password is provided, hash it. Otherwise, remove it.
        if (isset($data['password']) && !empty($data['password'])) {
            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        } else {
            unset($data['password']);
        }
        return $this->saveById('site_users', $data, $id);
    }

    /**
     * Delete a user record.
     * @param int $id
     * @return bool
     */
    public function deleteUser(int $id) {
        return $this->delete('site_users', $id);
    }

    /**
     * List all users.
     * @return array
     */
    public function listUsers() {
        $pdo = $this->getDB();
        $stmt = $pdo->query("SELECT id, username, email FROM site_users ORDER BY id DESC");
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
