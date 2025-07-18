// script.js

document.getElementById("form-adesivo").addEventListener("submit", function (e) {
  e.preventDefault();

  const largura = parseFloat(document.getElementById("largura").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const cor = document.getElementById("cor").value;
  const material = document.getElementById("material").value;
  const ajusteArquivo = document.getElementById("ajusteArquivo").checked;
  const recorteEletronico = document.getElementById("recorteEletronico").checked;

  const materiais = {
    1003: { nome: "A3 COR VINIL ADESIVO BRILHO TRANSPARENTE", valor: 16.0, formato: "A3" },
    1838: { nome: "A3 COR VINIL ADESIVO METALIZADO", valor: 17.0, formato: "A3" },
    45: { nome: "A3 COR VINIL ADESIVO FOSCO BRANCO", valor: 16.0, formato: "A3" },
    1135: { nome: "A3 COR BOPP BRILHO", valor: 12.4, formato: "A3" },
    43: { nome: "A3 COR PAPEL ADESIVO 190G", valor: 17.0, formato: "A3" },
    1011: { nome: "A3 P&B VINIL ADESIVO BRILHO TRANSPARENTE", valor: 14.0, formato: "A3" },
    1839: { nome: "A3 P&B VINIL ADESIVO METALIZADO", valor: 15.0, formato: "A3" },
    57: { nome: "A3 P&B VINIL ADESIVO FOSCO BRANCO", valor: 13.0, formato: "A3" },
    1136: { nome: "A3 P&B BOPP BRILHO", valor: 11.75, formato: "A3" },
    1661: { nome: "A4 COR VINIL ADESIVO BRILHO TRANSPARENTE", valor: 10.0, formato: "A4" },
    962: { nome: "A4 COR VINIL ADESIVO FOSCO BRANCO", valor: 10.0, formato: "A4" },
    1133: { nome: "A4 COR BOPP BRILHO", valor: 9.35, formato: "A4" },
    599: { nome: "A4 COR PAPEL ADESIVO 190G", valor: 4.4, formato: "A4" },
    1662: { nome: "A4 P&B VINIL ADESIVO BRILHO TRANSPARENTE", valor: 8.7, formato: "A4" },
    1010: { nome: "A4 P&B VINIL ADESIVO FOSCO BRANCO", valor: 8.7, formato: "A4" },
    1126: { nome: "A4 P&B BOPP BRILHO", valor: 7.2, formato: "A4" },
    600: { nome: "A4 P&B PAPEL ADESIVO 190G", valor: 2.7, formato: "A4" },
  };

  const folha = materiais[material].formato;
  const larguraAdesivo = largura + 4; // com sangria
  const alturaAdesivo = altura + 4;

  const folhaLargura = folha === "A3" ? 330 - 10 : 210 - 10; // margem
  const folhaAltura = folha === "A3" ? 480 - 10 : 297 - 10;

  const colunas = Math.floor(folhaLargura / larguraAdesivo);
  const linhas = Math.floor(folhaAltura / alturaAdesivo);
  const porFolha = colunas * linhas;
  const folhasNecessarias = Math.ceil(quantidade / porFolha);

  const valorMaterial = materiais[material].valor;
  const valorTotalMaterial = folhasNecessarias * valorMaterial;
  const valorAjuste = ajusteArquivo ? 17.25 : 0;
  const valorRecorte = recorteEletronico ? folhasNecessarias * 7.0 : 0;
  const valorTotal = valorTotalMaterial + valorAjuste + valorRecorte;

  const codigos = [];
  codigos.push(`${material} – ${folhasNecessarias}x`);
  if (ajusteArquivo) codigos.push(`340 – 1x`);
  if (recorteEletronico) codigos.push(`341 – ${folhasNecessarias}x`);

  document.getElementById("resultados").innerHTML = `
    <p><strong>Formato da folha:</strong> ${folha}</p>
    <p><strong>Adesivos por folha:</strong> ${porFolha}</p>
    <p><strong>Folhas necessárias:</strong> ${folhasNecessarias}</p>
    <p><strong>Tamanho com sangria:</strong> ${larguraAdesivo} x ${alturaAdesivo} mm</p>
    <p><strong>Total produzido:</strong> ${folhasNecessarias * porFolha}</p>
  `;

  document.getElementById("resumo").innerText = `
Quantidade: ${quantidade} unidades
Medidas: ${largura} x ${altura} mm
Cor: ${cor === "cor" ? "Colorido" : "Preto e Branco"}
Material: ${materiais[material].nome}

Serviços adicionais:
${ajusteArquivo ? "- Ajuste de arquivo\n" : ""}${recorteEletronico ? "- Recorte eletrônico\n" : ""}

Códigos para sistema:
${codigos.join("\n")}

Valor total: R$ ${valorTotal.toFixed(2).replace('.', ',')}
  `;
});
