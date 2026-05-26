class GerenciadorPedidos {
  constructor() {
    if (GerenciadorPedidos.instance) {
      return GerenciadorPedidos.instance;
    }
    
    this.pedidoAtual = new Pedido();
    this.historico = [];
    GerenciadorPedidos.instance = this;
  }

  static getInstance() {
    if (!GerenciadorPedidos.instance) {
      GerenciadorPedidos.instance = new GerenciadorPedidos();
    }
    return GerenciadorPedidos.instance;
  }

  getPedidoAtual() {
    return this.pedidoAtual;
  }

  finalizarPedido() {
    const subtotal = this.pedidoAtual.calcularTotal();
    
    if (subtotal === 0) {
      throw new Error("Não é possível finalizar um pedido vazio.");
    }

    const totalFinal = CalculadoraPrecos.calcularTotalFinal(subtotal);
    const desconto = CalculadoraPrecos.calcularDesconto(subtotal);
    const taxa = CalculadoraPrecos.calcularTaxa(subtotal);

    const registroPedido = {
      id: Date.now(),
      itens: this.pedidoAtual.getItens().map(i => ({
        produto: i.getProduto().getNome(),
        qtd: i.getQuantidade(),
        subtotal: i.getSubtotal()
      })),
      resumoFinanceiro: {
        subtotal,
        desconto,
        taxa,
        totalFinal
      },
      data: new Date().toISOString()
    };

    this.historico.push(registroPedido);
    this.pedidoAtual.limpar();
    
    return registroPedido;
  }

  getHistorico() {
    return [...this.historico];
  }
}