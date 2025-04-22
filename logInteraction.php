<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Includes
require_once __DIR__ . '/source/Config.php';
require_once ROOT_DIR . 'config/config.php';
require_once __DIR__ . '/source/Conexao.php';

use Source\Conexao;

// Conexão
$pdo = Conexao::getDB();

// Decodifica o JSON
$data = json_decode(file_get_contents('php://input'), true);

// Verifica dados obrigatórios
if ($data && isset($data['unique_id'], $data['item_id'], $data['action'])) {
    session_start();
    $userId = $_SESSION['user']['id'] ?? null;

    try {
        if ($data['action'] === 'remove') {
            // Se a ação for "remove", apagamos a interação existente
            $stmt = $pdo->prepare("
                DELETE FROM user_interactions
                WHERE item_id = :item_id
                AND (
                    (user_id IS NOT NULL AND user_id = :user_id)
                    OR (user_id IS NULL AND unique_id = :unique_id)
                )
            ");
            $stmt->execute([
                'item_id'   => $data['item_id'],
                'user_id'   => $userId,
                'unique_id' => $data['unique_id']
            ]);
        } else {
            // Caso contrário, inserimos ou atualizamos
            $stmt = $pdo->prepare("
                INSERT INTO user_interactions (user_id, unique_id, item_id, action) 
                VALUES (:user_id, :unique_id, :item_id, :action)
                ON DUPLICATE KEY UPDATE action = VALUES(action)
            ");
            $stmt->execute([
                'user_id'   => $userId,
                'unique_id' => $data['unique_id'],
                'item_id'   => $data['item_id'],
                'action'    => $data['action']
            ]);
        }

        echo json_encode(['success' => true]);

    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        echo json_encode(['success' => false, 'error' => 'Database insertion error']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request parameters']);
}
