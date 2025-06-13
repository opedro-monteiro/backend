# 📐 Estrutura básica esperada
## No token JWT:
### O payload do token JWT deve conter o tenantId, por exemplo:
```
    {
    "sub": "user-uuid",
    "email": "user@email.com",
    "tenantId": "empresa-xpto",
    "role": "ADMIN",
    "iat": 123456789
    }
```


# 🧩 2. Qual a relação entre tenant, usuário e cliente?
## Entidade	  O que representa	                Está ligada a quem?
* **Tenant**	  Uma empresa usando seu sistema	    É o "dono" dos dados
* **User**	      Um colaborador dessa empresa	    Pertence a um tenant
* **Client**	  Um cliente atendido pela empresa	Também pertence ao tenant


## USER TESTE
{
  "email": "pedro@empresapedro.com",
  "password": "123456"
}

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmZmM0Zjk0LWU3MWYtNDIxOC1iMzUzLWViNGZmNWMyYjU5MiIsInJvbGUiOiJBRE1JTiIsImVtYWlsIjoicGVkcm9AZW1wcmVzYXBlZHJvLmNvbSIsInRlbmFudElkIjoiNDIwY2IxYWUtZmIyYS00MzNjLTg1OTItYjFhMmVjMmVkYjRkIiwiaWF0IjoxNzQ5NzUyNDQ1LCJleHAiOjE3NDk3NzQwNDV9.upumt6U9l5S4wnsccLCt1jTVVLwO-g3XbqrmGM7cipI",


  
  "id": "1ffc4f94-e71f-4218-b353-eb4ff5c2b592",
  "role": "ADMIN"
}

{
  "name": "MEMORA",
  "email": "memora@exemplo.com",
  "isActive": true,
  "contact": "(56) 91234-5678",
  "imageUrl": "https://memora.com/memora.jpg",
  "address": {
    "street": "Rua memora",
    "neighborhood": "memora",
    "number": "41",
    "state": "BA"
  }
}



[Nest] 157216  - 06/12/2025, 5:12:42 PM     LOG [NestApplication] Nest application successfully started +49ms
VALOR CRIADO EM CREATE COSTUMER SERVICE {
  id: 'd6cfbf9a-c329-4adc-b5be-32a7c50a7eef',
  tenantId: '420cb1ae-fb2a-433c-8592-b1a2ec2edb4d',
  publicId: 'CL-2025-0002',
  name: 'MEMORA',
  email: 'memora@exemplo.com',
  isActive: true,
  contact: '(56) 91234-5678',
  imageUrl: 'https://memora.com/memora.jpg',
  createdAt: 2025-06-12T20:12:59.782Z,
  updatedAt: 2025-06-12T20:12:59.782Z,
  address: {
    id: 'bdada15c-0ee4-49f5-b019-16747f0afc48',
    street: 'Rua memora',
    neighborhood: 'memora',
    number: '41',
    state: 'BA',
    clienteId: 'd6cfbf9a-c329-4adc-b5be-32a7c50a7eef'
  }
}



| Etapa                               | Tempo Estimado |
| ----------------------------------- | -------------- |
| 🏁 Setup inicial (Docker, Prisma)   | 0.5 dia        |
| 🔐 Auth (JWT + Google OAuth2)       | 1.5 dias       |
| 🛡️ RBAC e Multitenancy             | 1 dia          |
| 📇 CRUD Usuários e Clientes         | 1.5 dias       |
| 🖼️ Frontend com Next.js + Tailwind | 1.5 dias       |
| 📊 Dashboard (KPIs)                 | 0.5 dia        |
| 🚢 Dockerização e Deploy            | 1 dia          |
| 📝 Documentação e testes básicos    | 0.5 dia        |


🧮 Total Estimado:
7 a 8 dias úteis

Se for tempo integral: 4 a 5 dias intensos

📌 Sugestões
Priorize o core (Auth, Multitenancy, CRUD) nos primeiros 3 dias.

Faça o deploy antes de terminar o frontend por completo (para garantir tempo de ajustes).

Evite diferenciais no início (Microsoft/GitHub login, testes), só se sobrar tempo.



# 📘 Desafio Técnico: Desenvolvedor Full Stack (NextJS + NestJS)

## 🧠 Objetivo

Avaliar habilidades full stack com foco em:

* **NextJS (Frontend)**
* **NestJS (Backend)**
* **TypeScript**, **Node.js**, **Docker**, **JWT**, **RBAC**, **OAuth2**

---

## ✅ Requisitos da Aplicação

### 1. 🔐 Autenticação e Autorização

* Login via:

  * Email/senha (JWT)
  * Google (OAuth2 – obrigatório)
  * Microsoft e GitHub (diferenciais)
* Tokens:

  * JWT + refresh token
* RBAC (Role-Based Access Control):

  * ADMIN: gerencia usuários e clientes
  * USER: gerencia apenas clientes, visualiza usuários
  * GUEST: apenas visualiza clientes

### 2. 🏢 Multitenancy

* Cada tenant identificado por `tenantId`
* `tenantId` incluído no JWT
* Isolamento de dados por tenant (clientes, usuários)

### 3. 📇 CRUD de Clientes

* Operações: Criar, Editar, Visualizar, Deletar

* **Modelo Cliente:**

  ```ts
  id: string (UUID)
  tenantId: string
  publicId: string
  name: string
  email: string
  isActive: boolean
  contact: string
  address: {
    street: string
    neighborhood: string
    number: string
    state: string
  }
  imageUrl: string
  createdAt: Date
  updatedAt: Date
  ```

* **Modelo Usuário:**

  ```ts
  id: string (UUID)
  tenantId: string
  name: string
  email: string
  password: string
  refreshToken: string
  role: 'ADMIN' | 'USER' | 'GUEST'
  createdAt: Date
  updatedAt: Date
  ```

### 4. 📊 Dashboard (KPIs)

* Total de clientes registrados
* Total de clientes ativos

### 5. 🐳 Dockerização

* Dockerfile e docker-compose com:

  * app (backend + frontend)
  * banco de dados: PostgreSQL ou MySQL

### 6. 📦 Extras / Diferenciais

* Login Microsoft e GitHub (OAuth2)
* UI com TailwindCSS
* Testes (unitários, e2e)

---

## 🗂️ Entregáveis

* Repositório no GitHub
* Instruções de execução claras (README)
* Documentação da API (Swagger ou Postman)
* Deploy:

  * Frontend: Vercel
  * Backend: Render
* Vídeo de apresentação (opcional)

---

## 🧭 Cronograma Sugerido (7 dias)

| Dia | Etapas                   | Detalhes                                                                                 |
| --- | ------------------------ | ---------------------------------------------------------------------------------------- |
| 1   | Setup & Multitenancy     | Projeto NestJS + NextJS + banco PostgreSQL, estrutura multi-tenant via `tenantId` no JWT |
| 2   | Autenticação JWT         | Login com email/senha, geração e renovação de JWT/refreshToken                           |
| 3   | OAuth2 com Google        | Login social com Google, uso da biblioteca `passport-google-oauth20`                     |
| 4   | RBAC                     | Controle de acesso via roles, guards personalizados no NestJS                            |
| 5   | CRUD Cliente & Dashboard | CRUD completo, filtro por tenant, dashboard com contadores                               |
| 6   | Frontend NextJS          | Integração com backend, TailwindCSS, páginas de login, dashboard e cliente               |
| 7   | Docker + Deploy + Docs   | Dockerfile, docker-compose, Swagger/Postman, deploy Vercel + Render                      |

---

## 📚 Guias e Links Úteis

### 🔐 Autenticação e OAuth2

* [NestJS + JWT Auth](https://docs.nestjs.com/security/authentication)
* [Passport.js Google OAuth](http://www.passportjs.org/packages/passport-google-oauth20/)
* [JWT com Refresh Token](https://dev.to/kingisaac95/refresh-token-in-nestjs-1c4n)

### 🔐 RBAC

* [RBAC com Guards no NestJS](https://docs.nestjs.com/guards#role-based-authorization)

### 🏢 Multitenancy

* [Multitenancy com Prisma](https://www.prisma.io/docs/guides/other/multitenancy)
* [NestJS Multi-tenant Strategies](https://dev.to/nestjs/multi-tenancy-in-nestjs-1c8e)

### 🐳 Docker

* [Dockerizando app Node/NestJS](https://docs.nestjs.com/recipes/docker)
* [Docker Compose com PostgreSQL](https://docs.docker.com/compose/)

### ☁️ Deploy

* [Vercel (NextJS)](https://vercel.com/docs)
* [Render (NestJS)](https://render.com/docs/deploy-node-express-app)

### 🔧 Outras libs úteis

* `class-validator`, `passport`, `@nestjs/passport`, `@nestjs/jwt`
* `prisma`, `@prisma/client`, `bcrypt`, `multer`, `zod`

---

## 🧠 Dicas Finais

* Comece validando toda a estrutura multi-tenant e RBAC.
* Mantenha os tokens seguros e válidos com refresh.
* Use DTOs e interceptors para isolar tenants.
* Priorize o funcionamento completo antes dos diferenciais.
* Mantenha commits pequenos e com mensagens claras.

---