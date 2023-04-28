<h1 align="center">УГМК Тестовое Приложение</h1>


<div align="center">

Анализ данных


[![Build Status](https://badgen.net/github/status/kelektiv/node-cron?icon=github)](https://badgen.net/github/status/kelektiv/node-cron)
[![Build Checks](https://badgen.net/github/checks/kelektiv/node-cron?icon=github)](https://badgen.net/github/checks/kelektiv/node-cron)
[![Dependency Status](https://badgen.net/david/dep/kelektiv/node-cron)](https://badgen.net/david/dev/kelektiv/node-cron)
[![Code Coverage](https://badgen.net/codecov/c/github/kelektiv/node-cron?icon=codecov)](https://badgen.net/codecov/c/github/kelektiv/node-cron)
[![Known Vulnerabilities](https://snyk.io/test/github/kelektiv/node-cron/badge.svg)](https://snyk.io/test/github/kelektiv/node-cron)
[![Minified size](https://badgen.net/bundlephobia/min/cron)](https://badgen.net/bundlephobia/min/cron)
[![Minzipped size](https://badgen.net/bundlephobia/minzip/cron)](https://badgen.net/bundlephobia/minzip/cron)
 



</div>
<hr/>
Это проект, разработанный с использованием React, который включает в себя приложение и сервер. Приложение отображает график производства двух типов продукции на двух фабриках по месяцам с возможностью фильтрации и отображает круговую диаграмму суммарного производства по каждому типу продукции на странице деталей.

<div align="center">

![Пример картинки](images/main.png)

![Пример картинки](images/details.png)

</div>

## Установка и запуск
<hr/>

### Установка зависимостей

Для установки всех необходимых зависимостей выполните следующую команду:

`npm install`

### Запуск приложения

Чтобы запустить приложение на локальной машине, выполните следующую команду:

`npm run start`

Приложение будет доступно по адресу: localhost:3000

## Docker
<hr/>

### Создание Docker образа

Для создания Docker образа с именем ugmk_test_app выполните следующую команду:

`npm run dockerize`

### Запуск контейнера
Для запуска контейнера с именем ugmk_test_app выполните следующую команду:

`npm run start-container`

Приложение будет доступно по адресу: localhost:3000

После завершения работы приложения контейнер будет автоматически удалён.

## Сервер
<hr/>

Сервер предоставляет два эндпоинта:
- `/products` - возвращает информацию о типах продукции и фабриках по месяцам.
- `/details/:factoryId/:month` - возвращает сумму всех произведённых товаров одной фабрикой за определённый месяц.

## Функциональность приложения
<hr/>

- График, отражающий помесячное количество производимой продукции двух типов двух фабрик.
- Возможность фильтрации по типу продукции (все, продукт 1, продукт 2).
- При нажатии на определённую колонку графика открывается страница с круговой диаграммой, показывающей суммарное производство каждого типа продуктов для выбранной фабрики.