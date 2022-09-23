-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 21 2022 г., 16:03
-- Версия сервера: 8.0.24
-- Версия PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `eco_delivery_shop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`, `category_name`) VALUES
(1, 'fruit', 'Фрукты и ягоды'),
(2, 'vegetables', 'Овощи'),
(3, 'meat', 'Мясо и птица'),
(4, 'fish', 'Рыба'),
(5, 'dairy', 'Молочные продукты'),
(6, 'eggs', 'Яйца'),
(7, 'recipe', 'Рецепты');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `adress` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `comment` text NOT NULL,
  `product_id` int DEFAULT NULL,
  `product_amount` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `full_name`, `adress`, `email`, `phone`, `comment`, `product_id`, `product_amount`) VALUES
(1, 'Марина', 'Пермь', 'marina@mail.ru', '89003214444', '', 33, 1),
(2, 'Марина', 'Москва', 'marina_1@mail.ru', '89103214445', 'В первой половине дня', 22, 1),
(3, 'Марина', 'Москва', 'marina_1@mail.ru', '89103214445', 'В первой половине дня', 33, 1),
(4, 'Мария', 'Пермь', 'maria@mail.ru', '89003214411', '', 7, 1),
(5, 'Мария', 'Пермь', 'maria@mail.ru', '89003214411', '', 8, 1),
(6, 'Марина', 'Пермь', 'marina@mail.ru', '89003214444', '', 1, 1),
(7, 'Марина', 'Пермь', 'marina@mail.ru', '89003214444', '', 31, 1),
(8, 'Марина', 'Пермь', 'marina@mail.ru', '89003214444', '', 32, 1),
(9, 'Марина', 'Пермь', 'marina@mail.ru', '89003214444', '', 31, 1),
(10, 'Марина', 'Пермь', 'marina@mail.ru', '89003214444', '', 32, 1),
(11, 'Марина', 'Пермь', 'marina@mail.ru', '89003214444', '', 6, 1),
(12, 'Марина', 'Пермь', 'marina@mail.ru', '89003214444', '', 4, 1),
(13, 'Марина', 'Пермь', 'marina@mail.ru', '89003214444', '', 2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `short_description` varchar(100) NOT NULL,
  `long_description` text NOT NULL,
  `price` decimal(8,0) DEFAULT NULL,
  `image` varchar(100) NOT NULL,
  `category_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `short_description`, `long_description`, `price`, `image`, `category_id`) VALUES
(1, 'Яблоки', 'Яблоки «Антоновка» сочные и&nbsp;свежие&nbsp;1&nbsp;кг.', '<p>Яблоки «Антоновка» сочные и&nbsp;свежие&nbsp;1&nbsp;кг.</p>', '60', 'img/apple.jpg', 1),
(2, 'Груши', 'Груши «Желтые» сочные и&nbsp;свежие&nbsp;1&nbsp;кг.', '<p>Груши «Желтые» сочные и&nbsp;свежие&nbsp;1&nbsp;кг.</p>', '65', 'img/pear.jpg', 1),
(3, 'Клубника', 'Клубника «Крупная» сочная и&nbsp;свежая 1&nbsp;кг.', '<p>Клубника «Крупная» сочная и&nbsp;свежая 1&nbsp;кг.</p>', '70', 'img/strawberry.jpg', 1),
(4, 'Сливы', 'Сливы «Круглые» сочные и&nbsp;свежие&nbsp;1&nbsp;кг.', '<p>Сливы «Круглые» сочные и&nbsp;свежие&nbsp;1&nbsp;кг.</p>', '60', 'img/plum.jpg', 1),
(5, 'Арбузы', 'Арбузы «Розовые» сочные и&nbsp;свежие&nbsp;1 кг.', '<p>Арбузы «Розовые» сочные и&nbsp;свежие&nbsp;1 кг.</p>', '20', 'img/watermelon.jpg', 1),
(6, 'Дыни', 'Дыни «Круглые» сочные и&nbsp;свежие&nbsp;1&nbsp;кг.', '<p>Дыни «Круглые» сочные и&nbsp;свежие&nbsp;1&nbsp;кг.</p>', '30', 'img/melon.jpg', 1),
(7, 'Помидоры', 'Помидоры «Круглые» сочные и&nbsp;свежие 1&nbsp;кг.', '<p>Помидоры «Круглые» сочные и&nbsp;свежие 1&nbsp;кг.</p>', '75', 'img/tomato.jpg', 2),
(8, 'Огурцы', 'Огурцы «Зеленые» сочные и&nbsp;свежие&nbsp;1&nbsp;кг.', '<p>Огурцы «Зеленые» сочные и&nbsp;свежие&nbsp;1&nbsp;кг.</p>', '60', 'img/cucumber.jpg', 2),
(9, 'Перец', 'Перец «Болгарский» сочный и&nbsp;свежий 1&nbsp;кг.', '<p>Перец «Болгарский» сочный и&nbsp;свежий 1&nbsp;кг.</p>', '85', 'img/peper.jpg', 2),
(10, 'Морковь', 'Морковь «Длинная» сочная и&nbsp;свежая&nbsp;1&nbsp;кг.', '<p>Морковь «Длинная» сочная и&nbsp;свежая&nbsp;1&nbsp;кг.</p>', '55', 'img/carrot.jpg', 2),
(11, 'Кабачок', 'Кабачок «Зеленый» сочный и&nbsp;свежий&nbsp;1&nbsp;кг.', '<p>Кабачок «Зеленый» сочный и&nbsp;свежий&nbsp;1&nbsp;кг.</p>', '45', 'img/zucchini.jpg', 2),
(12, 'Лук', 'Лук «Красный» сочный и свежий 1&nbsp;кг.', '<p>Лук «Красный» сочный и свежий 1&nbsp;кг.</p>', '15', 'img/onion.jpg', 2),
(13, 'Телятина', 'Телятина сочная и свежая 1&nbsp;кг.', '<p>Телятина сочная и свежая 1&nbsp;кг.</p>', '295', 'img/veal.jpg', 3),
(14, 'Курица', 'Курица сочная и свежая 1&nbsp;кг.', '<p>Курица сочная и свежая 1&nbsp;кг.</p>', '180', 'img/chiken.jpg', 3),
(15, 'Говядина', 'Говядина сочная и свежая 1&nbsp;кг.', '<p>Говядина сочная и свежая 1&nbsp;кг.</p>', '210', 'img/beef.jpg', 3),
(16, 'Свинина', 'Свинина сочная и свежая 1&nbsp;кг.', '<p>Свинина сочная и свежая 1&nbsp;кг.</p>', '200', 'img/pork.jpg', 3),
(17, 'Баранина', 'Баранина сочная и свежая 1&nbsp;кг.', '<p>Баранина сочная и свежая 1&nbsp;кг.</p>', '235', 'img/sheepmeat.jpg', 3),
(18, 'Утка', 'Утка сочная и свежая 1&nbsp;кг.', '<p>Утка сочная и свежая 1&nbsp;кг.</p>', '195', 'img/duck.jpg', 3),
(19, 'Сом', 'Сом «Речной» свежий 1&nbsp;кг.', '<p>Сом «Речной» свежий 1&nbsp;кг.</p>', '165', 'img/catfish.jpg', 4),
(20, 'Сазан', 'Сазан «Речной» свежий 1&nbsp;кг.', '<p>Сазан «Речной» свежий 1&nbsp;кг.</p>', '180', 'img/sazan.jpg', 4),
(21, 'Лещ', 'Лещ «Речной» свежий 1&nbsp;кг.', '<p>Лещ «Речной» свежий 1&nbsp;кг.</p>', '205', 'img/bream.jpg', 4),
(22, 'Карась', 'Карась «Речной» свежий 1&nbsp;кг.', '<p>Карась «Речной» свежий 1&nbsp;кг.</p>', '220', 'img/crucian.jpg', 4),
(23, 'Плотва', 'Плотва «Речная» свежая 1&nbsp;кг.', '<p>Плотва «Речная» свежая 1&nbsp;кг.</p>', '230', 'img/roach.jpg', 4),
(24, 'Карп', 'Карп «Речной» свежий 1&nbsp;кг.', '<p>Карп «Речной» свежий 1&nbsp;кг.</p>', '195', 'img/carp.jpg', 4),
(25, 'Молоко', 'Молоко коровье, свежее 1&nbsp;л.', '<p>Молоко коровье, свежее 1&nbsp;л.</p>', '65', 'img/milk.jpg', 5),
(26, 'Сыр', 'Сыр козий, свежий 300&nbsp;г.', '<p>Сыр козий, свежий 300&nbsp;г.</p>', '105', 'img/cheese.jpg', 5),
(27, 'Творог', 'Творог свежий 300&nbsp;г.', '<p>Творог свежий 300&nbsp;г.</p>', '90', 'img/сottage_cheese.jpg', 5),
(28, 'Кефир', 'Кефир свежий 300&nbsp;г.', '<p>Кефир свежий 300&nbsp;г.</p>', '85', 'img/kefir.jpg', 5),
(29, 'Сметана', 'Сметана свежая 300&nbsp;г.', '<p>Сметана свежая 300&nbsp;г.</p>', '80', 'img/sour_cream.jpg', 5),
(30, 'Йогурт', 'Йогурт с кусочками клубники, свежий&nbsp;300&nbsp;г.', '<p>Йогурт с кусочками клубники, свежий&nbsp;300&nbsp;г.</p>', '95', 'img/yogurt.jpg', 5),
(31, 'Куриные', 'Яйца куриные, свежие 10&nbsp;шт.', '<p>Яйца куриные, свежие 10&nbsp;шт.</p>', '65', 'img/chicken_eggs.jpg', 6),
(32, 'Утиные', 'Яйца утиные, свежие 10&nbsp;шт.', '<p>Яйца утиные, свежие 10&nbsp;шт.</p>', '75', 'img/duck_eggs.jpg', 6),
(33, 'Перепелиные', 'Яйца перепелиные, свежие 10&nbsp;шт.', '<p>Яйца перепелиные, свежие 10&nbsp;шт.</p>', '90', 'img/quail_eggs.jpg', 6),
(34, 'Творожно-тыквенная запеканка в мультиварке', 'Простой и быстрый рецепт', '<p><strong>Понадобится:</strong></p>\r\n								<ul><!--Неупоряоченный список-->\r\n									<li>500 г творога</li>\r\n									<li>100 г сметаны</li>\r\n									<li>0.5 ст. манной крупы</li>\r\n									<li>0.5 ст. сахара</li>\r\n									<li>3 яйца</li>\r\n									<li>1 ч.л. разрыхлителя</li>\r\n									<li>200 г тыквы</li>\r\n								</ul>\r\n								<br>\r\n								<ol type=\"1\"><!--Упоряоченный список с цифрами-->\r\n									<li>Тыкву натереть на мелкой терке.</li>\r\n									<li>Яйца разделить на желтки и белки.</li>\r\n									<li>Соединить творог, сметану, манную крупу, яичные желтки, разрыхлитель и сахар.</li>\r\n									<li>Хорошо все перемешать.</li>\r\n									<li>Яичные белки взбить в крепкую пену.</li>\r\n									<li>Добавляем тыкву и взбитые яичные белки к творожной массе.</li>\r\n									<li>Аккуратно перемешиваем, стараясь не осадить взбитые белки.</li>\r\n									<li>Кастрюлю мультиварки смазываем сливочным маслом.</li>\r\n									<li>Выливаем в кастрюлю творожную массу.</li>\r\n									<li>Включаем режим «Выпечка» на 50−60 минут, затем оставить на подогреве на 50 минут, после чего выключить мультиварку и не открывать крышку еще 10 минут. Оставить в кастрюле до полного остывания.</li>\r\n									<li>После чего извлекаем творожную запеканку с помощью поддона для варки на пару.</li>\r\n								</ol>\r\n								<p><strong>Приятного аппетита!</strong></p>', NULL, 'img/pumpkin_pie.jpg', 7),
(35, 'Геркулесовая каша с грецкими орехами и курагой', 'Полезный завтрак за 20 минут', '<p><strong>Понадобится:</strong></p>\r\n								<ul>\r\n									<li>1 ст. геркулесовой каши</li>\r\n									<li>2 ст. воды</li>\r\n									<li>1 ст. миндального молока</li>\r\n									<li>щепотка соли</li>\r\n									<li>горсть кураги</li>\r\n									<li>горсть грецких орехов</li>\r\n								</ul>\r\n								<br>\r\n								<ol type=\"1\">\r\n									<li>Смешать в сотейнике воду с миндальным молоком и довести до кипения. Добавить геркулес и щепотку соли.</li>\r\n									<li>Варить, периодически помешивая 20−30 минут.</li>\r\n									<li>Подавать кашу горячей, дополнив нарезанной курагой и грецкими орехами.</li>\r\n								</ol>\r\n								<p><strong>Приятного аппетита!</strong></p>', NULL, 'img/porridge.jpg', 7),
(36, 'Куриные маффины с творогом и сыром', 'Необычная альтернатива запеченным котлетам', '<p><strong>Понадобится:</strong></p>\r\n								<ul>\r\n									<li>500 г куриного филе (или фарша)</li>\r\n									<li>1 луковица</li>\r\n									<li>1 яйцо</li>\r\n									<li>соль, перец по вкусу</li>\r\n									<li>сухой чеснок по вкусу</li>\r\n									<li>100 г. твёрдого сыра</li>\r\n								</ul>\r\n								<p><strong>Для начинки:</strong></p>\r\n								<ul>\r\n									<li>150 г. творога</li>\r\n									<li>100 г. плавленого сыра</li>\r\n									<li>соль, перец по вкусу</li>\r\n								</ul>\r\n								<p><strong>А также:</strong></p>\r\n								<ul>\r\n									<li>зелень для подачи</li>\r\n								</ul>\r\n								<br>\r\n								<ol type = \"1\">\r\n									<li>Куриное филе перемолоть с луком в мясорубке или в блендере.</li>\r\n									<li>Добавить соль, перец, яйцо и сухой чеснок.</li>\r\n									<li>Добавить натёртый на средней тёрке сыр. Перемешать.</li>\r\n									<li>В отдельной миске соединить творог и натёртый на тёрке плавленый сыр.<br>Добавить соль и перец по вкусу.<br><strong>Совет</strong><br>Плавленый сыр можно брать с добавками грибов, бекона или зелени.</li>\r\n									<li>Небольшие порции фарша вложить в формы для кексов и пальцами распределить его по дну и бокам формочки.</li>\r\n									<li>Наполнить кексы сырно-творожной начинкой.</li>\r\n									<li>Если формочек у вас нет, то можно сформировать фарш в виде ватрушек или котлет с сырно-творожной начинкой.</li>\r\n									<li>Выпекать в заранее разогретой духовке при температуре 180 градусов 30-35 минут.</li>\r\n									<li>Подавать с гарниром или овощами.</li>\r\n								</ol>\r\n								<p><strong>Приятного аппетита!</strong></p>', NULL, 'img/chicken_muffin.jpg', 7);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
