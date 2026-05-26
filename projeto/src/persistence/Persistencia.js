class Persistencia {
  static salvarHistorico(historico) {
    try {
      localStorage.setItem("historicoPedidos", JSON.stringify(historico));
    } catch (e) {
      console.error("Erro ao salvar no localStorage", e);
    }
  }

  static salvarUltimoPedido(total) {
    localStorage.setItem("ultimoPedido", total.toString());
  }

  static exportarJSON(dados) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dados, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "backup_pedidos.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  static fazerBackup() {
    const historico = localStorage.getItem("historicoPedidos");
    if (historico) {
      this.exportarJSON(JSON.parse(historico));
    }
  }
}