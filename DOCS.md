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