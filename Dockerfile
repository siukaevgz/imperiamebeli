# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы
COPY . .

RUN npx prisma generate
RUN npx prisma db push
RUN npx prisma db seed
# Сборка приложения
RUN npm run build

# Экспортируем порт, на котором будет работать приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
