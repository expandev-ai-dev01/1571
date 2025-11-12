# DataFlow - Frontend

Sistema simples e intuitivo para gerenciamento de registros.

## Tecnologias

- React 19.2.0
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 7.9.3
- TanStack Query 5.90.2
- Axios 1.12.2
- React Hook Form 7.63.0
- Zod 4.1.11

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   └── router.tsx         # Configuração de rotas
├── assets/                # Recursos estáticos
│   └── styles/           # Estilos globais
├── core/                  # Componentes e lógica compartilhada
│   ├── components/       # Componentes genéricos
│   ├── lib/             # Configurações de bibliotecas
│   ├── utils/           # Funções utilitárias
│   ├── types/           # Tipos globais
│   └── constants/       # Constantes globais
├── domain/               # Módulos de domínio
├── pages/                # Páginas da aplicação
│   └── layouts/         # Layouts compartilhados
└── main.tsx             # Ponto de entrada
```

## Comandos

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## Configuração

1. Copie `.env.example` para `.env`
2. Configure as variáveis de ambiente:
   - `VITE_API_URL`: URL da API backend
   - `VITE_API_VERSION`: Versão da API (padrão: v1)
   - `VITE_API_TIMEOUT`: Timeout das requisições (padrão: 30000ms)

## Funcionalidades

- ✓ Criação de registros
- ✓ Visualização de registros
- ✓ Edição de registros
- ✓ Exclusão de registros
- ✓ Interface intuitiva

## Padrões de Código

- TypeScript strict mode habilitado
- Path alias `@/` configurado para `./src`
- Componentes funcionais com hooks
- TanStack Query para gerenciamento de estado do servidor
- React Hook Form + Zod para formulários e validação
- Tailwind CSS para estilização
- Estrutura modular baseada em domínios