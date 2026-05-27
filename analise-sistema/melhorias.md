## Plano de Melhorias Técnicas
- Este documento apresenta as melhorias propostas para otimizar a segurança, a estabilidade e a flexibilidade do sistema baseado na modelagem atual.
---

### 1. Flexibilidade do Cardápio
- **Problema:** A modelagem atual usa herança para as categorias (`Pizzas`, `Sucos`, etc.). Se o administrador precisar criar uma categoria nova, será necessário alterar o código-fonte do sistema.
- **Solução:** Eliminar as subclasses e transformar `ItensEspecificos` em uma classe única chamada `Produto`. Adicionar um relacionamento dinâmico com uma nova entidade `Categoria`.
- **Impacto:** O administrador passa a criar novos tipos de produtos diretamente pelo painel, sem dependência de novos deploys.

### 2. Proteção de Dados Financeiros
- **Problema:** O relacionamento atual vincula o `Pedido` diretamente ao item do cardápio. Se o preço de um produto for alterado no futuro, os pedidos antigos salvos no histórico perderão o valor original da venda.
- **Solução:** Criar a classe associativa `ItemPedido`. No momento do fechamento da compra, o sistema copia e grava o preço atual do produto dentro dessa tabela de ligação.
- **Impacto:** Garante a imutabilidade dos dados financeiros e auditoria correta do faturamento histórico.

### 3. Estabilidade do Sistema
- **Problema:** A `Plataforma` envia os dados para a `API` de forma direta e síncrona para disparar notificações no WhatsApp. Se o serviço do WhatsApp cair ou demorar a responder, a experiência do cliente trava ou gera falhas no pedido.
- **Solução:** Implementar uma fila de mensageria (ex: Redis ou RabbitMQ) entre a `Plataforma` e a `API`. A plataforma joga o pedido na fila e libera o cliente imediatamente; a API processa o envio em segundo plano.
- **Impacto:** O sistema continua vendendo normalmente mesmo se o WhatsApp estiver instável.

### 4. Organização do Fluxo Logístico
- **Problema:** O status do pedido (Aguardando, Em Preparo, Saiu para Entrega) tende a ser controlado por condicionais complexas (`if/else`), o que facilita bugs (ex: cancelar um pedido que já foi entregue).
- **Solução:** Aplicar o padrão de projeto *State*. Cada status vira um objeto de controle com regras próprias de transição.
- **Impacto:** Código limpo, fácil de estender e total segurança nas regras de negócio de entrega.

---