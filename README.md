# 🏢 Multi-Tenant CRM API - NestJS ![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

API para gerenciamento de clientes e usuários em múltiplos tenants (empresas), com autenticação JWT, OAuth2 (Google) e RBAC (Role-Based Access Control).
## 🚀 Tecnologias

![Tecnologias](https://skillicons.dev/icons?i=typescript,nestjs,nodejs,postgres,docker,prisma)

---

## 🧠 Sobre o Projeto

Este projeto foi desenvolvido como desafio técnico e tem como objetivo oferecer uma API robusta para múltiplas empresas, onde cada tenant possui seus próprios dados isolados.

O backend oferece:

* Multitenancy
* Autenticação JWT e Google OAuth2
* Controle de acesso por papéis (ADMIN, USER, GUEST)
* CRUD de Clientes
* Deploy via Docker e Render

---

## 🎯 Funcionalidades

* 🔐 **Autenticação**

  * Login via Email/Senha (JWT + Refresh Token)
  * Login via Google (OAuth2)
* 🏢 **Multitenancy**

  * Cada tenant possui usuários e clientes isolados
* 🔑 **RBAC (Controle de Acesso)**

  * ADMIN → Gerencia usuários e clientes
  * USER → Gerencia apenas clientes
  * GUEST → Visualiza clientes
* 📇 **CRUD Completo de Clientes**
* 📊 **Dashboard**

  * KPIs de clientes ativos e totais
* 🚢 **Dockerização e Deploy**

  * Deploy simplificado via Docker e Render

---

## 🔗 Índice

* [🚀 Tecnologias](#-tecnologias)
* [🧠 Sobre o Projeto](#-sobre-o-projeto)
* [🎯 Funcionalidades](#-funcionalidades)
* [🗺️ Estrutura de Dados](#️-estrutura-de-dados)
* [⚙️ Instalação e Execução Local](#️-instalação-e-execução-local)
* [☁️ Deploy com Docker Hub e Render](#️-deploy-com-docker-hub-e-render)
* [🔐 Payload do Token JWT](#-payload-do-token-jwt)
* [🧩 Relação entre Tenant, Usuário e Cliente](#-relação-entre-tenant-usuário-e-cliente)
* [📜 Exemplos de Dados](#-exemplos-de-dados)
* [🧭 Cronograma Estimado](#-cronograma-estimado)
* [📞 Contato](#-contato)

---

## 🗺️ Estrutura de Dados

### 🔗 **Modelo Cliente**

```ts
{
  id: string (UUID)
  tenantId: string
  publicId: string
  name: string
  email: string
  isActive: boolean
  contact: string
  imageUrl: string
  address: {
    street: string
    neighborhood: string
    number: string
    state: string
  }
  createdAt: Date
  updatedAt: Date
}
```

### 🔗 **Modelo Usuário**

```ts
{
  id: string (UUID)
  tenantId: string
  name: string
  email: string
  password: string
  refreshToken: string
  role: 'ADMIN' | 'USER' | 'GUEST'
  createdAt: Date
  updatedAt: Date
}
```

---

## ⚙️ Instalação e Execução Local

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/seu-projeto.git
cd seu-projeto
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example` com suas credenciais:

```
DATABASE_URL=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### 4. Suba o banco com Docker

```bash
docker-compose up -d
```

### 5. Rode as migrações do Prisma

```bash
npx prisma migrate dev
```

### 6. Rode o projeto localmente

```bash
npm run start:dev
```

API rodando em `http://localhost:3000`

---

## ☁️ Deploy com Docker Hub e Render

### 🔧 Build da imagem

```bash
docker build -t meu-app-nest .
```

### 🔗 Logar no Docker Hub

```bash
docker login
```

### 🏷️ Taguear a imagem

```bash
docker tag meu-app-nest seu-usuario-docker/meu-app-nest:latest
```

### 📤 Subir para o Docker Hub

```bash
docker push seu-usuario-docker/meu-app-nest:latest
```

### 🚀 No Render

1. **New Web Service → Deploy an existing image from a registry**
2. Preencha:

   * **Image URL:** `seu-usuario-docker/meu-app-nest:latest`
   * **Port:** `3000`
   * **Start Command:** (deixe em branco se já tem no Dockerfile)
3. Configure as variáveis de ambiente
4. Clique em **"Create Web Service"**

---

## 🔐 Payload do Token JWT

O payload do JWT inclui o `tenantId` para identificar o tenant do usuário.

```json
{
  "sub": "user-uuid",
  "email": "user@email.com",
  "tenantId": "empresa-xpto",
  "role": "ADMIN",
  "iat": 123456789
}
```

---

## 🧩 Relação entre Tenant, Usuário e Cliente

| Entidade   | O que representa              | Está ligada a quem?             |
| ---------- | ----------------------------- | ------------------------------- |
| **Tenant** | Uma empresa que usa o sistema | É o dono dos dados              |
| **User**   | Um colaborador da empresa     | Pertence a um tenant            |
| **Client** | Cliente atendido pela empresa | Também pertence ao mesmo tenant |

---

## 📜 Exemplos de Dados

### 🔑 Usuário de Teste

```json
{
  "email": "pedro@empresapedro.com",
  "password": "123456"
}
```

### 🔐 Exemplo de Token

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": "1ffc4f94-e71f-4218-b353-eb4ff5c2b592",
  "role": "ADMIN"
}
```

### 🏢 Exemplo de Cliente

```json
{
  "name": "SINKA",
  "email": "inka@exemplo.com",
  "isActive": true,
  "contact": "(56) 91234-5678",
  "imageUrl": "https://inka.com/inka.jpg",
  "address": {
    "street": "Rua inka",
    "neighborhood": "inka",
    "number": "41",
    "state": "BA"
  }
}
```

---

## 🧭 Cronograma Estimado

| Etapa                               | Tempo Estimado |
| ----------------------------------- | -------------- |
| 🏁 Setup inicial (Docker, Prisma)   | 0.5 dia        |
| 🔐 Auth (JWT + Google OAuth2)       | 1.5 dias       |
| 🛡️ RBAC e Multitenancy              | 1 dia          |
| 📇 CRUD Usuários e Clientes         | 1.5 dias       |
| 🖼️ Frontend com Next.js + Tailwind  | 1.5 dias       |
| 📊 Dashboard (KPIs)                 | 0.5 dia        |
| 🚢 Dockerização e Deploy            | 1 dia          |
| 📝 Documentação e testes básicos    | 0.5 dia        |

**Total Estimado:** 7 a 8 dias úteis

---

## 📞 Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/opedro-monteiro/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge\&logo=gmail\&logoColor=white)](mailto:pedro.oliveira@monteirodev.com)
