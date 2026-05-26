class ProdutoFactory {
  static _catalogo = {
    'pastel': { nome: 'Pastel', preco: 5.00 },
    'caldo': { nome: 'Caldo', preco: 7.00 },
    'refrigerante': { nome: 'Refrigerante', preco: 4.00 },
    'suco': { nome: 'Suco', preco: 6.00 }
  };

  static obterProduto(id) {
    const dados = this._catalogo[id];
    if (!dados) {
      throw new Error(`Produto '${id}' não encontrado no catálogo.`);
    }
    return new Produto(id, dados.nome, dados.preco);
  }

  static listarTodos() {
    return Object.keys(this._catalogo).map(id => this.obterProduto(id));
  }

  static adicionarProduto(id, nome, preco) {
    if (preco <= 0) throw new Error("Preço deve ser maior que zero.");
    this._catalogo[id] = { nome, preco };
  }
}