'use strict'; //современный режим

//Прокрутка к элементу main при нажатии на ссылку
let link = document.querySelector('.link');

link.addEventListener('click', () => {
	document.getElementById('main').scrollIntoView({
  		behavior: 'smooth'
	});
});

//Появление меню при прокрутке
let menu = document.querySelector('nav'),
	headerHeight = document.querySelector('header').offsetHeight,
	menuMobile = document.querySelector('.menu_mobile');

window.addEventListener('scroll', function(){
	let scrolled = window.scrollY;

	if (scrolled > (headerHeight-1)){
		setTimeout(() => {menu.classList.add('out')}, 500);
		setTimeout(() => {menuMobile.classList.add('out')}, 500);
	}else{
		menu.classList.remove('out');
		menuMobile.classList.remove('out');
	}
});

//Появление меню при нажатии на кнопку
let burger = document.querySelector('.burger'),
	body = document.querySelector('body'),
	menuUl = document.querySelector('.menu ul');

burger.addEventListener('click', () => {

	if(!menuMobile.classList.contains('open')){
		
		menuMobile.classList.add('open');
		menu.classList.add('open');
		menuUl.classList.add('open');
		body.classList.add('pop_up_open');
		shoppingCartIcon.classList.remove('active');

	}else{

		menuMobile.classList.remove('open');
		menu.classList.remove('open');
		menuUl.classList.remove('open');
		body.classList.remove('pop_up_open');
		openCartIcon();
	}
	
});

//Вернуть или убрать полосу прокрутки при увиличении и уменьшении ширины экрана и открытом меню
window.addEventListener('resize',function(){
    if (menuMobile.classList.contains('open') && document.documentElement.clientWidth > 983) {
		body.classList.remove('pop_up_open');
	}else if (menuMobile.classList.contains('open') && document.documentElement.clientWidth < 982) {
		body.classList.add('pop_up_open');
	}
});

//Прокрутка к элементу при нажатии на ссылку в меню
let navLinks = document.querySelectorAll('.nav_link'),
	activeLink = document.querySelector('a.active');

if (navLinks.length > 0){

	for (let i = 0; i < navLinks.length; i++) {

		let navLink = navLinks[i];

		navLink.addEventListener('click', function(e){
			e.preventDefault();

			let navLinkID = navLink.dataset.id;
			document.getElementById(navLinkID).scrollIntoView({
  				behavior: 'smooth'
  			});
			
			//Закрытие меню в мобильной версии
			if(menuMobile.classList.contains('open')){

				menuMobile.classList.remove('open');
				menu.classList.remove('open');
				menuUl.classList.remove('open');
				body.classList.remove('pop_up_open');
				openCartIcon();
			}

			midClick: true;
		});
	}
}

let navHeight = document.querySelector('nav').offsetHeight;

//Выделение ссылок при прокрутке
window.addEventListener('scroll', function(){

	let scrolled = window.scrollY;

	document.querySelectorAll('[data-section]').forEach((el, i) => {
		if(el.offsetTop - navHeight <= scrolled){
			document.querySelectorAll('.menu a').forEach((el) => {
				if(el.classList.contains('active'))
					el.classList.remove('active');
			});
			
			document.querySelectorAll('.menu li')[i].querySelector('a').classList.add('active');
		}
	}); 
});

//Описание товаров
let openPopUps = document.querySelectorAll('.open_pop_up'),
	currentPopUp,
	currentPopUpBody,
	shoppingCartProductAmount;

//Открытие описания
if (openPopUps.length > 0){
	
	for (let i = 0; i < openPopUps.length; i++) {

		let openPopUp = openPopUps[i];

		openPopUp.addEventListener('click', function(e){
			e.preventDefault();
			
			let productId = openPopUp.id;
			
			for(let item in productsLoadData){

				if(productsLoadData[item]["id"] == productId){
					
					let popUpHTML = "",
						categorySection = document.getElementById(productsLoadData[item]["category_name"]),
						categoryBlock = categorySection.querySelector(".block");

					//Разные описания для товаров и рецептов
					if(productsLoadData[item]["category_name"] != "recipe"){
						popUpHTML =` 
							<div class="pop_up">
								<div class="pop_up_area"></div>
								<div class="pop_up_body">
									<div class="pop_up_img"><img src="${productsLoadData[item]["image"]}"></div>
									<div class="pop_up_info">
										<h3>${productsLoadData[item]["name"]}</h3>
										<p class="price">${productsLoadData[item]["price"]} р.</p>
										<div class="button"><a data-id="pop_up_button" class="add_to_shopping_cart_pop_up" id="${productsLoadData[item]["id"]}">В корзину</a></div>
										${productsLoadData[item]["long_description"]}
									</div>	
								</div>
								<div class="close_pop_up">&#10006</div>
							</div>
						`;
					}else{
						popUpHTML =` 
							<div class="pop_up">
								<div class="pop_up_area"></div>
								<div class="pop_up_body">
									<div class="pop_up_img"><img src="${productsLoadData[item]["image"]}"></div>
									<div class="pop_up_info">
										<h3>${productsLoadData[item]["name"]}</h3>
										<div class="button" style="display: none;"><a data-id="pop_up_button" class="add_to_shopping_cart_pop_up"></a></div>
										${productsLoadData[item]["long_description"]}
									</div>	
								</div>
								<div class="close_pop_up">&#10006</div>
							</div>
						`;
					}
					
					categoryBlock.insertAdjacentHTML('beforeend', popUpHTML);
					
					setTimeout(() => {
						let closePopUp = document.querySelector('.close_pop_up'),
							popUpArea = document.querySelector('.pop_up_area'),
							addToShoppingCartPopUp = document.querySelector('.add_to_shopping_cart_pop_up');

						currentPopUp = document.querySelector(".pop_up");
						currentPopUpBody = document.querySelector(".pop_up_body");

						currentPopUp.classList.add('active');
						currentPopUpBody.classList.add('active');
						

						body.classList.add('pop_up_open');
						shoppingCartIcon.classList.remove('active');

						//Закрытие описания
						popUpArea.addEventListener('click', function(e){
							e.preventDefault();

							closePopUpFunc();			
							//Если есть продукты в корзине показать shoppingCartIcon
							openCartIcon();

							midClick: true;
						});

						//Закрытие описания
						closePopUp.addEventListener('click', function(e){
							e.preventDefault();

							closePopUpFunc();
							//Если есть продукты в корзине показать shoppingCartIcon
							openCartIcon();						
			
							midClick: true;
						});

						//Добавление в корзину
						addToShoppingCartPopUp.addEventListener('click', function(e){
							e.preventDefault();

							//Добавление товара в корзину
							addToCart(addToShoppingCartPopUp);

							//Пересчет общего количества товаров и цены 
							calcCarticonCounter();
							calcCartPrice();

							midClick: true;
						});

					}, 100);
				}

			}
	
			midClick: true;
		});
	}
}else{
	window.location.reload();
}

//Закрытие описнаия
function closePopUpFunc(){
	currentPopUp.classList.remove('active');
	currentPopUpBody.classList.remove('active');
	body.classList.remove('pop_up_open');

	setTimeout(() => {
		currentPopUp.remove();
	}, 100);
}

//Корзина товаров
let addToShoppingCarts = document.querySelectorAll('.add_to_shopping_cart'),
	closeShoppingCarts = document.querySelectorAll('.close_shopping_cart'),
	shoppingCartAreas = document.querySelectorAll('.shopping_cart_area'),
	shoppingCart = document.querySelector('.shopping_cart'),
	shoppingCartProducts = document.querySelector('.shopping_cart_products'),
	shoppingCartIcon = document.querySelector('.carticon'),
	shoppingCartTotalPrice = document.querySelector('.shopping_cart_total .total_price');

//Если есть продукты в корзине показать shoppingCartIcon
openCartIcon();

//Добавление в корзину
if (addToShoppingCarts.length > 0){

	for (let i = 0; i < addToShoppingCarts.length; i++) {

		let addToShoppingCart = addToShoppingCarts[i];

		addToShoppingCart.addEventListener('click', function(e){
			e.preventDefault();

			//Добавление товара в корзину
			addToCart(addToShoppingCart);

			//Пересчет общго количества товаров и цены 
			calcCarticonCounter();
			calcCartPrice();

			midClick: true;
		});
	}
}

//Запись данных в LocalStorage
function setCartData(obj){
	localStorage.setItem('cart', JSON.stringify(obj));
}
//Получение данных из LocalStorage
function getCartData(){
	return JSON.parse(localStorage.getItem('cart'));

}

//Добавление товара в корзину
function addToCart(elem){

	let cartData = getCartData() || {},//Получение данных из корзины или создание нового объекта, если данных еще нет
		addToShoppingCartID = elem.dataset.id,
		currentParent,
		productId,
		productImgSrc,
		productTitle,
		productPrice;

	//Проверка родительского элемента кнопки
	if(addToShoppingCartID == 'block_button'){

		currentParent = elem.closest('.block_item');
		productId = currentParent.querySelector('.add_to_shopping_cart').getAttribute('id');
		productImgSrc = currentParent.querySelector('.block_item_img img').getAttribute('src');
		productTitle = currentParent.querySelector('.block_item h3').innerText;
		productPrice = currentParent.querySelector('.block_item .price').innerText;

	}else if(addToShoppingCartID == 'pop_up_button'){

		currentParent = elem.closest('.pop_up_body');
		productId = currentParent.querySelector('.add_to_shopping_cart_pop_up').getAttribute('id');
		productImgSrc = currentParent.querySelector('.pop_up_img img').getAttribute('src');
		productTitle = currentParent.querySelector('.pop_up_body h3').innerText;
		productPrice = currentParent.querySelector('.pop_up_body .price').innerText;
		
		//Закрыть описание перед открытием корзины
		closePopUpFunc();
	};

	if(cartData.hasOwnProperty(productId)){ 
		
		//Если такой товар уже существует в корзине, то добавляется 1 к его количеству и пересчитывается цена
    	let price = parseInt(cartData[productId][3]) / parseInt(cartData[productId][4]);
		cartData[productId][4] += 1;
		cartData[productId][3] = parseInt(cartData[productId][3]) + price + ' p.';

  	} else { 
  		//Если товара в корзине еще нет, то добавляется в объект
    	cartData[productId] = [productId, productImgSrc, productTitle, productPrice, 1];
  	}
	//Обновление данных в LocalStorage и открытие корзины
  	setCartData(cartData);
  	openCart();
}

//Открытие корзины со списком товаров
function openCart(){

	let cartData = getCartData(),
		cartProducts = "";
	
	//Представление товаров  в корзине  
    for(let item in cartData){
        let shoppingCartProductHTML = `
						<div class="shopping_cart_product" data-id="${cartData[item][0]}">
							<div class="product_img"><img src="${cartData[item][1]}"></div>
							<div class="product_name">${cartData[item][2]}</div>
							<div class="product_quantity">
								<div class="minus"><svg data-action="minus" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 64 64" enable-background="new 0 0 64 64"><g><line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="14" y1="31" x2="50" y2="31"/></g><g><circle fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" cx="32" cy="32" r="30.999"/></g></svg></div>
								<span class="counter">${cartData[item][4]}</span>
								<div class="plus"><svg data-action="plus" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 64 64" enable-background="new 0 0 64 64"><g><line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="32" y1="50" x2="32" y2="14"/><line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="14" y1="32" x2="50" y2="32"/></g><g><circle fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" cx="32" cy="32" r="30.999"/></g></svg></div>
							</div>
							<div class="product_price">${cartData[item][3]}</div>
							<div class="product_delete"><svg data-action="delete" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 64 64" enable-background="new 0 0 64 64"><g><line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="18.947" y1="17.153" x2="45.045" y2="43.056"/></g><g><line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="19.045" y1="43.153" x2="44.947" y2="17.056"/></g><g><circle fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" cx="32" cy="32" r="30.999"/></g></svg></div>
						</div>
					`;
    	
		cartProducts += shoppingCartProductHTML;	
	}

	shoppingCartProducts.innerHTML = cartProducts;

	//Открытие корзины
	shoppingCart.classList.add('active');
	body.classList.add('pop_up_open');
	shoppingCartIcon.classList.remove('active');
}

//Закрытие корзины
if (closeShoppingCarts.length > 0){

	for (let i = 0; i < closeShoppingCarts.length; i++) {

		let closeShoppingCart = closeShoppingCarts[i];

		closeShoppingCart.addEventListener('click', function(e){
			e.preventDefault();

			shoppingCart.classList.remove('active');
			body.classList.remove('pop_up_open');
			openCartIcon();

			midClick: true;
		});
	}
}

//Закрытие корзины
if (shoppingCartAreas.length > 0){

	for (let i = 0; i < shoppingCartAreas.length; i++) {

		let shoppingCartArea = shoppingCartAreas[i];

		shoppingCartArea.addEventListener('click', function(e){
			e.preventDefault();

			shoppingCart.classList.remove('active');
			body.classList.remove('pop_up_open');
			openCartIcon();

			midClick: true;
		});
	}
}

//Изменение количества единиц одного товара в корзине
window.addEventListener('click', function(event){

	//Уменьшение единиц товара
	if(event.target.dataset.action === 'minus'){

		let cartData = getCartData(),
			currentParent = event.target.closest('.shopping_cart_product'),
			productID = currentParent.dataset.id,
			currentCounter = currentParent.querySelector('.product_quantity .counter'),
			currentPrice = currentParent.querySelector('.product_price'),
			price = parseInt(cartData[productID][3]) / parseInt(cartData[productID][4]); //Рассчет цены за единицу товара
		
		//Уменьшение единиц и цены товара и пересчет общей цены корзины или удаление товара
		if (parseInt(currentCounter.innerText) > 1){

			cartData[productID][4] -= 1;
			cartData[productID][3] = parseInt(cartData[productID][3]) - price + ' p.';
			currentCounter.innerText = cartData[productID][4];
			currentPrice.innerText = cartData[productID][3];

			setTimeout(function(){calcCartPrice()}, 10);
		}else{
			cancelDelete();
		};
		
		//Обновление данных в LocalStorage
		setCartData(cartData);
		midClick: true;
	};
  	
	//Увеличение единиц товара
	if(event.target.dataset.action === 'plus'){

		let cartData = getCartData(),
			currentParent = event.target.closest('.shopping_cart_product'),
			productID = currentParent.dataset.id,
			currentCounter = currentParent.querySelector('.product_quantity .counter'),
			currentPrice = currentParent.querySelector('.product_price'),
			price = parseInt(cartData[productID][3]) / parseInt(cartData[productID][4]); //Рассчет цены за единицу товара
		
		//Увеличение единиц и цены товара 
		cartData[productID][4] += 1;
		cartData[productID][3] = parseInt(cartData[productID][3]) + price + ' p.';
		currentCounter.innerText = cartData[productID][4];
		currentPrice.innerText = cartData[productID][3];
		
		//Обновление данных в LocalStorage и пересчет общей цены корзины
		setCartData(cartData);
		calcCartPrice();
		midClick: true;
	};

	//Удаление товара
	if(event.target.dataset.action === 'delete'){
		cancelDelete();
		midClick: true;
	};

	//Отмена удаления товара
	function cancelDelete(){

		let currentParent = event.target.closest('.shopping_cart_product'),
			cancelDeleteHTML = document.createElement('div'),
			productName = currentParent.querySelector('.product_name'),
			timerCounterNumber = 4,
			itemId = currentParent.dataset.id;

		//Блок отмены удаления
  		cancelDeleteHTML.className = "product_deleted";
  		cancelDeleteHTML.innerHTML = `
  						<div class="product_deleted_body" colspan="5">
	    					<div class="product_deleted_timer">
					    	    <div class="timer_left">
	            					<div class="timer_counter">
	            						<span class="timer_counter_number">${timerCounterNumber}</span>
	            						<svg class="timer_counter_circle"><circle r="10" cx="12" cy="12"></circle></svg>
	            					</div>
					    	       	<div class="timer_title">Вы удалили "${productName.innerText}"</div>
	        					</div>
	        					<div class="timer_return">Вернуть</div>                   
	    					</div>                
	    				</div>
  		`;
		
		//Замена блока товара на блок отмены удаления 
		currentParent.after(cancelDeleteHTML);
		currentParent.style.display = "none";
		
		//Обратный отсчет до удаления товара
		let setTimeoutID = setTimeout(function(){

			//Удаление товара из корзины
			currentParent.remove();
			cancelDeleteHTML.remove();
			
			//Удаление товара из LocalStorage
			let cartData = getCartData();
			delete cartData[itemId];
			setCartData(cartData);

			//Закрытие корзины, если товаров в больше нет и пересчет общей цены
			openCartIcon();
			calcCartPrice()

		},4000);
		
		let timerReturn = cancelDeleteHTML.querySelector('.timer_return'),
			timerCounter = cancelDeleteHTML.querySelector('.timer_counter_number');
		
		//Отображение обратного отсчета до удаления товара
		let setIntervalID = setInterval(function(){

			timerCounterNumber -= 1;

			if(timerCounterNumber == 0){
				clearTimeout(setIntervalID);
			}
			
			timerCounter.innerText = timerCounterNumber;

		}, 1000);

		//Отмена удаления товара при нажатии на кнопку Вернуть
		timerReturn.addEventListener('click', function(e){
			e.preventDefault();

			//Возврат блока товара, удаление блока отмены удаления и очистка таймера
			currentParent.style.display = "table";
			cancelDeleteHTML.remove();
			clearTimeout(setTimeoutID);

			midClick: true;
		});
		
	};	

});

//Подсчет суммы заказа
function calcCartPrice(){
	shoppingCartProductAmount = document.querySelectorAll('.shopping_cart_product');

	let totalPrice = 0,
		carticonText = document.querySelector('.carticon_text'),
		cartData = getCartData();

	//Подсчет суммы всех товаров
	for(let item in cartData){
		totalPrice += parseInt(cartData[item][3]);
	}

	//Отображение результата
	shoppingCartTotalPrice.innerText = totalPrice + ' p.';
	carticonText.innerText =  '= ' + totalPrice + ' p.';
};

//Проверка формы
let form = document.querySelector('form'),
	errorBox = document.querySelector('.errorbox');

form.addEventListener('submit', formSend);

//Отправка формы
async function formSend(e){
	e.preventDefault();

	let cartData = getCartData(),
		form = document.querySelector('form'),
		formData = new FormData(form);//Автоматически записывает данные из формы

	//Проверка на наличие ошибок
	let error = formValidate(form);

	//Скрытие или отображение блока ошибок и отправка формы
	if (error === 0){

		let response = false,
			responseError = 0;
		
		//Запись товаров из корзины в массив
		for(let item in cartData){
				
			//Добавление информации о товаре в formData
			formData.append('product_id', cartData[item][0]);
			formData.append('product_amount', parseInt(cartData[item][4]));

			let xhr = new XMLHttpRequest();

			errorBox.style.display = "none";

			//Создание запроса
			xhr.open('POST', 'send_order.php', true);

			//Получение ответа о состоянии запроса
			xhr.onreadystatechange = function () {
	  			//Если запрос завешен
				if(xhr.readyState === XMLHttpRequest.DONE) {
    				let status = xhr.status;
    				//Если запрос был выполнен успешно
			    	if (status === 0 || (status >= 200 && status < 400)) {
				    	console.log(xhr.responseText);
    				} else { //Произошла ошибка
      					console.log(xhr.responseText);
      					responseError++;
    				}
  				}
			};
			
			//Отправка запроса, если нет ошибки
			if(!responseError > 0){
				xhr.send(formData);
				response = true;
			}

			//Удаление информации о товаре из formData
			formData.delete('product_id');
			formData.delete('product_amount');
		};

		//Сообщение об успешной отправке или ошибке
		formResponse(response);

	}else{
		errorBox.style.display = "block";
	}

	//Сообщение об успешной отправке или ошибке
	function formResponse(response){
		
		//Очистка формы и cartData
		form.reset();
		cartData = null;
		setCartData(cartData);

		let shoppingCartProducts = document.querySelector('.shopping_cart_products'),
			shoppingCartTotal = document.querySelector('.shopping_cart_total'),
			shoppingCartTitle = document.querySelector('.shopping_cart_body h3'),
			formSuccessHTML = document.createElement('div');

		if(response){
			//Блок успешной отправки заказа
			formSuccessHTML.className = "form_success";
			formSuccessHTML.innerHTML = `Спасибо! Данные успешно отправлены.`;
		}else{
			//Блок неуспешной отправки заказа
			formSuccessHTML.className = "form_error";
			formSuccessHTML.innerHTML = `Ошибка. Попробуйте еще раз.`;
		}
		
		//Отображение блока отправки заказа 
		shoppingCartTitle.after(formSuccessHTML);
		shoppingCartProducts.style.display = "none";
		shoppingCartTotal.style.display = "none";
		form.style.display = "none";

		//Удаление блока отправки заказа и возвращение остальных блоков корзины
		setTimeout(function(){
				
			//Удаление блока отправки заказа 
			formSuccessHTML.remove()

			//Закрытие корзины
			shoppingCart.classList.remove('active');
			body.classList.remove('pop_up_open');
				
			//Возвращение остальных блоков корзины
			shoppingCartProducts.style.display = "table";
			shoppingCartTotal.style.display = "block";
			form.style.display = "block";
			openCartIcon();

		},4000);
	}
}

//Проверка правильности формы
function formValidate(form){

	let error = 0,
		formReq = document.querySelectorAll('.req'),
		inputErrorTextHTML = document.querySelectorAll('.input_error_text'),
		errorboxTexts = document.querySelectorAll('.errorbox_text p'),
		textarea = document.querySelector('textarea');

	//Удаление всех сообщений об ошибках, если они есть
	if (inputErrorTextHTML.length > 0){
		for (let i = 0; i < inputErrorTextHTML.length; i++) {
			let input = inputErrorTextHTML[i];
			input.style.display = "none";
		}
	}

	if (errorboxTexts.length > 0){
		for (let i = 0; i < errorboxTexts.length; i++) {
			let errorboxText = errorboxTexts[i];
			errorboxText.classList.remove('active');
		}
	}

	//Поочередная проверка правильности заполнения всех текстовых полей
	for(let i = 0; i < formReq.length; i++){

		let input = formReq[i];

		input.classList.remove('input_error');

		//Проверка правильности заполнения текстового поля в зависимости от его назначения
		if(input.id == 'email'){

			//Показ сообщения об ошибке, если email указан не верно
			if(emailTest(input)){
				let inputErrorTextHTML = document.createElement('div'),
					inputError = document.querySelector('.error_email');
					
				inputErrorTextHTML.className = "input_error_text";
				inputErrorTextHTML.innerHTML = `Укажите, пожалуйста, корректный email`;

				input.after(inputErrorTextHTML);
				input.classList.add('input_error');
				inputError.classList.add('active');
				error++;

			//Проверка длины строки
			}else if(input.value.length > 50){ 
				let inputErrorTextHTML = document.createElement('div'),
					inputError = document.querySelector('.error_length');
					
  				inputErrorTextHTML.className = "input_error_text";
  				inputErrorTextHTML.innerHTML = `Строка не может содержать более 50 символов`;

				input.after(inputErrorTextHTML);
				input.classList.add('input_error');
				inputError.classList.add('active');
				error++;
			}

		}else if(input.id == 'phone'){

			//Показ сообщения об ошибке, если телефон указан не верно
			if(phoneTest(input)){
				let inputErrorTextHTML = document.createElement('div'),
					inputError = document.querySelector('.error_phone');
					
  				inputErrorTextHTML.className = "input_error_text";
  				inputErrorTextHTML.innerHTML = `Укажите, пожалуйста, корректный номер телефона`;

				input.after(inputErrorTextHTML);
				input.classList.add('input_error');
				inputError.classList.add('active');
				error++;
			}

		}else if(input.value === ''){

			//Показ сообщения об ошибке, если поле не должно быть пустым 
			let inputErrorTextHTML = document.createElement('div'),
				inputError = document.querySelector('.error_req');
					
			inputErrorTextHTML.className = "input_error_text";
			inputErrorTextHTML.innerHTML = `Это поле обязательно для заполнения`;

			input.after(inputErrorTextHTML);
			input.classList.add('input_error');
			inputError.classList.add('active');
			error++;

		//Проверка длины строки
		}else if(input.id === 'name' || input.id === 'adress'){
			if(input.value.length > 50){
				let inputErrorTextHTML = document.createElement('div'),
					inputError = document.querySelector('.error_length');
					
				inputErrorTextHTML.className = "input_error_text";
				inputErrorTextHTML.innerHTML = `Строка не может содержать более 50 символов`;

				input.after(inputErrorTextHTML);
				input.classList.add('input_error');
				inputError.classList.add('active');
				error++;
			}
		}
	}

	//Проверка длины строки
	if(textarea.value.length > 250){
		let inputErrorTextHTML = document.createElement('div'),
			inputError = document.querySelector('.error_length');
				
  		inputErrorTextHTML.className = "input_error_text";
  		inputErrorTextHTML.innerHTML = `Строка не может содержать более 250 символов`;

		textarea.after(inputErrorTextHTML);
		textarea.classList.add('input_error');
		inputError.classList.add('active');
		error++;
	}

	return error;
};

//Проверка правильности email
function emailTest(input){
	let req = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  	return !req.test(input.value);
};

//Проверка правильности телефона
function phoneTest(input){
	let req = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
	return !req.test(input.value);
};

//Shopping cart icon

//Откратие корзины при нажатии на shopping cart icon
shoppingCartIcon.addEventListener('click', function(){
	openCart();
});

//Отображение shopping cart icon
function openCartIcon(){

	let cartData = getCartData();

	//Отображение shopping cart icon, если в корзине есть товары и если корзина закрыта или скрытие, корзина пуста
	if(cartData !== null){
		if(Object.keys(cartData).length !== 0){
			if (Object.keys(cartData).length != 0 && !shoppingCart.classList.contains('active')) {
				shoppingCartIcon.classList.add('active');
			}

			//Подсчет количесва товаров и общей цены
			calcCarticonCounter();
			calcCartPrice();
		}else{
			shoppingCart.classList.remove('active');
			body.classList.remove('pop_up_open');	
			shoppingCartIcon.classList.remove('active');
		}
	}
};

//Подсчет количесва товаров
function calcCarticonCounter(){
	let cartData = getCartData(),
		carticonCounter = document.querySelector('.carticon_counter');
	
	//Отображение количесва товаров
	carticonCounter.innerText = Object.keys(cartData).length;
}
