# Trabajo Final Integrador - Programación IV

**Facultad de Ciencias de la Administración - UNER**
**1er Cuatrimestre 2026**

* **Grupo:** Q
* **Integrantes: Polo Jorge Lautaro**

---

## Instrucciones para usar esta app web

### 1. Crear un archivo .env
Cree un archivo `.env` en la raíz del proyecto backend (`api`) con las credenciales correspondientes a su motor de base de datos:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario_de_postgres
DB_PASSWORD=tu_contraseña_de_postgres
DB_NAME=TP-Integrador
JWT_SECRET=super_secreta_clave_fcad_uner_2026
```

### 2.Para la creacion de la base de datos haga
```
psql -U postgres -c "CREATE DATABASE \"TP-Integrador\";"
psql -U postgres -d "TP-Integrador" -f api/db/schema.sql
```

### 3. Para levantar el backend haga
```
cd api
npm install
npm start
```
### 4.Para levantar el frontend haga
```
cd web
npx http-server -p 4000
```