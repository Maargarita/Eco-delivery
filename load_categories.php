<?php
	
	$servername = "localhost";
	$username = "f920429h_eco";
	$password = "HgJE!xY!q8gvRaP";

	try{
		//Соединение с базой данных
		$conn = new PDO("mysql:host=$servername; dbname=f920429h_eco", $username, $password);

		$query = "SELECT * FROM categories";
		$send = $conn->prepare($query);
			
		if ($send->execute()){
			//Построчное добавление результатов в массив
  			while($row = $send->fetch(PDO::FETCH_ASSOC)) {
  				$output[] = $row;
			}
			//Перевод массива в JSON и отправка 
			echo(json_encode($output));
		} else {
			echo("Ошибка\n");
			print_r($send->errorInfo());
		}

	}
	catch (PDOException $e){
		echo("Ошибка: " .$e->getMessage());
	}
	
?>