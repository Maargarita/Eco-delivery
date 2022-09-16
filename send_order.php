<?php
	
	$servername = "localhost";
	$username = "root";
	$password = "";

	try{
		//Соединение с базой данных
		$conn = new PDO("mysql:host=$servername; dbname=eco_delivery_shop", $username, $password);
	
		//Присвоение переменным значений из formData
		$full_name = $_POST['name'];
		$adress = $_POST['adress'];
		$email = $_POST['email'];
		$phone =  $_POST['phone'];
		$comment = $_POST['comment'];
		$product_id = $_POST['product_id'];
		$product_amount = $_POST['product_amount'];

		//Создание SQL запроса и его подготовка к выполнению
		$query = "INSERT INTO orders (id, full_name, adress, email, phone, comment, product_id, product_amount) VALUES(NULL, :full_name, :adress, :email, :phone, :comment, :product_id, :product_amount)";
		$ord = $conn->prepare($query);

		//Связка атрибутов из запроса и значений из переменных
		$ord->bindParam(':full_name', $full_name);
		$ord->bindParam(':adress', $adress);
		$ord->bindParam(':email', $email);
		$ord->bindParam(':phone', $phone);
		$ord->bindParam(':comment', $comment);
		$ord->bindParam(':product_id', $product_id);
		$ord->bindParam(':product_amount', $product_amount);

		//Выполнение запроса или получение соббщения об ошибке
		if ($ord->execute()){
  			echo("Новая запись создана");
		} else {
			echo("Ошибка при создании записи\n");
			print_r($ord->errorInfo());
		}

	}
	catch (PDOException $e){
		echo("Ошибка: " .$e->getMessage());
	}
	
?>