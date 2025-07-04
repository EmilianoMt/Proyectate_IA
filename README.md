## 🚀 Como ejecutar el proyecto

Pasos para ejecutar el proyecto de manera adecuada

### 1. Clona el repositorio

```bash
git clone https://github.com/EmilianoMt/Proyectate_IA.git
cd Proyectate_IA
```

### 2. Instala las dependencias

```bash
npm install
# o
yarn install
```

### 3. Configura las variables de entorno

Copia el archivo `.env.example` a `.env` y completa los valores necesarios

```bash
cp .env.example .env
```

### 4. Levanta la base de datos con Docker

Asegúrate de tener Docker instalado y ejecuta:

```bash
docker-compose up -d
```

Esto iniciará un contenedor de MongoDB con los datos del archivo `.env`.


### 5. Genera el cliente de Prisma

```bash
npx prisma generate
```

### 6. Inicia el servidor de desarrollo

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

---

**Notas:**
- Si agregas nuevos modelos en `prisma/schema.prisma`, recuerda ejecutar nuevamente los comandos de migración y generación de Prisma.

---
