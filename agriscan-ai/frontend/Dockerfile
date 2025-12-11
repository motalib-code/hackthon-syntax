FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
# Install all dependencies (including devDependencies like Tailwind/Vite if not in deps)
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "start"]