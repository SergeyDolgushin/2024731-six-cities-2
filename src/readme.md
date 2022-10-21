### Список переменных окружения:

- **PORT=5000** - номер порта для доступа клиентов
- **SALT=hsdgTThdss34L** - случайный набор символов для хэширования пароля
- **DB_HOST=127.127.127.127** - адрес БД
- **DB_USER=admin** - логин администратора БД
- **DB_PASSWORD=test** - пароль для дступа к БД
- **DB_PORT=27017** - порт по умолчанию для доступа к БД
- **DB_NAME=six-sities-db** - имя БД
- **STATIC_DIRECTORY_PATH** - путь к каталогу статических ресурсов, по умолчанию =/static
- **HOST** - хост, по умолчанию = localhost

### Работа с CLI:

- **Команда Import** - импорт тестовых данных в БД из файла .tsv
  **Формат:** - --import pathToTsvFile DB_USER DB_PASSWORD DB_HOST DB_NAME salt

#### Пример вызова команды:

- node ./dist/cli.js --import ./src/mocks/test-data.tsv admin test 127.0.0.1 six-cities-db salt
