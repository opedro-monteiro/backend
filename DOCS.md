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