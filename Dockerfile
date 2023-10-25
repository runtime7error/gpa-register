# Use a imagem oficial do Node.js para Vue
FROM node:14 AS build

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do aplicativo para o contêiner
COPY . .

# Compile o projeto Vue
RUN npm run build

# Use uma imagem nginx como imagem final
FROM nginx:latest

# Copie os arquivos de compilação do Vue para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta 80 (a porta padrão do Nginx)
EXPOSE 80

# Inicie o servidor Nginx quando o contêiner for executado
CMD ["nginx", "-g", "daemon off;"]
