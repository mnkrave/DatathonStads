# 1. Offizielles Node.js-Image als Basis
FROM node:18

# 2. Arbeitsverzeichnis im Container setzen
WORKDIR /app

# 3. package.json und package-lock.json kopieren, um Abhängigkeiten zu installieren
COPY package.json package-lock.json ./

# 4. Abhängigkeiten installieren
RUN npm install

# 5. Den gesamten Code ins Image kopieren
COPY . .

# 6. React-App builden (für den Produktivmodus)
RUN npm run build

# 7. Startbefehl: Einen Webserver für das Frontend nutzen (z. B. serve)
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]

# 8. Exponiere den Port für den Container
EXPOSE 3000