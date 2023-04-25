FROM node:18

WORKDIR /app 

COPY package.json . 

RUN npm i 

COPY . .

ENV  PORT=5173

EXPOSE 5173 

CMD ["npm", "run", "vite"]