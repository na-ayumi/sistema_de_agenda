### Sistema de Agenda

Sistema de agenda de compromissos desenvolvido em TypeScript com arquitetura em camadas. Possui como objetivo, listar e adicionar compromissos com validação automática para evitar sobreposição de horários.

### Passos e instalações

No terminal, certifique-se se está na pasta do projeto.

```bash
# 1. Inicialize o projeto Node.js com um package.json padrão
npm init -y 

# 2. Instale TypeScript, tsx e tipos do Node 
npm install typescript tsx @types/node --save-dev

# 3. Gere o arquivo tsconfig.json
npx tsc --init

#4. Instale Prisma e os tipos para Node e PostgreSQL como devDependencies
npm install prisma @types/node @types/pg @prisma/adapter-pg  @prisma/client --save-dev

# 7. Inicialize o Prisma, gerando a estrutura de arquivos na pasta ../generated/prisma
npx prisma init --output ../generated/prisma
```

No arquivo `package.json`, adicione a seguinte linha:

```json
"type": "module"
```

Ajuste também o arquivo `tsconfig.json` para que fique parecido com o seguinte exemplo:

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "node",
    "target": "ES2023",
    "strict": true,
    "esModuleInterop": true,
    "ignoreDeprecations": "6.0"
  }
}
```

### Configurações do banco de dados

No arquivo `.env`, ajuste `usuario`, `senha`, `localhost`, `5432` e `nome_do_banco` conforme necessário.

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
```

No terminal, execute os seguintes comandos

```bash
#1. Irá aplicar as migrations existentes
npx prisma migrate deploy

#2. Irá gerar o cliente Prisma
npx prisma generate
```

### CLI

Instale o pacote commader:

```bash
npm install commander
```

Para executar a CLI, execute os seguintes comandos:

```bash
#Para listar compromissos
npx tsx cli/index.ts listar

#Para adicionar novos compromisso
#A data e hora precisam estar no seguinte formato: dd/mm/yyyy hh:mm hh:mm
npx tsx cli/index.ts adicionar data hora_inicial hora_final descricao
```

### Adaptador Web

Instale o Express.js e os tipos para TypeScript:

```bash
npm install express
npm install @types/express --save-dev
```

Para iniciar o servidor, use o comando:

```bash
npx tsx web/server.ts
# O servidor estará rodando em http://localhost:3000
```

No Windows, utilize o PowerShell ou instale o Git Bash para utilizar o curl. No Linux e MacOS, se não o curl não estiver instalado, você poderá intalar via gerenciador de pacotes.

Em outro terminal, execute os comando abaixo

**Listar compromissos**

```bash
curl http://localhost:3000/compromissos
```

**Adicionar compromissos**

```bash

```