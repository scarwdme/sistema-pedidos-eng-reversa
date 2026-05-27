# Análise do sistema (partes 1, 2 e 3)

## Parte 1 – Análise do Sistema Real
### 1. Qual é o objetivo do sistema?
- O sistema é uma plataforma de E-commerce para pedidos de alimentos (delivery/retirada).  
    • Permite que os clientes vejam o cardápio  
    • Adicionar produtos ao carrinho  
    • Realizar pedidos  
    • Integrado ao whatsApp para atendimentos  
    • Painel Administrativo  para gerenciar pedidos (adm)  
---    

### 2. Quais funcionalidades ele oferece?
#### Para o cliente:
    Vizualização de produtos
     • Acessar o cardápio por categorias
     • Ver detalhes do produto (preço, ingredientes, foto)
     • Buscar produtos
     
    Carrinho de Compras
     • Adicionar e remover itens
     • Ver subtotal em tempo real
     • Visualizar/editar carrinho

    Pedidos
     • Realizar pedido com dados de entrega 
     • Suporte a combos e adicionais
     • Integração com o whatsApp para confirmação
  
    Categorização e Busca
     • Pizzas (p,m,g e gg) 
     • Brotinhos
     • Sanduíches
     • Hambúrgueres Artesanais 
     • Sucos, Vitaminas, Refrigerantes
     • Porções

    Promoções
     • Exibição de banners 
     • Banners promocionais rotativos

#### Para o administrador:
    Painel de Controle
     • Upload de banners
     • Gerenciamento de categorias
     • Gerenciamento de produtos
     • Gerenciamento de imagens
---

### 3. Como o usuário interage com o sistema?
```
     ┌─────────────┐
     │  Visitante  │
     └──────┬──────┘
            │
            ▼
┌──────────────────────────┐
│    Visualizar Homepage   │
│  - Banners Rotativos     │
│  - Categorias Principais │
└───────────┬──────────────┘
            │
            ├─▶ Ver Categorias (Pizzas, Sanduíches, etc)
            │
            ├─▶ Ver Combos
            │
            ├─▶ Ver Promoções
            │
            ▼
┌──────────────────────────┐
│  Selecionar Produto      │
│  - Visita Página do Item │
│  - Adiciona Adicionais   │
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│  Adicionar ao Carrinho   │
│  - Atualiza Subtotal     │
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│  Visualizar Carrinho     │
│  - Revisar Itens         │
│  - Prosseguir Checkout   │
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│  Confirmar Pedido        │
│  - Dados de Entrega      │
│  - WhatsApp ou E-mail    │
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│  Pedido Enviado          │
│  - Mensagem WhatsApp     │
│  - Confirmação via Chat  │
└──────────────────────────┘
``` 
---

### 4. Como os produtos estão organizados?
#### - O sistema basicamente organiza produtos em um estrutura hierárquica:

- CATEGORIAS PRINCIPAIS
```
    ├── Pizzas
    │   ├── Pizzas - P (Pequena) → 40 itens
    │   ├── Pizzas - M (Média) → 40 itens
    │   ├── Pizzas - G (Grande) → 40 itens
    │   └── Pizzas - GG (Extra Grande) → 40 itens
    ├── Brotinhos → 37 itens
    ├── Sanduíches → 27 itens
    ├── Hambúrgueres Artesanais → 24 itens
    ├── Sucos → 15 itens
    ├── Vitaminas → 12 itens
    ├── Refrigerantes → 5 itens
    └── Porções → 2 itens

- TIPOS ESPECIAIS
    ├── Combos (Combo - Classic Burguer, Combo - Big Cheddar, etc.)
    └── Promoções (Banners rotativos)
```
---
## Parte 2 – Análise de Arquitetura
### • Tipo de arquitetura  
 O sistema aparenta seguir uma arquitetura em camadas e MVC (*layered architecture*)  
• **MVC**  
1. **VIEW** (o que eu vejo)  
    • Homepage com produtos  
    • Páginas de categoria  
    • Detalhes do Produtos  
    • Página do carrinho  
    • Painel admin  

2. **Model** (dados)  
    • Produto (nome, preço, categoria)  
    • Categoria (nome, imagem)  
    • Carrinho (itens, total)  
    • Pedido (status, cliente, itens)  

3. **CONTROLLER** (lógica que conecta)  
├── Rota: /categoria-XXX → ProductController.list()  
├── Rota: /adicionar-carrinho → CartController.add()  
├── Rota: /confirmar-pedido → OrderController.confirm()  
└── Rota: /sistema/painel → AdminController.show()  

• Possivel divisão em camadas  
OBSERVADO:
- Frontend renderizado (não API pura)
- URLs estruturadas
- Diretórios separados (/sistema, /painel, /img)
- Comportamento consistente

** INDICADORES**:
- Há separação entre apresentação e lógica
- Há persistência centralizada
- Há validações (acesso /painel é restrito)

Arquitetura em camadas (Layered) provavelmente implementada

### Inferência das Camadas
##### Camada 1: APRESENTAÇÃO
1. As páginas renderizam HTML
   Evidência: URLs limpas que geram HTMLs diferentes

2. Não há API REST
   Evidência: Sempre HTML é retornado

3. Há JavaScript no cliente
   Evidência: Adicionar ao carrinho é instantâneo

#### Camada 2: APLICAÇÃO
1. Há roteamento de URLs
   Evidência: /categoria-X leva para CategoryController

2. Há gerenciamento de sessão
   Evidência: Carrinho persiste entre páginas

3. Há processamento de formulários
   Evidência: POST em /confirmar-pedido funciona

#### Camada 3: NEGÓCIO
1. Há cálculos (total = quantidade × preço)
   Evidência: Subtotal muda conforme quantidade

2. Há validações (carrinho não pode estar vazio)
   Evidência: Não consigo confirmar pedido sem itens

3. Há regras de combo (preço especial)
   Evidência: Combos custam menos que produtos separados

4. Há integração com WhatsApp
   Evidência: Pedido confirmado chega no WhatsApp

#### Camada 4: PESISTÊNCIA
1. Há dados consistentes
   Evidência: Preço da pizza é sempre igual

2. Há múltiplos produtos (220+)
   Evidência: Impossível hardcoded no HTML

3. Há relacionamentos (Produto → Categoria)
   Evidência: Cada produto está em uma categoria

4. Há upload de imagens
   Evidência: /sistema/painel/images/ com muitas imagens  

## Parte 3 – Análise de Design  
### • **Coesão**  
#### • Média  
        • Aspectos Positivos  
            • Componentes bem definidos  
            • Cada entidade tem responsabilidade clara  
            • Separação entre entidades de domínio  
        • Problemas  
            • Possivel mkistura de responsabilidades em controllers  
            • Lógica de apresentação pode estar junto com lógica de négocio  

#### • **Acoplamento**
1. Acoplamento Front-Back: Renderização no servidor
2. Acoplamento com banco de dados: queries espalhadas
3. Acoplamento com seviços externos: whatsApp integrado diretamente
4. Acoplamento com estrutura de diretórios: URLs hardcoded

#### • **Separação de responsabilidades**  
    • Inadequada  
    • Responsabilidades identificadas em cada camada:  

| **Responsabilidade**        | **Onde está**          | **Problema**                      |
|-----------------------------|------------------------|-----------------------------------|
| Validação de produto        | Controller + Service   | Duplicação possível               |
| Cálculo de preço            | Service + Combo        | Disperso                          |
| Gerenciamento de imagem     | Controller + FileSystem| Muito acoplado                    |
| Integração WhatsApp         | Controller             | Deveria ser um Service            |
| Autenticação                | Controller             | Possível mistura com lógica       |
| Renderização                | Controller + Template  | Tight coupling                    |