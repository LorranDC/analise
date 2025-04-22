<?php

namespace Source\Support;

use Exception;
use stdClass;
use PHPMailer\PHPMailer\PHPMailer;

class Email {
    /** @var PHPMailer */
    private $mail;
    
    /** @var stdClass */
    private $data;
    
    /** @var Exception */
    private $error;

    public function __construct() {
        $this->mail = new PHPMailer(true);
        $this->data = new stdClass();
        $this->data->attach = []; // Inicializa o array de anexos
        
        $this->mail->isSMTP();
        $this->mail->isHTML(true);
        $this->mail->setLanguage("br");

        $this->mail->SMTPAuth = true;
        $this->mail->SMTPSecure = SMTP_MAIL['SMTPSecure'] ?? 'ssl'; // Adicionado fallback
        $this->mail->CharSet = 'utf-8';

        $this->mail->Host = SMTP_MAIL['host'];
        $this->mail->Port = SMTP_MAIL['port'];
        $this->mail->Username = SMTP_MAIL['user'];
        $this->mail->Password = SMTP_MAIL['password'];
    }

    public function add(string $subject, string $body, string $recipient_name, string $recipient_email, $copy = ''): Email {
        $this->data->subject = $subject;
        $this->data->body = $body;
        $this->data->recipient_name = $recipient_name;
        $this->data->recipient_email = $recipient_email;

        // Adiciona cópias, se existirem
        if (!empty($copy)) {
            $this->data->copy = is_array($copy) ? $copy : [$copy];
        }

        return $this;
    }

    public function attach(string $filePath, string $fileName): Email {
        $this->data->attach[$filePath] = $fileName;
        return $this;
    }

    public function send(string $from_name = SMTP_MAIL['from_name'], string $from_email = SMTP_MAIL['from_email']): bool {
        try {
            $this->mail->Subject = $this->data->subject;
            $this->mail->msgHTML($this->data->body);
            $this->mail->addAddress($this->data->recipient_email, $this->data->recipient_name);

            // Adiciona cópias ocultas (BCC), se existirem
            if (!empty($this->data->copy)) {
                foreach ($this->data->copy as $emailCopy) {
                    $this->mail->addBCC($emailCopy);
                }
            }

            // Define remetente
            $this->mail->setFrom($from_email, $from_name);

            // Adiciona anexos, se existirem
            if (!empty($this->data->attach)) {
                foreach ($this->data->attach as $path => $name) {
                    $this->mail->addAttachment($path, $name);
                }
            }

            $this->mail->send();
            return true;
        } catch (Exception $ex) {
            $this->error = $ex; // Salva o erro para diagnóstico
            return false;
        }
    }

    public function error(): ?Exception {
        return $this->error;
    }
}
