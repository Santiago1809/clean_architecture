# Clean Architecture Example

Un ejemplo completo de implementación de Clean Architecture con TypeScript, Express y MongoDB.

## Características

- ✅ Autenticación completa (registro y login)
- ✅ Casos de uso bien definidos
- ✅ Separación clara de responsabilidades
- ✅ Validación robusta de datos
- ✅ Manejo de errores personalizado
- ✅ JWT para autenticación
- ✅ Middleware de autenticación
- ✅ Encriptación de contraseñas con bcrypt

## Arquitectura

El proyecto sigue los principios de Clean Architecture con las siguientes capas:

```
src/
├── domain/           # Entidades, casos de uso, repositorios (interfaces)
├── infrastructure/   # Implementaciones concretas, mappers
├── presentation/     # Controladores, rutas, middleware
├── data/            # Modelos de base de datos
└── config/          # Configuraciones y adaptadores
```

## Instalación

```bash
bun install
```

## Ejecución

```bash
bun run dev
```

El servidor estará disponible en `http://localhost:3000`

## Variables de entorno

Crea un archivo `.env` con las siguientes variables:

```env
PORT=3000
MONGODB_URL=mongodb://mongo-user:mongo-password@localhost:27017/mydatabase
JWT_SECRET=your-super-secret-jwt-key
```

## API Endpoints

Ver [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) para detalles completos de la API.

### Principales endpoints:
- `POST /api/auth/signup` - Registro de usuario
- `POST /api/auth/signin` - Inicio de sesión
- `GET /api/auth/` - Endpoint protegido (requiere JWT)

## Casos de Uso Implementados

### Autenticación
- **RegisterUser**: Registra un nuevo usuario con validaciones
- **LoginUser**: Autentica un usuario existente
- **GetUserProfile**: Obtiene el perfil del usuario (preparado para expansión)

## Tecnologías

- **Runtime**: Bun
- **Framework**: Express.js
- **Base de datos**: MongoDB con Mongoose
- **Autenticación**: JWT + bcrypt
- **Validaciones**: Regex personalizados
- **Lenguaje**: TypeScript

Este proyecto fue creado usando `bun init` en bun v1.2.18. [Bun](https://bun.sh) es un runtime rápido todo-en-uno para JavaScript.
