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

