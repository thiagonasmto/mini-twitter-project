# Mini-Twitter Project 🚀

Este é o projeto **Mini-Twitter**, que utiliza Django no backend e React no frontend. A aplicação permite registrar usuários, fazer login, criar postagens, seguir/desseguir usuários e visualizar um feed de postagens.

## Pré-requisitos ⚙️

Antes de rodar a aplicação, é necessário ter os seguintes requisitos instalados:

* Python 3.x
* Node.js e npm (para o frontend)
* PostgreSQL (banco de dados)
* Dependências do Django
* Dependências do React

## Configuração do Backend (Django) 🖥️

### Passo 1: Criar e ativar o ambiente virtual

Se você ainda não tiver o ambiente virtual configurado, crie e ative-o:

```bash
python -m venv venv
source venv/bin/activate  # No Windows, use: venv\Scripts\activate
```

### Passo 2: Instalar dependências

Instale as dependências do backend:

```bash
pip install -r requirements.txt
```

### Passo 3: Configurar o Banco de Dados 🗄️

Certifique-se de ter o PostgreSQL instalado e configurado. Em seguida, crie um banco de dados chamado `minitwitter_db`:

```bash
psql -U postgres
CREATE DATABASE minitwitter_db;
```

### Passo 4: Configuração do `settings.py`

No arquivo `settings.py`, ajuste as configurações do banco de dados com os dados de conexão corretos:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'minitwitter_db',
        'USER': 'twitteruser',
        'PASSWORD': '123456',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### Passo 5: Rodar as Migrações 🔧

Execute as migrações para criar as tabelas no banco de dados:

```bash
python manage.py migrate
```

### Passo 6: Rodar o Servidor 🏃‍♂️

Agora, inicie o servidor Django:

```bash
python manage.py runserver
```

O backend estará disponível em [http://127.0.0.1:8000](http://127.0.0.1:8000).

## Configuração do Frontend (React) 🎨

### Passo 1: Instalar as dependências do frontend

Dentro do diretório do frontend, instale as dependências usando npm:

```bash
npm install
```

### Passo 2: Iniciar o Servidor de Desenvolvimento

Execute o servidor de desenvolvimento com o comando:

```bash
npm run dev
```

O frontend estará disponível em [http://localhost:5173](http://localhost:5173).

## Funcionalidades 📝

* **Registro de Usuário:** Crie um novo usuário enviando dados para o endpoint `/api/register/`.
* **Login:** Faça login com um usuário e receba um token JWT para autenticação.
* **Criação de Postagens:** Os usuários podem criar postagens no feed.
* **Feed de Postagens:** Visualize postagens criadas por outros usuários.
* **Autenticação com JWT:** Use tokens JWT para autenticação em endpoints protegidos.

## Testar a API 🔌

Acesse a API no endpoint [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/).

* **POST /api/register/**: Para registrar um novo usuário.
* **POST /api/token/**: Para obter um token JWT.
* **POST /api/posts/**: Para criar uma postagem (requer autenticação).
* **GET /api/user/{user\_id}/**: Para obter dados do usuário (requer autenticação).

## Estrutura de Arquivos 📂

* **backend/**: Contém o projeto Django, com as configurações do servidor e a API.

  * **manage.py**: Arquivo de inicialização do Django.
  * **settings.py**: Configurações do projeto Django.
  * **urls.py**: Mapeamento de URLs da aplicação.
* **frontend/**: Contém o projeto React, com a interface do usuário.

  * **App.tsx**: Componente principal do React.
  * **package.json**: Dependências e scripts do React.

## Contribuindo 👥

1. Faça o fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Faça o commit das suas mudanças (`git commit -am 'Add new feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um pull request.
