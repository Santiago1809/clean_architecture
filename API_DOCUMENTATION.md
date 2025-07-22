# API Documentation

## Endpoints de Autenticación

### 1. Registro de Usuario

**POST** `/api/auth/signup`

Registra un nuevo usuario en el sistema.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "Password123!"
}
```

**Validaciones:**
- `name`: Requerido
- `email`: Requerido y debe ser un email válido
- `password`: Requerido, mínimo 8 caracteres, debe contener al menos: 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial

**Respuesta exitosa (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f123abc456789012345678",
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

### 2. Inicio de Sesión

**POST** `/api/auth/signin`

Autentica un usuario existente.

**Body:**
```json
{
  "email": "juan@example.com",
  "password": "Password123!"
}
```

**Validaciones:**
- `email`: Requerido y debe ser un email válido
- `password`: Requerido

**Respuesta exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f123abc456789012345678",
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

### 3. Obtener Usuarios (Endpoint Protegido)

**GET** `/api/auth/`

Endpoint protegido que requiere autenticación mediante JWT.

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta exitosa (200):**
```json
{
  "message": "Users endpoint accessed successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Errores Comunes

### 400 - Bad Request
```json
{
  "error": "Email is required"
}
```

### 401 - Unauthorized
```json
{
  "error": "Token not provided"
}
```

### 500 - Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Ejemplo de uso con curl

### Registro
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "Password123!"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "Password123!"
  }'
```

### Acceder a endpoint protegido
```bash
curl -X GET http://localhost:3000/api/auth/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```
