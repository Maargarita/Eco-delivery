'use strict'; //современный режим

try{

	//Загрузка другого js файла
	function addScript(src){
		var script = document.createElement('script');
		script.src = src;
		document.body.appendChild(script);
	}

	let sectionsBlock = document.querySelector('.sections_block');

	//Загрузка категорий и товаров на страницу 
	loadCategories();
	loadProducts();

	//Загрузка другого js файла после загругзки окна
	window.onload = function(){
		addScript('script.js');
	};

	//Загрузка категорий товаров на страницу
	function loadCategories(){

		let request_categories = new XMLHttpRequest();

		request_categories.open('GET', 'load_categories.php', true);
		request_categories.send();

		request_categories.onload = function(){

			if(request_categories.status === 0 || request_categories.status >= 200 && request_categories.status < 400){

				//Получение катигорий товаров из запроса
				let categories = "",
					categoriesLoadData = JSON.parse(request_categories.responseText);
			
				for(let item in categoriesLoadData){

					//Создание HTML кода для категорий
        			let categoriesLoadHTML = `
        				<section data-section="${categoriesLoadData[item]["name"]}" id="${categoriesLoadData[item]["name"]}">
							<div class="container">
								<h2>${categoriesLoadData[item]["category_name"]}</h2>
								<div class="block">

								</div>
							</div>
						</section>`;

					categories += categoriesLoadHTML;			
				}

				//Добавление категорий на страницу
				sectionsBlock.insertAdjacentHTML('beforeend', categories);	

			}else { //Произошла ошибка
      			console.log(request_categories.responseText);
    		}
		};
	}

	var productsLoadData;

	//Загрузка товаров на страницу
	function loadProducts(){

		let request_products = new XMLHttpRequest();

		request_products.open('GET', 'load_products.php', true);
		request_products.send();

		request_products.onload = function(){

			if(request_products.status === 0 || request_products.status >= 200 && request_products.status < 400){
			
				//Получение товаров из запроса
				let products = "";
					productsLoadData = JSON.parse(request_products.responseText);
		
				for(let item in productsLoadData){

					//Определение категории товара
					let categorySection = document.getElementById(productsLoadData[item]["category_name"]),
    					categoryBlock = categorySection.querySelector(".block"),
    					productsLoadHTML = "";

    				//Создание разного HTML кода для товаров и рецептов
    				if(productsLoadData[item]["category_name"] != "recipe"){
		
						productsLoadHTML = `
        					<div class="block_item">
								<div class="block_item_img"><img src="${productsLoadData[item]["image"]}"></div>
								<h3>${productsLoadData[item]["name"]}</h3>
								<p>${productsLoadData[item]["short_description"]}</p>
								<p class="price">${productsLoadData[item]["price"]} p.</p>
								<div class="button"><a class="open_pop_up" id="${productsLoadData[item]["id"]}">Подробнее</a></div>
								<div class="button cart"><a data-id="block_button" class="add_to_shopping_cart" id="${productsLoadData[item]["id"]}">В корзину</a></div>
							</div>
						`;

					}else{

						productsLoadHTML = `
        					<div class="block_item">
								<div class="block_item_img"><img src="${productsLoadData[item]["image"]}"></div>
								<h3>${productsLoadData[item]["name"]}</h3>
								<p>${productsLoadData[item]["short_description"]}</p>
								<div class="button"><a class="open_pop_up" id="${productsLoadData[item]["id"]}">Подробнее</a></div>
							</div>
						`;
    				}

  		  			//Добавление товара в категорию
					categoryBlock.insertAdjacentHTML('beforeend', productsLoadHTML);
				}

			}else { //Произошла ошибка
    	  		console.log(request_products.responseText);
    		}
		};
	}

}catch (e){
	window.location.reload();
}