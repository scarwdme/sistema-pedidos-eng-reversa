class Pedido {
  constructor() {
    this.itens = [];
  }

  adicionarItem(produto, quantidade) {
    if (quantidade <= 0) {
      throw new Error("Quantidade inválida. Deve ser maior que zero.");
    }
    this.itens.push(new Item(produto, quantidade));
  }

  removerUltimo() {
    if (this.itens.length > 0) {
      this.itens.pop();
    }
  }

  calcularTotal() {
    return this.itens.reduce((soma, item) => soma + item.getSubtotal(), 0);
  }

  getItens() {
    return [...this.itens]; // Retorna cópia para manter encapsulamento
  }

  limpar() {
    this.itens = [];
  }
}