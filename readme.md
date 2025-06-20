# StockAPI

Sistema completo de gestão de estoque, desenvolvido com foco em **Clean Architecture**, **SOLID**, **TDD**, e boas práticas de engenharia de software moderna.

---

## 🚀 Tecnologias Utilizadas

* **Node.js** com **TypeScript**
* **Express** (servidor HTTP)
* **Prisma ORM** com **PostgreSQL**
* **Jest** para testes (unitários e integração)
* **Docker** (opcional para banco de dados)
* **ESLint/Prettier** (padronização de código)

---

## 📄 Funcionalidades

### 📊 Produtos

* Cadastro, edição, listagem e remoção de produtos.
* Controle de quantidade mínima, atual, para reposição e máxima.
* Status de produto ativo ou inativo.

### 📒 Categorias

* CRUD completo para categorização dos produtos.

### ⚖️ Entradas de Estoque (StockEntry)

* Registro de entradas com: produto, descrição, preço unitário e quantidade.
* Data de entrada registrada automaticamente.
* Histórico consultável.

### 🔺 Saídas de Estoque (StockExit)

* Registro de saídas do estoque com os mesmos campos de entrada.
* Gera um histórico de saídas.

### 📊 Controle de Estoque Atual

* Quantidade atual por produto calculada com base nas entradas e saídas.
* Endpoint para consultar o estoque em tempo real.

---

## 📆 Arquitetura

O projeto segue os princípios de **Clean Architecture**, separando claramente:

* **Entities** (entidades do domínio)
* **Usecases** (regras de negócio puras)
* **Repositories** (acesso a dados com Prisma)
* **Controllers** (camada de apresentação e integração HTTP)
* **Validation** (validação de entradas)
* **Factories** (injeção de dependência)
* **UseCases** (casos de usos da aplicação)

Benefícios:

* Alta testabilidade.
* Baixo acoplamento.
* Alta manutenibilidade.

---

## 🔧 Como Executar Localmente

### 1. Clone o repositório

```bash
git clone git@github.com:LuigiFedele/stockAPI.git
cd stock-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configuração de banco de dados

O .env foi enviado de proposito para facilitar, ver a aplicação funcionando.

```env
DATABASE_URL="postgresql://storage:admin@localhost:5432/storageStock?schema=public"
POSTGRES_USER = storage
POSTGRES_PASSWORD = admin
POSTGRES_DB_DEV =  storageStock
```

### 4. Inicie o docker com o banco de dados

```bash
docker compose up
```

### 5. Rode as migrations

```bash
npx prisma migrate dev --name init
```

### 6. Inicie o servidor

```bash
npm run dev
```

O servidor estará disponível em: `http://localhost:3000`

---

## 🔧 Scripts Disponíveis

| Comando                 | Descrição                             |
| ----------------------- | ------------------------------------- |
| `npm run dev`           | Executa a API em modo desenvolvimento |
| `npm run test`          | Roda todos os testes                  |
| `npm lint:fix`          | Roda a identiação e correção c/ Eslint|
| `npm format`            | Roda a formatação com o Prettier      |

---

## ✅ Testes

Cobertura de testes com Jest:

* **Usecases 100% testados** (via TDD)
* **Controllers com testes unitários e mocks**
* **Testes de integração** via `supertest`

---

## 🚀 Possíveis Melhorias Futuras

* Autenticação e RBAC (papéis de acesso)
* Painel de Admin com dashboards
* Gatilhos para alerta de estoque baixo
* Integração com fornecedores e pedidos
* Deploy automatizado (CI/CD com GitHub Actions)

---

## 🙏 Agradecimentos

Este projeto foi desenvolvido para demonstrar a aplicação de boas práticas modernas de engenharia de software.

Feito com dedicação por [Luigi Fedele](https://github.com/LuigiFedele) 🎯
