class UIController {
  constructor() {
    this.gerenciador = GerenciadorPedidos.getInstance();
    
    // Elementos da DOM
    this.elementos = {
      produto: document.getElementById("produto"),
      qtd: document.getElementById("qtd"),
      lista: document.getElementById("lista"),
      total: document.getElementById("total"),
      desconto: document.getElementById("desconto"), 
      taxa: document.getElementById("taxa"),         
      totalFinal: document.getElementById("total-final") 
    };
  }

  adicionarItem() {
    try {
      const produtoId = this.elementos.produto.value;
      const qtd = parseInt(this.elementos.qtd.value, 10);

      if (isNaN(qtd) || qtd <= 0) {
        throw new Error("Por favor, insira uma quantidade válida.");
      }

      const produto = ProdutoFactory.obterProduto(produtoId);
      this.gerenciador.getPedidoAtual().adicionarItem(produto, qtd);

      this.elementos.qtd.value = ''; // Limpa o input
      this.atualizarInterface();
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  }

  removerUltimo() {
    this.gerenciador.getPedidoAtual().removerUltimo();
    this.atualizarInterface();
  }

  finalizarPedido() {
    try {
      const registro = this.gerenciador.finalizarPedido();
      
      // persistências
      Persistencia.salvarUltimoPedido(registro.resumoFinanceiro.totalFinal);
      Persistencia.salvarHistorico(this.gerenciador.getHistorico());

      // 1. Atualiza a tela 
      this.elementos.desconto.innerText = registro.resumoFinanceiro.desconto.toFixed(2);
      this.elementos.taxa.innerText = registro.resumoFinanceiro.taxa.toFixed(2);
      this.elementos.totalFinal.innerText = registro.resumoFinanceiro.totalFinal.toFixed(2);
      
      // 2. Mantém os itens visíveis na lista para o usuário ver o que comprou na nota
      this.elementos.qtd.value = '';

      alert("Pedido Finalizado com Sucesso! Os valores finais estão na tela.");

    } catch (error) {
      alert(`Erro ao finalizar: ${error.message}`);
    }
  }

  atualizarInterface() {
    const pedidoAtual = this.gerenciador.getPedidoAtual();
    const itens = pedidoAtual.getItens();
    
    // Limpa a lista antes de reconstruir
    this.elementos.lista.innerHTML = "";

    // reseta as caixas de texto para um novo pedodp
    if (itens.length === 0) {
      this.elementos.total.innerText = "0.00";
      this.elementos.desconto.innerText = "0.00";
      this.elementos.taxa.innerText = "0.00";
      this.elementos.totalFinal.innerText = "0.00";
      return;
    }

    itens.forEach(item => {
      const li = document.createElement("li");
      
      const desc = document.createElement("span");
      desc.innerHTML = `<strong>${item.getProduto().getNome()}</strong> (x${item.getQuantidade()})`;
      
      const preco = document.createElement("span");
      preco.innerText = `R$ ${item.getSubtotal().toFixed(2)}`;
      
      li.appendChild(desc);
      li.appendChild(preco);
      this.elementos.lista.appendChild(li);
    });

    // Atualiza o subtotal em tempo real
    this.elementos.total.innerText = pedidoAtual.calcularTotal().toFixed(2);
  }
}

// Inicializa o Controller (Apenas uma vez no final do arquivo)
let uiController;
document.addEventListener("DOMContentLoaded", () => {
  uiController = new UIController();
});