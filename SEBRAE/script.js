// ===================
// Máscaras de Entrada
// ===================
document.addEventListener("DOMContentLoaded", function() {
    IMask(document.getElementById('valorPorPassageiro'), {
      mask: Number,
      scale: 2,
      signed: false,
      thousandsSeparator: '.',
      padFractionalZeros: true,
      normalizeZeros: true,
      radix: ','
    });
    IMask(document.getElementById('valorTransferGeral'), {
      mask: Number,
      scale: 2,
      signed: false,
      thousandsSeparator: '.',
      padFractionalZeros: true,
      normalizeZeros: true,
      radix: ','
    });
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
  
  // ===================
  // Funções de Preview
  // ===================
  function updatePreviewAereo() {
    const preview = document.getElementById('previewAereo');
    preview.innerHTML = `
      <h3>Pré-visualização - Aéreo</h3>
      <p><strong>Companhia:</strong> ${document.getElementById('companhiaAerea').value}</p>
      <p><strong>Passageiros:</strong> ${document.getElementById('quantidadePassageiros').value}</p>
      <p><strong>Valor por Passageiro:</strong> ${document.getElementById('valorPorPassageiro').value}</p>
      <p><strong>Valor Total:</strong> ${document.getElementById('valorTotal').value}</p>
      <p><strong>Origem:</strong> ${document.getElementById('origem').value}</p>
      <p><strong>Destino:</strong> ${document.getElementById('destino').value}</p>
    `;
  }
  function updatePreviewTransfer() {
    let tipoVeiculo = document.getElementById('tipoVeiculo').value;
    if(tipoVeiculo === 'OUTROS'){
      tipoVeiculo = document.getElementById('outroTipoVeiculo').value;
    }
    let transfersHTML = '';
    document.querySelectorAll('#transfersContainer .transferItem').forEach((item, index) => {
      transfersHTML += `<p><strong>Transfer ${index+1}:</strong> ${item.querySelector('input[id^="roteiroTransfer"]').value} em ${item.querySelector('input[id^="dataTransfer"]').value.split('-').reverse().join('/')} às ${item.querySelector('input[id^="horaTransfer"]').value}</p>`;
    });
    document.getElementById('previewTransfer').innerHTML = `
      <h3>Pré-visualização - Transfer</h3>
      <p><strong>Empresa:</strong> ${document.getElementById('empresaTransfer').value}</p>
      <p><strong>Tipo de Veículo:</strong> ${tipoVeiculo}</p>
      <p><strong>Passageiros:</strong> ${document.getElementById('quantidadePassageirosTransfer').value}</p>
      <p><strong>Valor:</strong> ${document.getElementById('valorTransferGeral').value}</p>
      ${transfersHTML}
      <p><strong>Observações:</strong> ${document.getElementById('observacoesTransfer').value}</p>
    `;
  }
  function updatePreviewHotel() {
    const prazoRaw = document.getElementById('prazoHotel').value;
    const prazo = prazoRaw ? prazoRaw.split('-').reverse().join('/') : '';
    let categoriasArray = [];
    for(let i = 1; i <= contadorCategorias; i++){
      const catElem = document.getElementById(`categoria${i}`);
      if(catElem){
        categoriasArray.push({
          categoria: catElem.value,
          periodo: document.getElementById(`periodo${i}`).value,
          quantidade: document.getElementById(`quantidade${i}`).value,
          valor: document.getElementById(`valor${i}`).value,
          subtotal: document.getElementById(`subtotal${i}`).value,
          taxas: document.getElementById(`taxas${i}`).value,
          totalComTaxas: document.getElementById(`valorTotalComTaxas${i}`).value
        });
      }
    }
    let previewRows = '';
    categoriasArray.forEach((cat, index) => {
      previewRows += `<p><strong>Categoria ${index+1}:</strong> ${cat.categoria} | Período: ${cat.periodo} | Quantidade: ${cat.quantidade} | Valor: R$ ${cat.valor} | Subtotal: R$ ${cat.subtotal} | Taxas: ${cat.taxas}% | Total com Taxas: R$ ${cat.totalComTaxas}</p>`;
    });
    document.getElementById('previewHotel').innerHTML = `
      <h3>Pré-visualização - Hotel</h3>
      <p><strong>Hotel:</strong> ${document.getElementById('nomeHotel').value}</p>
      ${previewRows}
      <p><strong>Observações:</strong> ${document.getElementById('observacoesHotel').value}</p>
      <p><strong>Prazo:</strong> ${prazo}</p>
    `;
  }
  document.addEventListener('input', function(){
    updatePreviewAereo();
    updatePreviewTransfer();
    updatePreviewHotel();
  });
  
  // ===================
  // Eventos de Exibição
  // ===================
  document.getElementById('tipoTrecho').addEventListener('change', function(){
    if(this.value === 'idaVolta'){
      document.getElementById('voltaFields').classList.remove('hidden');
    } else {
      document.getElementById('voltaFields').classList.add('hidden');
    }
  });
  document.getElementById('companhiaAerea').addEventListener('change', function(){
    if(this.value === 'OUTROS'){
      document.getElementById('outraCompanhia').classList.remove('hidden');
    } else {
      document.getElementById('outraCompanhia').classList.add('hidden');
    }
  });
  document.getElementById('tipoVeiculo').addEventListener('change', function(){
    if(this.value === 'OUTROS'){
      document.getElementById('outroTipoVeiculo').classList.remove('hidden');
    } else {
      document.getElementById('outroTipoVeiculo').classList.add('hidden');
    }
  });
  document.getElementById('tipoServico').addEventListener('change', function(){
    const aereoSection = document.getElementById('aereoFormSection');
    const transferSection = document.getElementById('transferFormSection');
    const hotelSection = document.getElementById('hotelFormSection');
    if(this.value === 'aereo'){
      aereoSection.classList.remove('hidden');
      transferSection.classList.add('hidden');
      hotelSection.classList.add('hidden');
    } else if(this.value === 'transfer'){
      transferSection.classList.remove('hidden');
      aereoSection.classList.add('hidden');
      hotelSection.classList.add('hidden');
    } else if(this.value === 'hotel'){
      hotelSection.classList.remove('hidden');
      aereoSection.classList.add('hidden');
      transferSection.classList.add('hidden');
    }
  });
  document.getElementById('limparFormulario').addEventListener('click', function(){
    document.getElementById('aereoForm').reset();
    document.getElementById('tabelaContainerAereo').classList.add('hidden');
  });
  document.getElementById('limparFormularioTransfer').addEventListener('click', function(){
    document.getElementById('transferForm').reset();
    document.getElementById('tabelaContainerTransfer').classList.add('hidden');
    transferCounter = 1;
    document.getElementById('transfersContainer').innerHTML = `
      <div class="transferItem">
        <h3>Transfer 1</h3>
        <div class="form-group">
          <label for="roteiroTransfer1"><i class="fas fa-route"></i> Roteiro:</label>
          <input type="text" id="roteiroTransfer1" placeholder="Ex: Aeroporto -> Hotel" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="dataTransfer1"><i class="fas fa-calendar-alt"></i> Data:</label>
            <input type="date" id="dataTransfer1" required>
          </div>
          <div class="form-group">
            <label for="horaTransfer1"><i class="fas fa-clock"></i> Horário:</label>
            <input type="time" id="horaTransfer1" required>
          </div>
        </div>
        <button type="button" class="removerTransfer"><i class="fas fa-trash"></i> Remover Transfer</button>
      </div>
    `;
  });
  document.getElementById('limparFormularioHotel').addEventListener('click', function(){
    document.getElementById('hotelForm').reset();
    document.getElementById('tabelaContainerHotel').classList.add('hidden');
  });
  
  // ===================
  // Cálculo do Valor Total (Aéreo)
  // ===================
  function calcularTotal(){
    const quantidade = parseFloat(document.getElementById('quantidadePassageiros').value) || 0;
    let valorStr = document.getElementById('valorPorPassageiro').value;
    valorStr = valorStr.replace(/\./g, '').replace(',', '.');
    const valor = parseFloat(valorStr) || 0;
    const total = quantidade * valor;
    document.getElementById('valorTotal').value = total.toFixed(2);
  }
  document.getElementById('quantidadePassageiros').addEventListener('input', calcularTotal);
  document.getElementById('valorPorPassageiro').addEventListener('input', calcularTotal);
  
  // ===================
  // Geração da Tabela Aéreo
  // ===================
  document.getElementById('aereoForm').addEventListener('submit', function(event){
    event.preventDefault();
    const tipoTrecho = document.getElementById('tipoTrecho').value;
    const dados = {
      companhiaAerea: document.getElementById('companhiaAerea').value === 'OUTROS'
        ? document.getElementById('outraCompanhia').value
        : document.getElementById('companhiaAerea').value,
      quantidadePassageiros: document.getElementById('quantidadePassageiros').value,
      valorPorPassageiro: document.getElementById('valorPorPassageiro').value,
      valorTotal: document.getElementById('valorTotal').value,
      // Origem e Destino digitados:
      origem: document.getElementById('origem').value,
      destino: document.getElementById('destino').value,
      numeroVooIda: document.getElementById('numeroVooIda').value,
      dataDecolagemIda: formatarDataHora(document.getElementById('dataDecolagemIda').value, document.getElementById('horaDecolagemIda').value),
      dataPousoIda: formatarDataHora(document.getElementById('dataPousoIda').value, document.getElementById('horaPousoIda').value),
      tarifaIda: document.getElementById('tarifaIda').value,
      numeroVooVolta: document.getElementById('numeroVooVolta').value,
      dataDecolagemVolta: document.getElementById('dataDecolagemVolta').value 
        ? formatarDataHora(document.getElementById('dataDecolagemVolta').value, document.getElementById('horaDecolagemVolta').value)
        : '-',
      dataPousoVolta: document.getElementById('dataPousoVolta').value 
        ? formatarDataHora(document.getElementById('dataPousoVolta').value, document.getElementById('horaPousoVolta').value)
        : '-',
      tarifaVolta: document.getElementById('tarifaVolta').value,
      observacoes: document.getElementById('observacoes').value
    };
    const headerRow = document.getElementById('aereoHeader');
    const tbody = document.getElementById('aereoBody');
    
    if(tipoTrecho === 'ida'){
      // Header para somente ida (12 colunas, sem prazo)
      headerRow.innerHTML = `
        <th>Companhia Aérea</th>
        <th>Passageiros</th>
        <th>Valor por Passageiro</th>
        <th>Valor Total</th>
        <th>Origem</th>
        <th>Destino</th>
        <th>Número do Voo (Ida)</th>
        <th>Decolagem (Ida)</th>
        <th>Pouso (Ida)</th>
        <th>Tarifa (Ida)</th>
        <th>Observações</th>
      `;
      tbody.innerHTML = `
        <tr>
          <td>${dados.companhiaAerea}</td>
          <td>${dados.quantidadePassageiros}</td>
          <td>R$ ${dados.valorPorPassageiro}</td>
          <td>R$ ${dados.valorTotal}</td>
          <td>${dados.origem}</td>
          <td>${dados.destino}</td>
          <td>${dados.numeroVooIda}</td>
          <td>${dados.dataDecolagemIda}</td>
          <td>${dados.dataPousoIda}</td>
          <td>${dados.tarifaIda}</td>
          <td>${dados.observacoes}</td>
        </tr>
      `;
    } else {
      // Para "idaVolta": header com 12 colunas
      headerRow.innerHTML = `
        <th>Companhia Aérea</th>
        <th>Passageiros</th>
        <th>Valor por Passageiro</th>
        <th>Valor Total</th>
        <th>Observações</th>
        <th>Origem</th>
        <th>Destino</th>
        <th>Número do Voo</th>
        <th>Decolagem</th>
        <th>Pouso</th>
        <th>Tarifa</th>
      `;
      tbody.innerHTML = `
        <tr>
          <td rowspan="2">${dados.companhiaAerea}</td>
          <td rowspan="2">${dados.quantidadePassageiros}</td>
          <td rowspan="2">R$ ${dados.valorPorPassageiro}</td>
          <td rowspan="2">R$ ${dados.valorTotal}</td>
          <td rowspan="2">${dados.observacoes}</td>
          <td>${dados.origem}</td>
          <td>${dados.destino}</td>
          <td>${dados.numeroVooIda}</td>
          <td>${dados.dataDecolagemIda}</td>
          <td>${dados.dataPousoIda}</td>
          <td>${dados.tarifaIda}</td>
        </tr>
        <tr>
          <td>${dados.destino}</td>
          <td>${dados.origem}</td>
          <td>${dados.numeroVooVolta}</td>
          <td>${dados.dataDecolagemVolta}</td>
          <td>${dados.dataPousoVolta}</td>
          <td>${dados.tarifaVolta}</td>
        </tr>
      `;
    }
    document.getElementById('tabelaContainerAereo').classList.remove('hidden');
    document.getElementById('tabelaContainerTransfer').classList.add('hidden');
    document.getElementById('tabelaContainerHotel').classList.add('hidden');
  });
  
  // ===================
  // Geração da Tabela Transfer
  // ===================
  document.getElementById('transferForm').addEventListener('submit', function(event){
    event.preventDefault();
    let tipoVeiculo = document.getElementById('tipoVeiculo').value;
    if(tipoVeiculo === 'OUTROS'){
      tipoVeiculo = document.getElementById('outroTipoVeiculo').value;
    }
    const empresa = document.getElementById('empresaTransfer').value;
    const quantidadePassageiros = document.getElementById('quantidadePassageirosTransfer').value;
    const valorTransferGeral = document.getElementById('valorTransferGeral').value;
    const observacoes = document.getElementById('observacoesTransfer').value;
    const transferItems = document.querySelectorAll('#transfersContainer .transferItem');
    const numTransfers = transferItems.length;
    let rowsHTML = '';
    transferItems.forEach((item, index) => {
      const roteiro = item.querySelector('input[id^="roteiroTransfer"]').value;
      const dataTransfer = item.querySelector('input[id^="dataTransfer"]').value.split('-').reverse().join('/');
      const horaTransfer = item.querySelector('input[id^="horaTransfer"]').value;
      if(index === 0){
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
    document.getElementById('transferBody').innerHTML = rowsHTML;
    document.getElementById('tabelaContainerTransfer').classList.remove('hidden');
    document.getElementById('tabelaContainerAereo').classList.add('hidden');
    document.getElementById('tabelaContainerHotel').classList.add('hidden');
  });
  
  document.getElementById('transfersContainer').addEventListener('click', function(event){
    if(event.target.closest('.removerTransfer')){
      event.target.closest('.transferItem').remove();
    }
  });
  let transferCounter = 1;
  document.getElementById('adicionarTransfer').addEventListener('click', function(){
    transferCounter++;
    const novaTransfer = `
      <div class="transferItem">
        <h3>Transfer ${transferCounter}</h3>
        <div class="form-group">
          <label for="roteiroTransfer${transferCounter}"><i class="fas fa-route"></i> Roteiro:</label>
          <input type="text" id="roteiroTransfer${transferCounter}" placeholder="Ex: Hotel -> Aeroporto" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="dataTransfer${transferCounter}"><i class="fas fa-calendar-alt"></i> Data:</label>
            <input type="date" id="dataTransfer${transferCounter}" required>
          </div>
          <div class="form-group">
            <label for="horaTransfer${transferCounter}"><i class="fas fa-clock"></i> Horário:</label>
            <input type="time" id="horaTransfer${transferCounter}" required>
          </div>
        </div>
        <button type="button" class="removerTransfer"><i class="fas fa-trash"></i> Remover Transfer</button>
      </div>
    `;
    document.getElementById('transfersContainer').insertAdjacentHTML('beforeend', novaTransfer);
  });
  
  // ===================
  // Geração da Tabela Hotel
  // ===================
  let contadorCategorias = 1;
  document.addEventListener('DOMContentLoaded', function(){
    const q1 = document.getElementById('quantidade1');
    const v1 = document.getElementById('valor1');
    const t1 = document.getElementById('taxas1');
    if(q1) q1.addEventListener('input', calcularHotel);
    if(v1) v1.addEventListener('input', calcularHotel);
    if(t1) t1.addEventListener('input', calcularHotel);
  });
  function calcularHotel(){
    for(let i = 1; i <= contadorCategorias; i++){
      const quantidade = parseFloat(document.getElementById(`quantidade${i}`)?.value) || 0;
      let valorStr = document.getElementById(`valor${i}`)?.value || "0";
      valorStr = valorStr.replace(/\./g,'').replace(',', '.');
      const valor = parseFloat(valorStr) || 0;
      const taxas = parseFloat(document.getElementById(`taxas${i}`)?.value) || 0;
      if(!isNaN(quantidade) && !isNaN(valor) && !isNaN(taxas)){
        const subtotal = quantidade * valor;
        const totalComTaxas = subtotal + (subtotal * (taxas/100));
        if(document.getElementById(`subtotal${i}`)){
          document.getElementById(`subtotal${i}`).value = subtotal.toFixed(2);
        }
        if(document.getElementById(`valorTotalComTaxas${i}`)){
          document.getElementById(`valorTotalComTaxas${i}`).value = totalComTaxas.toFixed(2);
        }
      }
    }
  }
  document.getElementById('hotelForm').addEventListener('submit', function(event){
    event.preventDefault();
    const nomeHotel = document.getElementById('nomeHotel').value;
    const observacoes = document.getElementById('observacoesHotel').value;
    const prazoRaw = document.getElementById('prazoHotel').value;
    const prazo = prazoRaw ? prazoRaw.split('-').reverse().join('/') : '';
    let categoriasArray = [];
    for(let i = 1; i <= contadorCategorias; i++){
      const catElem = document.getElementById(`categoria${i}`);
      if(catElem){
        categoriasArray.push({
          categoria: catElem.value,
          periodo: document.getElementById(`periodo${i}`).value,
          quantidade: document.getElementById(`quantidade${i}`).value,
          valor: document.getElementById(`valor${i}`).value,
          subtotal: document.getElementById(`subtotal${i}`).value,
          taxas: document.getElementById(`taxas${i}`).value,
          totalComTaxas: document.getElementById(`valorTotalComTaxas${i}`).value
        });
      }
    }
    let rows = '';
    categoriasArray.forEach(cat => {
      rows += `
        <tr>
          <td>${nomeHotel}</td>
          <td>${cat.categoria}</td>
          <td>${cat.periodo}</td>
          <td>${cat.quantidade}</td>
          <td>R$ ${cat.valor}</td>
          <td>R$ ${cat.subtotal}</td>
          <td>${cat.taxas}%</td>
          <td>R$ ${cat.totalComTaxas}</td>
          <td>${observacoes}</td>
          <td>${prazo}</td>
        </tr>
      `;
    });
    document.getElementById('hotelBody').innerHTML = rows;
    document.getElementById('tabelaContainerHotel').classList.remove('hidden');
    document.getElementById('tabelaContainerAereo').classList.add('hidden');
    document.getElementById('tabelaContainerTransfer').classList.add('hidden');
  });
  // Remoção de Categoria via event delegation
  document.getElementById('categoriasContainer').addEventListener('click', function(event){
    const btn = event.target.closest('.removerCategoria');
    if(btn){
      btn.parentElement.remove();
    }
  });
  function formatarDataHora(data, hora){
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano} ${hora}`;
  }
  document.getElementById('adicionarCategoria').addEventListener('click', function(){
    contadorCategorias++;
    const novaCategoria = `
      <div class="categoria">
        <h3>Categoria de Hospedagem</h3>
        <div class="form-group">
          <label for="categoria${contadorCategorias}"><i class="fas fa-star"></i> Categoria:</label>
          <input type="text" id="categoria${contadorCategorias}" placeholder="Ex: Standard" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="periodo${contadorCategorias}"><i class="fas fa-calendar-alt"></i> Período:</label>
            <input type="text" id="periodo${contadorCategorias}" placeholder="Ex: 01/01/2024 a 05/01/2024" required>
          </div>
          <div class="form-group">
            <label for="quantidade${contadorCategorias}"><i class="fas fa-users"></i> Quantidade:</label>
            <input type="number" id="quantidade${contadorCategorias}" placeholder="Ex: 2" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="valor${contadorCategorias}"><i class="fas fa-dollar-sign"></i> Valor:</label>
            <input type="text" id="valor${contadorCategorias}" placeholder="Ex: 200,00" required>
          </div>
          <div class="form-group">
            <label for="subtotal${contadorCategorias}"><i class="fas fa-calculator"></i> Subtotal:</label>
            <input type="number" id="subtotal${contadorCategorias}" readonly>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="taxas${contadorCategorias}"><i class="fas fa-percentage"></i> Taxas:</label>
            <input type="number" id="taxas${contadorCategorias}" step="0.01" placeholder="Ex: 10.00" required>
          </div>
          <div class="form-group">
            <label for="valorTotalComTaxas${contadorCategorias}"><i class="fas fa-calculator"></i> Valor Total com Taxas:</label>
            <input type="number" id="valorTotalComTaxas${contadorCategorias}" readonly>
          </div>
        </div>
        <button type="button" class="removerCategoria"><i class="fas fa-trash"></i> Remover Categoria</button>
      </div>
    `;
    document.getElementById('categoriasContainer').insertAdjacentHTML('beforeend', novaCategoria);
    // Rebind dos event listeners para os novos campos
    const qField = document.getElementById(`quantidade${contadorCategorias}`);
    const vField = document.getElementById(`valor${contadorCategorias}`);
    const tField = document.getElementById(`taxas${contadorCategorias}`);
    if(qField) qField.addEventListener('input', calcularHotel);
    if(vField) vField.addEventListener('input', calcularHotel);
    if(tField) tField.addEventListener('input', calcularHotel);
  });
  
