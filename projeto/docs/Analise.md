### ANÁLISE DO SISTEMA DA PASTELARIA DO ZÉ

#### PARTE 1 – Compreensão do Sistema

1. Qual é o objetivo do sistema?
Gerenciar pedidos de uma pastelaria, permitindo que clientes selecionem produtos, definam quantidades e finalizem pedidos com cálculo automático de totais, descontos e taxas.

2. Quais são suas principais funcionalidades?
- Seleção de produtos (pastel, caldo, refrigerante, suco)
- Definição de quantidade de itens
- Adição de itens à lista de pedidos
- Cálculo automático do total
- Aplicação de descontos e taxas
- Finalização de pedido
- Armazenamento em `localStorage`

3. Como o usuário interage com o sistema?
- Seleciona um produto no dropdown
- Insere a quantidade
- Clica em "Adicionar"
- Visualiza itens em tempo real
- Clica em "Finalizar Pedido" para conclusão

---

#### PARTE 2 – Identificação de Elementos

1. Principais funções do sistema:

| Função | Responsabilidade |
| :--- | :--- |
| `adicionar()` | Adiciona item ao carrinho |
| `atualizarLista()` | Atualiza exibição dos itens |
| `finalizar()` | Calcula totais e finaliza |
| `limparTudo()` | Limpa o carrinho |
| `removerUltimo()` | Remove último item |
| `calcularTotal()` | DUPLICADA - calcula total |
| `salvarTotal()` | Persiste dados |

2. Dados manipulados:
- Itens (produto, quantidade, subtotal)
- Total (soma dos subtotais)
- Descontos (por faixa de valor)
- Taxas (5% sobre o total)
- Preços (hardcoded)

3. Entidades identificadas (classes):
- Produto
- Pedido
- Item
- Preço
- Pastelaria ou GerenciadorPedidos

---

#### PARTE 3 – Arquitetura

1. O sistema possui arquitetura definida?
- Não. O código é monolítico com toda a lógica em um único arquivo JavaScript.

2. Ele segue algum padrão (MVC, camadas, etc.)?
- Não, não há separação entre:
  - **Model** (dados)
  - **View** (interface)
  - **Controller** (lógica)

3. Como você classificaria esse sistema?
-  **Arquitetura Monolítica**
  - Tudo acoplado
  - Sem camadas
  - Sem separação de responsabilidades

---

#### PARTE 4 - Modelagem
- Diagrama do sistema legado
`diagrama_de_classe_legado.png`
- Diagrama de Classes do sistema Refatorado
`refatoracao_uml.drawio.png`

```
projeto/
├── css
├── docs/
│   └── Analise.md
│   └── diagrama_de_classe_legado.png      #Diagrama do Sistema Monolítico
│   └── refatoracao_uml.drawio.png         #Diagrama de Classes do Sistema Refatorado
├── src
├── index.html 
└── README.md
```
---

#### PARTE 5 - Análise de Problemas
Identifique e explique problemas relacionados a:
1. Coesão
**Problema:** Funções fazem múltiplas coisas não relacionadas


** Ex - Função `Adicionar()`:**
```
function adicionar() {
  // Acessa DOM (apresentação)
  let qtd = document.getElementById("qtd").value;


   // Valida entrada (entrada)
    if (qtd == "" || qtd <= 0) {
    alert("Quantidade inválida");
  }


  // Calcula preço (negócio)
  let preco = 0;
  if (produto == "pastel") preco = 5;


  // Modifica estado (dados)
    itens.push({
    produto: produto,
    qtd: qtd,
    subtotal: subtotal
  });


  // Atualiza interface (apresentação)
    atualizarLista();
}
```
**Impacto:**
- Difícil de testar (depende de DOM)
- Difícil de reutilizar (específica desta UI)
- Difícil de manter (misturado)
---

2. Acoplamento
**Problema:** Classes/funções dependem uma da outra fortemente
**Exemplos de Acoplamento:**
- **Acoplamento ao DOM**
   ```
   // Diretamente acoplado
   function atualizarLista() {
     let lista = document.getElementById("lista");
     lista.innerHTML = ""; // Dependência direta
   }
   ```
 
- **Acoplamento a localStorage**
   ```
   //  Acesso direto
   localStorage.setItem("ultimoPedido", JSON.stringify(pedido));
   ```
 
- **Acoplamento Global**
   ```
   //  Variáveis globais
   let itens = [];
   let total = 0;
   ```
 
**Impacto:**
- Testes impossíveis sem DOM
- Refatoração perigosa (quebra múltiplas partes)
- Impossível reutilizar em contextos diferentes
---

3. Separação de responsabilidades
**Problema:** Uma função faz tudo
**Exemplo do Problema:**


```
function finalizar() {
  // 1. Calcula desconto
  let desconto = total * 0.2;
 
  // 2. Calcula taxa
  let taxa = total * 0.05;
 
  // 3. Mostra alert
  alert("Total final: " + totalFinal);
 
  // 4. Acesso a dados
  localStorage.setItem("ultimoPedido", totalFinal);
 
  // 5. Limpa estado
  limparTudo();
}
```
**Responsabilidades Misturadas:** 4 responsabilidades em 1 função
---

4. Duplicação de código
**Problema:** `calcularTotal()` duplica lógica de `atualizarLista()`
 
**Duplicação 1:**
```
// Em atualizarLista()
total = 0;
for (let i = 0; i < itens.length; i++) {
  total = total + itens[i].subtotal;
}
 
// Em calcularTotal() - DUPLICADO!
let soma = 0;
for (let i = 0; i < itens.length; i++) {
  soma += itens[i].subtotal;
}
return soma;
```
 
**Impacto:**
- Se mudar lógica, precisa mudar em 2 lugares
- Risco de inconsistência
- Manutenção difíci
---

5. Organização Geral
**Problemas Estruturais:**

```
CÓDIGO LEGADO (Monolítico)
─────────────────────────
index.html
├── CSS
├── HTML
└── JavaScript (tudo junto)
    ├── Variáveis globais
    ├── Funções aleatórias
    ├── Sem módulos
    └── Sem padrão claro
```


**Problemas Identificados:**
 
1. **Sem Modularização** - Tudo em um arquivo
2. **Sem Camadas** - Apresentação + Lógica + Dados misturadas
3. **Sem Padrões** - Nenhum padrão de projeto aplicado
4. **Variáveis Globais** - Poluem escopo global
5. **Sem Documentação** - Sem comments explicativos
---

#### PARTE 6 - Propostas de Melhoria

**Separação em Camadas (MVC)**
APRESENTAÇÃO (View)    ← Interface HTML7
LÓGICA DE NEGÓCIO      ← Cálculos, descontos, pedidos
ACESSO A DADOS (Model) ← localStorage, produtos

**Criar Classes**
- **`Produto`** - atributos: nome, preço
- **`Item`** - produto + quantidade + subtotal
- **`Pedido`** - gerencia itens e cálculos
- **`GerenciadorPedidos`** - controle central (Singleton)
- **`ProdutoFactory`** - cria produtos padronizados

**Padrões de Projeto**
- **Factory** - criar produtos de forma consistente
- **Singleton** - garante única instância do gerenciador
- **MVC** - separar apresentação da lógica

**Melhorias Específicas**
*- Extrair cálculo de preço para a classe `Produto`
- Centralizar desconto e taxa em uma classe `CalculadoraPrecos`
- Remover duplicação de código
- Usar *Factory* para criar produtos
- Usar *Singleton* para o gerenciador de pedidos
---

#### PARTE 7 - Refatoração
--- 

#### PARTE 8 -Aplicações de Padrões de Projeto
##### Padrão Factory

**O que é?**
O padrão *Factory* encapsula a criação de objetos, centralizando a lógica para instanciar produtos.

**Onde foi aplicado?**
```
class ProdutoFactory {
  static produtos = [
    new Produto("Pastel", 5.00),
    new Produto("Caldo", 7.00),
    new Produto("Refrigerante", 4.00),
    new Produto("Suco", 6.00)
  ];

  static criarProduto(nome, preco) {
    return new Produto(nome, preco);
  }

  static obterProduto(nome) {
    return this.produtos.find(p => p.getNome() === nome);
  }
}
```

**Por que foi utilizado?**

 - Centraliza a criação de produtos

 - Facilita manutenção - adicionar novo produto é simples

 - Evita duplicação - preços hardcoded em um só lugar

 - Validação consistente - todos os produtos passam pelas mesmas regras

 - Escalabilidade - pode vir de banco de dados no futuro
 ---

##### Padrão Singleton

**O que é?**
Garante que uma classe tenha apenas uma única instância durante toda a execução do programa.

**Onde foi aplicado?**
```
class GerenciadorPedidos {
  static instancia = null; // Única instância

  constructor() {
    this.pedidoAtual = new Pedido();
    this.historico = this.carregarHistorico();
  }

  static getInstance() {
    if (!GerenciadorPedidos.instancia) {
      GerenciadorPedidos.instancia = new GerenciadorPedidos();
    }
    return GerenciadorPedidos.instancia;
  }
}

const gerenciador = GerenciadorPedidos.getInstance();  // Primeira vez: cria
const gerenciador2 = GerenciadorPedidos.getInstance(); // Segunda vez: retorna mesma instância
```

**Por que foi utilizado?**

- Evita inconsistências - um único ponto de controle

- Economiza memória - não cria múltiplas instâncias desnecessárias

- Garante sincronização - todos usam os mesmos dados

- Acesso global seguro - sem variáveis globais problemáticas

- Histórico centralizado - um único registro de pedidos
---