<?php

    require_once './class/Mail.php';

    $mail = new Mail($_POST);
    $mail->sendMail();
    