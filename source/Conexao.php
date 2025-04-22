<?php
namespace Source;

// 1) Carrega suas configurações de banco
require_once __DIR__ . '/../config/config.php';

/**
 * PDO subclass que:
 *  - é singleton (uma única instância)
 *  - ignora chamadas aninhadas a beginTransaction()
 */
class SingletonPDO extends \PDO
{
    public function beginTransaction(): bool
    {
        return $this->inTransaction()
            ? true
            : parent::beginTransaction();
    }

    public function commit(): bool
    {
        return $this->inTransaction()
            ? parent::commit()
            : true;
    }

    public function rollBack(): bool
    {
        return $this->inTransaction()
            ? parent::rollBack()
            : true;
    }
}

abstract class Conexao
{
    /** @var SingletonPDO|null */
    private static ?SingletonPDO $conexao = null;

    /**
     * Retorna sempre a MESMA instância de PDO,
     * usando as constantes definidas em config.php.
     */
    public static function getDB(): \PDO
    {
        if (self::$conexao === null) {
            $dsn = 'mysql:host=' . DB_HOST
                 . ';dbname='    . DB_NAME
                 . ';charset=utf8';

            self::$conexao = new SingletonPDO(
                $dsn,
                DB_USER,
                DB_PASS,
                [
                    \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
                    \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                ]
            );
        }
        return self::$conexao;
    }
}
