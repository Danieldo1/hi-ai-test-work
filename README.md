# Документация по использованию чат-приложения

## Установка

1. Клонируйте репозиторий на ваш компьютер:
```
git clone https://github.com/Danieldo1/hi-ai-test-work
```

2. Перейдите в директорию проекта:
   ```
   cd hi-ai-test-work
   ```

### Бэкенд (Nest.js)

1. Перейдите в директорию бэкенда:
   ```
   cd backend
   ```

2. Установите зависимости:
   ```
   npm install
   ```

3. Создайте .env в дириктории backend/ c этими полями:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME='db_username' // follow step 4
DB_PASSWORD='your_password' // follow step 4
DB_NAME='your_db_name' // follow step 4
OPENAI_API_KEY='sk-proj-...your api key' // last step in readme

//поля должна совподать с следушим шагом для запуска ДБ
```

4. Запустить PostgreSQL локально(Terminal):

- 4.1 На MacOs (Homebrew желательно что бы было установлено):
 ```bash
 brew install postgresql
 ```
- 4.2 Запуск сервиса
```bash
brew services start postgresql
```
- 4.3 Доступ к PostgreSQL
```bash
psql postgres
```
- 4.4 Создание ДБ
```sql
CREATE DATABASE 'your_db_name';
```
- 4.5 Создать владельца ДБ с полными правами для владения
```sql
CREATE USER db_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE your_db_name TO db_username;
```

- 4.6 Закрыть ДБ (после использования только)
```
\q
```


5. Запустите сервер разработки:
   ```
   npm run start:dev
   ```

### Фронтенд (React)

1. Перейдите в директорию фронтенда:
   ```
   cd frontend
   ```

2. Установите зависимости:
   ```
   npm install
   ```

3. Запустите сервер разработки:
   ```
   npm start
   ```

### Outcome

- Сервер должен слушать на порту:3001
- Фронт должен быть на порту :3000
- Посгре должен быть на порту 5432
### [Если нет/или что то не работает пишите мне попробуем разобраться ](mailto:daniel.speranskiy@gmail.com?subject=Hi-AI-Problem)

### Пожалуйста вставтее ваш ключ от OpenAi (либо будет давать error)
## Получить ключ OpenAI

#### Переходим по [этой ссылке](https://openai.com/) -> Porducts -> API Login -> API (из выбора двух полей-правое поле) -> в право вверхнем углу 'Dashboard' -> API keys (в левой чясти экрана) -> Create new secret key -> заполняем форму как угодно и копируем ключ

