# Parte 6 – Modelagem do Sistema

## Classes do Sistema

### • Plataforma

A Plataforma é a classe principal do sistema.

Responsabilidades:

- Gerenciar funcionamento da loja
- Exibir cardápio
- Gerenciar clientes
- Gerenciar pedidos
- Validar compras
- Controlar horário de funcionamento

#### Dados controlados

- Clientes cadastrados
- Pedidos realizados
- Produtos disponíveis
- Configurações da loja

---

### • Administrador

Representa o responsável pelo gerenciamento do sistema.

#### Funcionalidades

- Cadastrar produtos
- Editar produtos
- Remover produtos
- Gerenciar categorias
- Gerenciar banners
- Visualizar pedidos
- Alterar configurações gerais

#### Justificativa

Existe um painel administrativo protegido por login, portanto a classe Administrador é necessária.

---

### • Cliente

Representa o usuário que realiza compras na plataforma.

#### Dados armazenados

- Nome
- Telefone
- Endereço
- Histórico de pedidos

#### Funcionalidades

- Realizar cadastro
- Atualizar informações
- Visualizar cardápio
- Adicionar itens ao carrinho
- Fazer pedidos

---

### • Pedidos
Representa uma compra realizada pelo cliente.

#### Responsabilidades

- Armazenar itens selecionados
- Calcular valor total
- Armazenar forma de pagamento
- Armazenar valor do frete
- Controlar status do pedido

#### Operações

- Adicionar item
- Remover item
- Calcular total
- Finalizar pedido

---

### • API

Responsável pela comunicação com serviços externos.

#### Funcionalidades

- Enviar notificações
- Integrar com WhatsApp
- Informar novos pedidos
- Atualizar status do cliente

#### Justificativa

O sistema depende de comunicação automática entre cliente e administrador.

---

### • ItensEspecificos

Classe genérica que representa qualquer produto vendido pela loja.

#### Dados comuns

- Nome
- Preço
- Categoria
- Observações
- Adicionais

#### Objetivo

Evitar repetição de atributos em todas as categorias de produtos.

---

### • Classes Filhas

São especializações de ItensEspecificos.

#### Produtos representados

- Pizza
- Sanduíche
- Hambúrguer Artesanal
- Suco
- Vitamina
- Refrigerante
- Porção

#### Benefícios

- Reutilização de código
- Organização do sistema
- Aplicação de herança

---

## Relacionamentos

## • Associação Simples

### Administrador → Plataforma

O administrador controla e gerencia a plataforma.

### Cliente → Plataforma

O cliente utiliza os recursos oferecidos pela plataforma.

### Plataforma → Pedidos

A plataforma registra e exibe os pedidos realizados.

### Plataforma → API

A plataforma envia informações dos pedidos para a API.

### API → Administrador

A API notifica o administrador quando um novo pedido é realizado.

---

## • Agregação

### Cliente → Pedidos

Um cliente possui vários pedidos.

OBS:

- Se um pedido for removido
- O cliente continua existindo

### Pedidos → ItensEspecificos

Um pedido contém vários produtos.

Detalhe:

- Se um pedido for cancelado
- Os produtos continuam cadastrados

---

## • Herança

### ItensEspecificos

Classe Pai

#### Classes Filhas

- Pizza
- Sanduíche
- Hambúrguer Artesanal
- Suco
- Vitamina
- Refrigerante
- Porção

Detalhe bobo:

Todas herdam atributos e métodos da superclasse.

---

## Multiplicidade

### • 1..* (Um ou Muitos)

### Cliente → Pedidos

Um cliente pode realizar:

- 1 pedido
- vários pedidos

### Pedidos → ItensEspecificos

Um pedido deve possuir:

- no mínimo 1 item
- podendo possuir vários itens

### • 0..* (Zero ou Muitos)

Aplicado às subclasses de ItensEspecificos.

Exemplos:

- 0 Sucos vendidos
- 10 Pizzas vendidas
- 20 Hambúrgueres vendidos

Significa que podem existir nenhum ou vários objetos de cada categoria durante a execução do sistema.

---
