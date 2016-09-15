<?php
  $to = 'info@wooder.com';  
  $subject = 'Заявка на расчет комплекта';
  $requestInputName = $_REQUEST["requestInputName"];
  $requestInputPhone = $_REQUEST["requestInputPhone"]; 
  $requestInputEmail = $_REQUEST["requestInputEmail"];
  $date = date("d.m.y"); 
  $time = date("H:i"); 

  if (!$requestInputEmail || !$requestInputPhone || !$requestInputName) {
    echo "Ошибка. Заполните все поля формы.";
    die();
  }
  if(!preg_match("|^[-0-9a-z_\.]+@[-0-9a-z_^\.]+\.[a-z]{2,6}$|i", $requestInputEmail)) {
    echo "Ошибка. Неверный формат Email.";
    die();
  }
  $pattern = "#^[-+0-9()\s]+$#"; 
  if(!preg_match($pattern , $requestInputPhone)) {
    echo "Ошибка. Некорректный номер телефона.";
    die();
  }

  $message = "$date   $time\nИмя: $requestInputName\nТелефон: $requestInputPhone\nEmail: $requestInputEmail";
  $success = mail( $to, $subject , $message);
  echo "Заявка принята.";
?>


