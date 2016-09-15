<?php
  $to = 'info@wooder.com'; 
  $subject = 'Вопрос от клиента' ;
  $Name = $_REQUEST["name"];
  $Phone = $_REQUEST["phone"]; 
  $Company = $_REQUEST["company"];
  $Question = $_REQUEST["question"];
  $date = date("d.m.y"); 
  $time = date("H:i"); 

  if (!$Name || !$Phone || !$Question) {
    echo "Ошибка. Заполните обязательные поля формы.";
    die();
  }
  $pattern = "#^[-+0-9()\s]+$#"; 
  if(!preg_match($pattern , $Phone)) {
    echo "Ошибка. Некорректный номер телефона.";
    die();
  }

  $message = "$date   $time\n\nИмя: $Name\nТелефон: $Phone\nКомпания: $Company\n\nВопрос: $Question";
  mail( $to, $subject , $message);
  echo "Заявка принята.";
?>

