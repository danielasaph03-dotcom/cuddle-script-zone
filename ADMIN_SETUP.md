# Painel administrativo — configuração

Este site tem um painel em `/admin` pra criar e publicar notícias sem editar código. Os dados
ficam no **MySQL da sua própria hospedagem cPanel** — sem depender de nenhum serviço externo.
O login do admin usa senha com hash (bcrypt) e sessão por cookie assinado, sem serviço de
autenticação externo. Isso só funciona no deploy Node.js do cPanel (`npm run build:cpanel`) — o
site nesse modo precisa de um servidor rodando, não é um site estático.

## 1. Criar o banco de dados no cPanel

1. No cPanel, abra **Bancos de Dados → Database Wizard**.
2. Escolha um nome pro banco (ex.: `gsdb`) — o cPanel vai prefixar automaticamente com seu
   usuário, ficando algo como `garciaesilvarepr_gsdb`.
3. Crie um usuário e uma senha forte para o banco (guarde os dois).
4. Na etapa de permissões, marque **ALL PRIVILEGES**.
5. Anote os três valores finais: nome do banco (com o prefixo), usuário (com o prefixo) e senha.

## 2. Criar as tabelas

1. No cPanel, abra **phpMyAdmin**.
2. Selecione o banco que você criou (barra lateral esquerda).
3. Clique na aba **SQL**.
4. Abra o arquivo `db/mysql-schema.sql` deste projeto, copie todo o conteúdo, cole no campo e
   clique em **Executar/Go**.
5. Isso cria as tabelas `posts` e `admins`, e já insere a publicação de exemplo `[EXEMPLO]` pra
   você ver o painel funcionando.

## 3. Criar o primeiro (e único) administrador

Não existe cadastro público. No seu computador, dentro da pasta do projeto, rode:

```sh
node scripts/create-admin.mjs seu-email@exemplo.com "SuaSenhaForte123"
```

Isso imprime um `INSERT INTO admins (...) VALUES (...);` pronto — copie e cole na aba **SQL** do
phpMyAdmin e execute. Esse e-mail/senha é o que você vai usar para entrar em `/admin/login`.
(A senha nunca é enviada a lugar nenhum — o script só gera o hash localmente.)

## 4. Configurar as variáveis de ambiente no cPanel

No **Setup Node.js App**, na sua aplicação, seção **Variáveis de ambiente**, adicione:

| Nome                 | Valor                                                          |
| -------------------- | -------------------------------------------------------------- |
| `DB_HOST`            | `localhost` (normalmente)                                      |
| `DB_USER`            | o usuário do passo 1                                           |
| `DB_PASSWORD`        | a senha do passo 1                                             |
| `DB_NAME`            | o nome do banco do passo 1                                     |
| `AUTH_COOKIE_SECRET` | um texto aleatório longo — qualquer um, só precisa ser secreto |

Depois de adicionar, clique em **Reiniciar**.

## 5. Publicar o site (build)

Sempre que o código mudar (incluindo agora, a primeira vez com MySQL), o ciclo é:

1. `npm run build:cpanel` gera a pasta `.output-cpanel/` (com `server/` e `public/`).
2. Compactar o conteúdo dela num `.zip`.
3. No **Gerenciador de Arquivos** do cPanel, dentro da pasta da aplicação (ex.: `gs-node`),
   enviar o zip e extrair, substituindo `server/` e `public/`.
4. Copiar (ou recriar) o `package.json` de dentro de `server/` para a raiz da aplicação, se ainda
   não estiver lá, e clicar em **"Executar a instalação do NPM"**.
5. Clicar em **Reiniciar**.

## 6. Acessar o painel

```
https://seu-dominio.com.br/admin/login
```

⚠️ Use sempre **https://** (com o cadeado) — o cookie de login só funciona em conexão segura.
Se o cPanel tiver a opção **"Force HTTPS Redirect"**, vale a pena ativar.

## 7. Criar e publicar uma notícia

1. No menu lateral, clique em **"Nova publicação"**.
2. Preencha título e resumo (obrigatórios) — categoria e autor são opcionais. Escolha a data, o
   formato da imagem de capa (Paisagem 16:9, Quadrado — feed Instagram 1:1, Retrato — feed
   Instagram 4:5, Retrato — Stories/Reels 9:16, ou Original — sem cortar a imagem), a imagem em
   si, e o texto.
3. **"Salvar como rascunho"** a qualquer momento — rascunhos não aparecem no site público.
4. **"Publicar"** — aparece na Home, em `/noticias` e na própria URL, na hora.

## Como funciona por baixo

- **Banco:** MySQL, tabela `posts` (publicações) e `admins` (login). Ver `db/mysql-schema.sql`.
- **Login:** senha com hash bcrypt na tabela `admins`; sessão guardada num cookie `httpOnly`
  assinado com `AUTH_COOKIE_SECRET` (ninguém consegue forjar sem esse segredo).
- **Imagem de capa:** guardada direto na coluna `cover_image` do post (como texto), não como
  arquivo solto no servidor — evita depender de um mecanismo de arquivos que não sobrevive a um
  novo build.
- **Sem serviço externo em lugar nenhum** — tudo roda dentro da sua própria hospedagem.
