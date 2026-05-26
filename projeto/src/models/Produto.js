class Produto {
  constructor(id, nome, preco) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
  }

  getNome() {
    return this.nome;
  }

  getPreco() {
    return this.preco;
  }

  validar() {
    return this.nome !== "" && this.preco > 0;
  }
}