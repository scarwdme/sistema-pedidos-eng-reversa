# 🍴 Zé Pastel - Sistema de Gestão de Pedidos

O **Zé Pastel** (anteriormente *Pastelaria do Zé*) é um sistema web responsivo para controle e fechamento de pedidos de fast-food. Este projeto foi desenvolvido como um estudo de caso prático de **Engenharia de Software**, focado na transição de um sistema legado monolítico/procedural para uma arquitetura modular moderna e altamente escalável.

---

### Funcionalidades Atuais

- **Cardápio Automatizado:** Seleção de produtos do estabelecimento (Pastel, Caldo, Refrigerante e Suco).
- **Carrinho Dinâmico:** Adição e remoção de itens com atualização de subtotais e renderização em tempo real.
- **Camada de Negócio Isolada:** Processamento automatizado de taxas de serviço (5%) e cálculo progressivo de descontos com base no valor consolidado.
- **Persistência Local:** Salvamento do estado do caixa e do último checkout diretamente no navegador do usuário utilizando `LocalStorage`.

---

### Evolução Arquitetural (Engenharia Reversa)

O principal objetivo deste projeto foi eliminar os problemas de acoplamento do sistema original. Abaixo está a comparação da evolução estrutural do software:

####  O Cenário Legado (Antes)
No estágio inicial, o sistema era estruturado de forma procedural em um único script global (`script.js`). Essa abordagem gerava graves problemas arquiteturais:
- **Objeto Deus (God Object):** Um único arquivo manipulava eventos de tela, criava dados, calculava finanças e gerenciava o `LocalStorage`.
- **Falta de Encapsulamento:** Os itens do carrinho eram objetos literais de dados anêmicos, impossibilitando a reutilização de código e facilitando falhas de estado.
- **Violação do SRP (Princípio da Responsabilidade Única):** Alterações simples no layout (HTML) exigiam a modificação de lógicas de cálculo financeiro.

###  A Estrutura Refatorada (Depois)
O sistema foi completamente reestruturado utilizando o padrão **MVC (Model-View-Controller)** e padrões criacionais e estruturais do **GoF (Gang of Four)**:

- **Model (`src/models/`):** Contém as entidades puras de dados (`Produto.js` e `Item.js`), onde cada objeto passou a gerenciar seu próprio estado e comportamentos (como o cálculo do próprio subtotal).
- **Factory Pattern (`src/models/ProductFactory.js`):** Centraliza e encapsula as regras de precificação e instanciação do cardápio, eliminando condicionais complexas (`if/else`) espalhadas pelo código.
- **Singleton Pattern (`src/business/GerenciadorPedidos.js`):** Garante a existência de uma única instância centralizada do carrinho de compras compartilhada por toda a aplicação, blindando o estado do pedido.
- **Business Logic (`src/business/CalculadoraPrecos.js`):** Camada isolada focada estritamente nas regras fiscais e comerciais (cálculo de 5% de taxa e concessão de descontos).
- **Persistence Layer (`src/persistence/Persistencia.js`):** Abstrai e encapsula o acesso à API do navegador, isolando operações de entrada e saída.
- **Controller/View (`src/view/UIController.js`):** Atua como o maestro do sistema. Escuta os eventos da DOM, renderiza os componentes visuais e atualiza a tela sem conhecer as regras matemáticas de negócio por trás dos cálculos.

---

### Estrutura de Diretórios do Projeto

```
projeto/
│
├── css/
│   └── style.css                 # Estilização visual (Tema Dark/Responsivo)
├── docs/
│   └── Analise.md                # Relatório técnico e diagramas UML
├── src/
│   ├── business/
│   │   ├── CalculadoraPrecos.js  # Lógica pura de taxas e descontos
│   │   ├── GerenciadorPedidos.js # Singleton gerenciador do carrinho
│   │   └── Pedido.js             # Entidade lógica de agrupamento
│   ├── models/
│   │   ├── Item.js               # Representação do item adicionado
│   │   ├── ProductFactory.js     # Fábrica de instanciação do menu
│   │   └── Produto.js            # Entidade base de produto
│   ├── persistence/
│   │   └── Persistencia.js       # Gerenciador de LocalStorage
│   └── view/
│       └── UIController.js       # Controlador de Eventos e Renderização da DOM
│
├── index.html                    # Ponto de entrada da interface
└── README.md                     # Documentação técnica do sistema
```