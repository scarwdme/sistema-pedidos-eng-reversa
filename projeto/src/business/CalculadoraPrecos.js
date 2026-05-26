class CalculadoraPrecos {
  static calcularDesconto(subtotal) {
    if (subtotal > 100) return subtotal * 0.20; // 20%
    if (subtotal > 50) return subtotal * 0.10;  // 10%
    return 0;
  }

  static calcularTaxa(subtotal) {
    return subtotal * 0.05;
  }

  static calcularTotalFinal(subtotal) {
    const desconto = this.calcularDesconto(subtotal);
    const taxa = this.calcularTaxa(subtotal);
    return subtotal - desconto + taxa;
  }
}