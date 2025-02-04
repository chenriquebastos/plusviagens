/* Aplicação de máscaras com IMask e atualização do preview em tempo real */

document.addEventListener("DOMContentLoaded", function() {
    // Máscara para campos de moeda no formulário Aéreo
    IMask(document.getElementById('valorPorPassageiro'), {
      mask: Number,
      scale: 2,
      signed: false,
      thousandsSeparator: '.',
      padFractionalZeros: true,
      normalizeZeros: true,
      radix: ','
    });
    // Máscara para o campo Valor do Transfer
    IMask(document.getElementById('valorTransferGeral'), {
      mask: Number,
      scale: 2,
      signed: false,
      thousandsSeparator: '.',
      padFractionalZeros: true,
      normalizeZeros: true,
      radix: ','
    });
    // Máscara para o campo de Valor no Hotel (inicial)
    IMask(document.getElementById('valor1'), {
      mask: Number,
      scale: 2,
      signed: false,
      thousandsSeparator: '.',
      padFractionalZeros: true,
      normalizeZeros: true,
      radix: ','
    });
  });
  
  // --- Funções de Preview em Tempo Real ---
  function updatePreviewAereo() {
    const preview = document.getElementById('previewAereo');
    const companhia = document.getElementById('companhiaAerea').value;
    const quantidade = document.getElementById('quantidadePassageiros').value;
    const valorPorPassageiro = document.getElementById('valorPorPassageiro').value;
    const valorTotal = document.getElementById('valorTotal').value;
    const origem = document.getElementById('origem').value;
    const destino = document.getElementById('destino').value;
    preview.innerHTML = `
      <h3>Pré-visualização - Aéreo</h3>
      <p><strong>Companhia:</strong> ${companhia}</p>
      <p><strong>Passageiros:</strong> ${quantidade}</p>
      <p><strong>Valor por Passageiro:</strong> ${valorPorPassageiro}</p>
      <p><strong>Valor Total:</strong> ${valorTotal}</p>
      <p><strong>Origem:</strong> ${origem}</p>
      <p><strong>Destino:</strong> ${destino}</p>
    `;
  }
  
  function updatePreviewTransfer() {
    const preview = document.getElementById('previewTransfer');
    const empresa = document.getElementById('empresaTransfer').value;
    let tipoVeiculo = document.getElementById('tipoVeiculo').value;
    if (tipoVeiculo === 'OUTROS') {
      tipoVeiculo = document.getElementById('outroTipoVeiculo').value;
    }
    const quantidade = document.getElementById('quantidadePassageirosTransfer').value;
    const valorTransfer = document.getElementById('valorTransferGeral').value;
    const observacoes = document.getElementById('observacoesTransfer').value;
    let transfersHTML = '';
    const transferItems = document.querySelectorAll('#transfersContainer .transferItem');
    transferItems.forEach((item, index) => {
      const roteiro = item.querySelector('input[id^="roteiroTransfer"]').value;
      const data = item.querySelector('input[id^="dataTransfer"]').value;
      const hora = item.querySelector('input[id^="horaTransfer"]').value;
      transfersHTML += `<p><strong>Transfer ${index + 1}:</strong> ${roteiro} em ${data} às ${hora}</p>`;
    });
    preview.innerHTML = `
      <h3>Pré-visualização - Transfer</h3>
      <p><strong>Empresa:</strong> ${empresa}</p>
      <p><strong>Tipo de Veículo:</strong> ${tipoVeiculo}</p>
      <p><strong>Passageiros:</strong> ${quantidade}</p>
      <p><strong>Valor:</strong> ${valorTransfer}</p>
      ${transfersHTML}
      <p><strong>Observações:</strong> ${observacoes}</p>
    `;
  }
  
  function updatePreviewHotel() {
    const preview = document.getElementById('previewHotel');
    const nomeHotel = document.getElementById('nomeHotel').value;
    const observacoes = document.getElementById('observacoesHotel').value;
    const prazo = document.getElementById('prazoHotel').value;
    let categoriasHTML = '';
    const categorias = document.querySelectorAll('#categoriasContainer .categoria');
    categorias.forEach((cat, index) => {
      const categoria = cat.querySelector('input[id^="categoria"]').value;
      const periodo = cat.querySelector('input[id^="periodo"]').value;
      const quantidade = cat.querySelector('input[id^="quantidade"]').value;
      const valor = cat.querySelector('input[id^="valor"]').value;
      categoriasHTML += `<p><strong>Categoria ${index + 1}:</strong> ${categoria}, Período: ${periodo}, Quantidade: ${quantidade}, Valor: ${valor}</p>`;
    });
    preview.innerHTML = `
      <h3>Pré-visualização - Hotel</h3>
      <p><strong>Hotel:</strong> ${nomeHotel}</p>
      ${categoriasHTML}
      <p><strong>Observações:</strong> ${observacoes}</p>
      <p><strong>Prazo:</strong> ${prazo}</p>
    `;
  }
  
  document.addEventListener('input', function() {
    updatePreviewAereo();
    updatePreviewTransfer();
    updatePreviewHotel();
  });
  
  // --- Eventos e Funções Existentes ---
  
  document.getElementById('tipoTrecho').addEventListener('change', function() {
    const voltaFields = document.getElementById('voltaFields');
    if (this.value === 'idaVolta') {
      voltaFields.classList.remove('hidden');
    } else {
      voltaFields.classList.add('hidden');
    }
  });
  
  document.getElementById('companhiaAerea').addEventListener('change', function() {
    const outraCompanhia = document.getElementById('outraCompanhia');
    if (this.value === 'OUTROS') {
      outraCompanhia.classList.remove('hidden');
    } else {
      outraCompanhia.classList.add('hidden');
    }
  });
  
  document.getElementById('tipoVeiculo').addEventListener('change', function() {
    const outroTipoVeiculo = document.getElementById('outroTipoVeiculo');
    if (this.value === 'OUTROS') {
      outroTipoVeiculo.classList.remove('hidden');
    } else {
      outroTipoVeiculo.classList.add('hidden');
    }
  });
  
  document.getElementById('quantidadePassageiros').addEventListener('input', calcularTotal);
  document.getElementById('valorPorPassageiro').addEventListener('input', calcularTotal);
  
  function calcularTotal() {
    const quantidade = parseFloat(document.getElementById('quantidadePassageiros').value) || 0;
    let valorStr = document.getElementById('valorPorPassageiro').value;
    valorStr = valorStr.replace(/\./g, '').replace(',', '.');
    const valorPorPassageiro = parseFloat(valorStr) || 0;
    const valorTotal = quantidade * valorPorPassageiro;
    document.getElementById('valorTotal').value = valorTotal.toFixed(2);
  }
  
  document.getElementById('limparFormulario').addEventListener('click', function() {
    document.getElementById('aereoForm').reset();
    document.getElementById('tabelaContainerAereo').classList.add('hidden');
  });
  document.getElementById('limparFormularioTransfer').addEventListener('click', function() {
    document.getElementById('transferForm').reset();
    document.getElementById('tabelaContainerTransfer').classList.add('hidden');
    transferCounter = 1;
    document.getElementById('transfersContainer').innerHTML = `
      <div class="transferItem">
        <h3>Transfer 1</h3>
        <div class="form-group">
          <label for="roteiroTransfer1">
            <i class="fas fa-route"></i> Roteiro:
          </label>
          <input type="text" id="roteiroTransfer1" placeholder="Ex: Aeroporto -> Hotel" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="dataTransfer1">
              <i class="fas fa-calendar-alt"></i> Data:
            </label>
            <input type="date" id="dataTransfer1" required>
          </div>
          <div class="form-group">
            <label for="horaTransfer1">
              <i class="fas fa-clock"></i> Horário:
            </label>
            <input type="time" id="horaTransfer1" required>
          </div>
        </div>
        <button type="button" class="removerTransfer">
          <i class="fas fa-trash"></i> Remover Transfer
        </button>
      </div>
    `;
  });
  document.getElementById('limparFormularioHotel').addEventListener('click', function() {
    document.getElementById('hotelForm').reset();
    document.getElementById('tabelaContainerHotel').classList.add('hidden');
  });
  
  document.getElementById('tipoServico').addEventListener('change', function() {
    const aereoFormSection = document.getElementById('aereoFormSection');
    const transferFormSection = document.getElementById('transferFormSection');
    const hotelFormSection = document.getElementById('hotelFormSection');
  
    if (this.value === 'aereo') {
      aereoFormSection.classList.remove('hidden');
      transferFormSection.classList.add('hidden');
      hotelFormSection.classList.add('hidden');
    } else if (this.value === 'transfer') {
      transferFormSection.classList.remove('hidden');
      aereoFormSection.classList.add('hidden');
      hotelFormSection.classList.add('hidden');
    } else if (this.value === 'hotel') {
      hotelFormSection.classList.remove('hidden');
      aereoFormSection.classList.add('hidden');
      transferFormSection.classList.add('hidden');
    }
  });
  
  // Gerar tabela Aéreo com duas linhas para Ida e Volta (se aplicável)
  // Ordem das colunas: Companhia, Passageiros, Valor por Passageiro, Valor Total, Origem, Destino, Trecho, Número do Voo, Decolagem, Pouso, Tarifa, Observações, Prazo.
  document.getElementById('aereoForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const dados = {
      companhiaAerea: document.getElementById('companhiaAerea').value === 'OUTROS'
        ? document.getElementById('outraCompanhia').value
        : document.getElementById('companhiaAerea').value,
      quantidadePassageiros: document.getElementById('quantidadePassageiros').value,
      valorPorPassageiro: document.getElementById('valorPorPassageiro').value,
      valorTotal: document.getElementById('valorTotal').value,
      origem: document.getElementById('origem').value,
      destino: document.getElementById('destino').value,
      tipoTrecho: document.getElementById('tipoTrecho').value,
      numeroVooIda: document.getElementById('numeroVooIda').value,
      dataDecolagemIda: formatarDataHora(
        document.getElementById('dataDecolagemIda').value,
        document.getElementById('horaDecolagemIda').value
      ),
      dataPousoIda: formatarDataHora(
        document.getElementById('dataPousoIda').value,
        document.getElementById('horaPousoIda').value
      ),
      tarifaIda: document.getElementById('tarifaIda').value,
      numeroVooVolta: document.getElementById('numeroVooVolta').value,
      dataDecolagemVolta: document.getElementById('dataDecolagemVolta').value
        ? formatarDataHora(
            document.getElementById('dataDecolagemVolta').value,
            document.getElementById('horaDecolagemVolta').value
          )
        : '-',
      dataPousoVolta: document.getElementById('dataPousoVolta').value
        ? formatarDataHora(
            document.getElementById('dataPousoVolta').value,
            document.getElementById('horaDecolagemVolta').value
          )
        : '-',
      tarifaVolta: document.getElementById('tarifaVolta').value,
      observacoes: document.getElementById('observacoes').value,
      prazo: document.getElementById('prazo').value.split('-').reverse().join('/')
    };
  
    const tbody = document.querySelector('#tabelaCotacaoAereo tbody');
  
    if (dados.tipoTrecho === 'idaVolta') {
      tbody.innerHTML = `
        <tr>
          <td rowspan="2">${dados.companhiaAerea}</td>
          <td rowspan="2">${dados.quantidadePassageiros}</td>
          <td rowspan="2">R$ ${dados.valorPorPassageiro}</td>
          <td rowspan="2">R$ ${dados.valorTotal}</td>
          <td rowspan="2">${dados.origem}</td>
          <td rowspan="2">${dados.destino}</td>
          <td>Ida</td>
          <td>${dados.numeroVooIda}</td>
          <td>${dados.dataDecolagemIda}</td>
          <td>${dados.dataPousoIda}</td>
          <td>${dados.tarifaIda}</td>
          <td rowspan="2">${dados.observacoes}</td>
          <td rowspan="2">${dados.prazo}</td>
        </tr>
        <tr>
          <td>Volta</td>
          <td>${dados.numeroVooVolta}</td>
          <td>${dados.dataDecolagemVolta}</td>
          <td>${dados.dataPousoVolta}</td>
          <td>${dados.tarifaVolta}</td>
        </tr>
      `;
    } else {
      tbody.innerHTML = `
        <tr>
          <td>${dados.companhiaAerea}</td>
          <td>${dados.quantidadePassageiros}</td>
          <td>R$ ${dados.valorPorPassageiro}</td>
          <td>R$ ${dados.valorTotal}</td>
          <td>${dados.origem}</td>
          <td>${dados.destino}</td>
          <td>Somente Ida</td>
          <td>${dados.numeroVooIda}</td>
          <td>${dados.dataDecolagemIda}</td>
          <td>${dados.dataPousoIda}</td>
          <td>${dados.tarifaIda}</td>
          <td>${dados.observacoes}</td>
          <td>${dados.prazo}</td>
        </tr>
      `;
    }
  
    document.getElementById('tabelaContainerAereo').classList.remove('hidden');
    document.getElementById('tabelaContainerTransfer').classList.add('hidden');
    document.getElementById('tabelaContainerHotel').classList.add('hidden');
  });
  
  // Gerar tabela Transfer (sem alterações)
  document.getElementById('transferForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const empresa = document.getElementById('empresaTransfer').value;
    let tipoVeiculo = document.getElementById('tipoVeiculo').value;
    if (tipoVeiculo === 'OUTROS') {
      tipoVeiculo = document.getElementById('outroTipoVeiculo').value;
    }
    const quantidadePassageiros = document.getElementById('quantidadePassageirosTransfer').value;
    const valorTransferGeral = document.getElementById('valorTransferGeral').value;
    const observacoes = document.getElementById('observacoesTransfer').value;
    const transfersContainer = document.getElementById('transfersContainer');
    const transferItems = transfersContainer.querySelectorAll('.transferItem');
    const numTransfers = transferItems.length;
  
    let rowsHTML = '';
    transferItems.forEach((item, index) => {
      const roteiro = item.querySelector('input[id^="roteiroTransfer"]').value;
      const dataTransfer = item.querySelector('input[id^="dataTransfer"]').value.split('-').reverse().join('/');
      const horaTransfer = item.querySelector('input[id^="horaTransfer"]').value;
      if (index === 0) {
        rowsHTML += `
          <tr>
            <td rowspan="${numTransfers}">${empresa}</td>
            <td rowspan="${numTransfers}">${tipoVeiculo}</td>
            <td rowspan="${numTransfers}">${quantidadePassageiros}</td>
            <td rowspan="${numTransfers}">R$ ${valorTransferGeral}</td>
            <td>${roteiro}</td>
            <td>${dataTransfer}</td>
            <td>${horaTransfer}</td>
            <td rowspan="${numTransfers}">${observacoes}</td>
          </tr>
        `;
      } else {
        rowsHTML += `
          <tr>
            <td>${roteiro}</td>
            <td>${dataTransfer}</td>
            <td>${horaTransfer}</td>
          </tr>
        `;
      }
    });
  
    const tbody = document.querySelector('#tabelaCotacaoTransfer tbody');
    tbody.innerHTML = rowsHTML;
  
    document.getElementById('tabelaContainerTransfer').classList.remove('hidden');
    document.getElementById('tabelaContainerAereo').classList.add('hidden');
    document.getElementById('tabelaContainerHotel').classList.add('hidden');
  });
  
  document.getElementById('transfersContainer').addEventListener('click', function(event) {
    if (event.target.closest('.removerTransfer')) {
      event.target.closest('.transferItem').remove();
      if (this.children.length === 0) {
        transferCounter = 0;
      }
    }
  });
  
  let transferCounter = 1;
  document.getElementById('adicionarTransfer').addEventListener('click', function() {
    transferCounter++;
    const novaTransfer = `
      <div class="transferItem">
        <h3>Transfer ${transferCounter}</h3>
        <div class="form-group">
          <label for="roteiroTransfer${transferCounter}">
            <i class="fas fa-route"></i> Roteiro:
          </label>
          <input type="text" id="roteiroTransfer${transferCounter}" placeholder="Ex: Hotel -> Aeroporto" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="dataTransfer${transferCounter}">
              <i class="fas fa-calendar-alt"></i> Data:
            </label>
            <input type="date" id="dataTransfer${transferCounter}" required>
          </div>
          <div class="form-group">
            <label for="horaTransfer${transferCounter}">
              <i class="fas fa-clock"></i> Horário:
            </label>
            <input type="time" id="horaTransfer${transferCounter}" required>
          </div>
        </div>
        <button type="button" class="removerTransfer">
          <i class="fas fa-trash"></i> Remover Transfer
        </button>
      </div>
    `;
    document.getElementById('transfersContainer').insertAdjacentHTML('beforeend', novaTransfer);
  });
  
  let contadorCategorias = 1;
  document.getElementById('adicionarCategoria').addEventListener('click', function() {
    contadorCategorias++;
    const novaCategoria = `
      <div class="categoria">
        <h3>Categoria de Hospedagem</h3>
        <div class="form-group">
          <label for="categoria${contadorCategorias}">
            <i class="fas fa-star"></i> Categoria:
          </label>
          <input type="text" id="categoria${contadorCategorias}" placeholder="Ex: Standard" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="periodo${contadorCategorias}">
              <i class="fas fa-calendar-alt"></i> Período:
            </label>
            <input type="text" id="periodo${contadorCategorias}" placeholder="Ex: 01/01/2024 a 05/01/2024" required>
          </div>
          <div class="form-group">
            <label for="quantidade${contadorCategorias}">
              <i class="fas fa-users"></i> Quantidade:
            </label>
            <input type="number" id="quantidade${contadorCategorias}" placeholder="Ex: 2" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="valor${contadorCategorias}">
              <i class="fas fa-dollar-sign"></i> Valor:
            </label>
            <input type="text" id="valor${contadorCategorias}" placeholder="Ex: 200,00" required>
          </div>
          <div class="form-group">
            <label for="subtotal${contadorCategorias}">
              <i class="fas fa-calculator"></i> Subtotal:
            </label>
            <input type="number" id="subtotal${contadorCategorias}" readonly>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="taxas${contadorCategorias}">
              <i class="fas fa-percentage"></i> Taxas:
            </label>
            <input type="number" id="taxas${contadorCategorias}" step="0.01" placeholder="Ex: 10.00" required>
          </div>
          <div class="form-group">
            <label for="valorTotalComTaxas${contadorCategorias}">
              <i class="fas fa-calculator"></i> Valor Total com Taxas:
            </label>
            <input type="number" id="valorTotalComTaxas${contadorCategorias}" readonly>
          </div>
        </div>
        <button type="button" class="removerCategoria">
          <i class="fas fa-trash"></i> Remover Categoria
        </button>
      </div>
    `;
    document.getElementById('categoriasContainer').insertAdjacentHTML('beforeend', novaCategoria);
  
    IMask(document.getElementById(`valor${contadorCategorias}`), {
      mask: Number,
      scale: 2,
      signed: false,
      thousandsSeparator: '.',
      padFractionalZeros: true,
      normalizeZeros: true,
      radix: ','
    });
  
    document.getElementById(`quantidade${contadorCategorias}`).addEventListener('input', calcularHotel);
    document.getElementById(`valor${contadorCategorias}`).addEventListener('input', calcularHotel);
    document.getElementById(`taxas${contadorCategorias}`).addEventListener('input', calcularHotel);
  
    const botoesRemover = document.querySelectorAll('.removerCategoria');
    botoesRemover.forEach(botao => {
      botao.addEventListener('click', function() {
        this.parentElement.remove();
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('quantidade1').addEventListener('input', calcularHotel);
    document.getElementById('valor1').addEventListener('input', calcularHotel);
    document.getElementById('taxas1').addEventListener('input', calcularHotel);
  });
  
  function calcularHotel() {
    for (let i = 1; i <= contadorCategorias; i++) {
      const quantidade = parseFloat(document.getElementById(`quantidade${i}`)?.value) || 0;
      let valorStr = document.getElementById(`valor${i}`)?.value || "0";
      valorStr = valorStr.replace(/\./g, '').replace(',', '.');
      const valor = parseFloat(valorStr) || 0;
      const taxas = parseFloat(document.getElementById(`taxas${i}`)?.value) || 0;
      if (!isNaN(quantidade) && !isNaN(valor) && !isNaN(taxas)) {
        const subtotal = quantidade * valor;
        const valorTotalComTaxas = subtotal + (subtotal * (taxas / 100));
        if (document.getElementById(`subtotal${i}`)) {
          document.getElementById(`subtotal${i}`).value = subtotal.toFixed(2);
        }
        if (document.getElementById(`valorTotalComTaxas${i}`)) {
          document.getElementById(`valorTotalComTaxas${i}`).value = valorTotalComTaxas.toFixed(2);
        }
      }
    }
  }
  
  document.getElementById('hotelForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const dados = {
      nomeHotel: document.getElementById('nomeHotel').value,
      categorias: [],
      observacoes: document.getElementById('observacoesHotel').value,
      prazo: document.getElementById('prazoHotel').value.split('-').reverse().join('/')
    };
  
    for (let i = 1; i <= contadorCategorias; i++) {
      const categoria = document.getElementById(`categoria${i}`)?.value;
      const periodo = document.getElementById(`periodo${i}`)?.value;
      const quantidade = document.getElementById(`quantidade${i}`)?.value;
      const valor = document.getElementById(`valor${i}`)?.value;
      const subtotal = document.getElementById(`subtotal${i}`)?.value;
      const taxas = document.getElementById(`taxas${i}`)?.value;
      const valorTotalComTaxas = document.getElementById(`valorTotalComTaxas${i}`)?.value;
  
      if (categoria && periodo && quantidade && valor && subtotal && taxas && valorTotalComTaxas) {
        dados.categorias.push({
          categoria,
          periodo,
          quantidade,
          valor,
          subtotal,
          taxas,
          valorTotalComTaxas
        });
      }
    }
  
    const tbody = document.querySelector('#tabelaCotacaoHotel tbody');
    tbody.innerHTML = dados.categorias.map(categoria => `
      <tr>
        <td>${dados.nomeHotel}</td>
        <td>${categoria.categoria}</td>
        <td>${categoria.periodo}</td>
        <td>${categoria.quantidade}</td>
        <td>R$ ${categoria.valor}</td>
        <td>R$ ${categoria.subtotal}</td>
        <td>${categoria.taxas}%</td>
        <td>R$ ${categoria.valorTotalComTaxas}</td>
        <td>${dados.observacoes}</td>
        <td>${dados.prazo}</td>
      </tr>
    `).join('');
  
    document.getElementById('tabelaContainerHotel').classList.remove('hidden');
    document.getElementById('tabelaContainerAereo').classList.add('hidden');
    document.getElementById('tabelaContainerTransfer').classList.add('hidden');
  });
  
  function baixarTabela(seletorTabela, nomeArquivo) {
    const tabelaOriginal = document.querySelector(seletorTabela);
    const containerTemporario = document.createElement('div');
    containerTemporario.style.position = 'absolute';
    containerTemporario.style.left = '-9999px';
    document.body.appendChild(containerTemporario);
    const tabelaClonada = tabelaOriginal.cloneNode(true);
    // Define o fundo das células conforme as cores originais
    tabelaClonada.style.backgroundColor = "#FFFFFF";
    tabelaClonada.style.color = "black";
    const headerCells = tabelaClonada.querySelectorAll("thead th");
    headerCells.forEach(th => {
      th.style.backgroundColor = "#292d96";
      th.style.color = "white";
      th.style.textAlign = "center";
    });
    const bodyCells = tabelaClonada.querySelectorAll("tbody td");
    bodyCells.forEach(td => {
      td.style.textAlign = "center";
      td.style.verticalAlign = "middle";
    });
    containerTemporario.appendChild(tabelaClonada);
    html2canvas(containerTemporario.firstChild, {
      logging: true,
      useCORS: true,
      scale: 2,
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = nomeArquivo;
      link.href = canvas.toDataURL();
      link.click();
      document.body.removeChild(containerTemporario);
    }).catch(err => {
      console.error("Erro ao gerar a imagem:", err);
      document.body.removeChild(containerTemporario);
    });
  }
  
  document.getElementById('baixarTabelaAereo').addEventListener('click', function() {
    baixarTabela("#tabelaCotacaoAereo", "tabela_cotacao_aereo.png");
  });
  document.getElementById('baixarTabelaTransfer').addEventListener('click', function() {
    baixarTabela("#tabelaCotacaoTransfer", "tabela_cotacao_transfer.png");
  });
  document.getElementById('baixarTabelaHotel').addEventListener('click', function() {
    baixarTabela("#tabelaCotacaoHotel", "tabela_cotacao_hotel.png");
  });
  
  function formatarDataHora(data, hora) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano} ${hora}`;
  }
  
