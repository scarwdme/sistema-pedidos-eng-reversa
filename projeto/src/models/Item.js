class Item {
  constructor(produto, quantidade) {
    this.produto = produto;
    this.quantidade = quantidade;
  }

  getProduto() {
    return this.produto;
  }

  getQuantidade() {
    return this.quantidade;
  }

  getSubtotal() {
    return this.produto.getPreco() * this.quantidade;
  }
}