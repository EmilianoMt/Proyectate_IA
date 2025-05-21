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

Esto iniciará un contenedor de PostgreSQL con los datos de tu archivo `.env`.

### 5. Ejecuta las migraciones de Prisma

Esto creará las tablas necesarias en la base de datos:

```bash
npx prisma migrate dev
```

### 6. Genera el cliente de Prisma

```bash
npx prisma generate
```

### 7. Inicia el servidor de desarrollo

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

---

**Notas:**
- Si agregas nuevos modelos en `prisma/schema.prisma`, recuerda ejecutar nuevamente los comandos de migración y generación de Prisma.
- No olvides que la carpeta `src/generated/` y tu archivo `.env` no deben subirse a git.

---
```## 🚀 Puesta en marcha del proyecto

Sigue estos pasos después de clonar el repositorio para tener el proyecto funcionando en tu máquina local:

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 2. Instala las dependencias

```bash
npm install
# o
yarn install
```

### 3. Configura las variables de entorno

Copia el archivo `.env.example` a `.env` y completa los valores necesarios (como la cadena de conexión a la base de datos):

```bash
cp .env.example .env
```

### 4. Levanta la base de datos con Docker

Asegúrate de tener Docker instalado y ejecuta:

```bash
docker-compose up -d
```

Esto iniciará un contenedor de PostgreSQL con los datos del archivo `.env`.

### 5. Ejecuta las migraciones de Prisma

Esto creará las tablas necesarias en la base de datos:

```bash
npx prisma migrate dev
```

### 6. Genera el cliente de Prisma

```bash
npx prisma generate
```

### 7. Inicia el servidor de desarrollo

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