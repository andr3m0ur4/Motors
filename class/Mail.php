<?php

use PHPMailer\PHPMailer\PHPMailer;

class Mail
    {
        private $mailer;
        private $email = 'motors@andremouradev.com.br';
        private $senha = '<andre-moura />';

        public function __construct(Array $parametros)
        {
            require_once './class/PHPMailer/OAuth.php';
            require_once './class/PHPMailer/PHPMailer.php';
            require_once './class/PHPMailer/POP3.php';
            require_once './class/PHPMailer/SMTP.php';

            $this->mailer = new PHPMailer();

            $this->mailer->isSMTP();
            $this->mailer->Host = 'mail.andremouradev.com.br';  // SERVIDOR SMTP DA HOSPEDAGEM
            $this->mailer->Port = 465;     // PORTA DO SMTP
            $this->mailer->SMTPDebug = 0;
            $this->mailer->SMTPAuth = true;
            $this->mailer->SMTPSecure = 'ssl';
            $this->mailer->Username = $this->email;
            $this->mailer->Password = $this->senha;

            $this->mailer->isHTML(true);
            $this->mailer->SingleTo = true;

            $this->mailer->From = $parametros['email'];
            $this->mailer->FromName = $parametros['nome'];

            $this->mailer->Subject = 'Nova Mensagem do Site!';

            $this->addAddress($this->email, 'Administrador');

            $body = '';

            foreach ($parametros as $key => $value) {
                $body .= ucfirst($key) . ": {$value}";
                $body .= "<hr>";
            }

            $this->mailer->Body = $body;
        }

        public function addAddress($mail, $nome)
        {
            $this->mailer->addAddress($mail, $nome);
            return $this;
        }

        public function sendMail()
        {
            $this->mailer->CharSet = 'UTF-8';
            $this->mailer->Encoding = 'base64';

            if ($this->mailer->send()) {
                return true;
            }

            return false;
        }
    }
