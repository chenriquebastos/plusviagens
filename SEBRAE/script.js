// Mostrar/ocultar campos de volta
document.getElementById('tipoTrecho').addEventListener('change', function() {
    const voltaFields = document.getElementById('voltaFields');
    if (this.value === 'idaVolta') {
        voltaFields.classList.remove('hidden');
    } else {
        voltaFields.classList.add('hidden');
    }
});

// Mostrar campo "OUTROS" para companhia aérea
document.getElementById('companhiaAerea').addEventListener('change', function() {
    const outraCompanhia = document.getElementById('outraCompanhia');
    if (this.value === 'OUTROS') {
        outraCompanhia.classList.remove('hidden');
    } else {
        outraCompanhia.classList.add('hidden');
    }
});

// Mostrar campo "OUTROS" para tipo de veículo
document.getElementById('tipoVeiculo').addEventListener('change', function() {
    const outroTipoVeiculo = document.getElementById('outroTipoVeiculo');
    if (this.value === 'OUTROS') {
        outroTipoVeiculo.classList.remove('hidden');
    } else {
        outroTipoVeiculo.classList.add('hidden');
    }
});

// Calcular valor total
document.getElementById('quantidadePassageiros').addEventListener('input', calcularTotal);
document.getElementById('valorPorPassageiro').addEventListener('input', calcularTotal);

function calcularTotal() {
    const quantidade = parseFloat(document.getElementById('quantidadePassageiros').value);
    const valorPorPassageiro = parseFloat(document.getElementById('valorPorPassageiro').value);
    const valorTotal = quantidade * valorPorPassageiro;
    document.getElementById('valorTotal').value = valorTotal.toFixed(2);
}

// Limpar formulário Aéreo
document.getElementById('limparFormulario').addEventListener('click', function() {
    document.getElementById('aereoForm').reset();
    document.getElementById('tabelaContainerAereo').classList.add('hidden');
});

// Limpar formulário Transfer
document.getElementById('limparFormularioTransfer').addEventListener('click', function() {
    document.getElementById('transferForm').reset();
    document.getElementById('tabelaContainerTransfer').classList.add('hidden');
});

// Limpar formulário Hotel
document.getElementById('limparFormularioHotel').addEventListener('click', function() {
    document.getElementById('hotelForm').reset();
    document.getElementById('tabelaContainerHotel').classList.add('hidden');
});

// Alternar entre formulários Aéreo, Transfer e Hotel
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

// Gerar tabela Aéreo
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
                document.getElementById('horaPousoVolta').value
            ) 
            : '-',
        tarifaVolta: document.getElementById('tarifaVolta').value,
        observacoes: document.getElementById('observacoes').value,
        prazo: document.getElementById('prazo').value.split('-').reverse().join('/')
    };

    const tbody = document.querySelector('#tabelaCotacaoAereo tbody');
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
            <td>${dados.tipoTrecho === 'idaVolta' ? dados.numeroVooVolta : '-'}</td>
            <td>${dados.tipoTrecho === 'idaVolta' ? dados.dataDecolagemVolta : '-'}</td>
            <td>${dados.tipoTrecho === 'idaVolta' ? dados.dataPousoVolta : '-'}</td>
            <td>${dados.tipoTrecho === 'idaVolta' ? dados.tarifaVolta : '-'}</td>
            <td>${dados.observacoes}</td>
            <td>${dados.prazo}</td>
        </tr>
    `;

    document.getElementById('tabelaContainerAereo').classList.remove('hidden');
    document.getElementById('tabelaContainerTransfer').classList.add('hidden');
    document.getElementById('tabelaContainerHotel').classlList.add('hidden');
});

// Gerar tabela Transfer
document.getElementById('transferForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const dados = {
        empresa: document.getElementById('empresaTransfer').value,
        tipoVeiculo: document.getElementById('tipoVeiculo').value === 'OUTROS' 
            ? document.getElementById('outroTipoVeiculo').value 
            : document.getElementById('tipoVeiculo').value,
        quantidadePassageiros: document.getElementById('quantidadePassageirosTransfer').value,
        valorTransfer: document.getElementById('valorTransfer').value,
        roteiro: document.getElementById('roteiroTransfer').value,
        data: document.getElementById('dataTransfer').value.split('-').reverse().join('/'),
        hora: document.getElementById('horaTransfer').value,
        observacoes: document.getElementById('observacoesTransfer').value,
        prazo: document.getElementById('prazoTransfer').value.split('-').reverse().join('/')
    };

    const tbody = document.querySelector('#tabelaCotacaoTransfer tbody');
    tbody.innerHTML = `
        <tr>
            <td>${dados.empresa}</td>
            <td>${dados.tipoVeiculo}</td>
            <td>${dados.quantidadePassageiros}</td>
            <td>R$ ${dados.valorTransfer}</td>
            <td>${dados.roteiro}</td>
            <td>${dados.data}</td>
            <td>${dados.hora}</td>
            <td>${dados.observacoes}</td>
            <td>${dados.prazo}</td>
        </tr>
    `;

    document.getElementById('tabelaContainerTransfer').classList.remove('hidden');
    document.getElementById('tabelaContainerAereo').classList.add('hidden');
    document.getElementById('tabelaContainerHotel').classList.add('hidden');
});

// Adicionar nova categoria de hospedagem
let contadorCategorias = 1; // Contador para IDs únicos

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
                    <input type="number" id="valor${contadorCategorias}" step="0.01" placeholder="Ex: 200.00" required>
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

    // Adicionar listeners para calcular subtotal e valor total com taxas
    document.getElementById(`quantidade${contadorCategorias}`).addEventListener('input', calcularHotel);
    document.getElementById(`valor${contadorCategorias}`).addEventListener('input', calcularHotel);
    document.getElementById(`taxas${contadorCategorias}`).addEventListener('input', calcularHotel);

    // Adicionar listener para remover categoria
    const botoesRemover = document.querySelectorAll('.removerCategoria');
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
});

// Adicionar listeners para a primeira categoria ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('quantidade1').addEventListener('input', calcularHotel);
    document.getElementById('valor1').addEventListener('input', calcularHotel);
    document.getElementById('taxas1').addEventListener('input', calcularHotel);
});

// Calcular subtotal e valor total com taxas
function calcularHotel() {
    for (let i = 1; i <= contadorCategorias; i++) {
        const quantidade = parseFloat(document.getElementById(`quantidade${i}`)?.value) || 0;
        const valor = parseFloat(document.getElementById(`valor${i}`)?.value) || 0;
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

// Gerar tabela Hotel
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

// Baixar tabela Aéreo como PNG
document.getElementById('baixarTabelaAereo').addEventListener('click', function() {
    // Selecionar a tabela original
    const tabelaOriginal = document.querySelector("#tabelaCotacaoAereo");

    // Criar um elemento temporário para a tabela clonada
    const containerTemporario = document.createElement('div');
    containerTemporario.style.position = 'absolute';
    containerTemporario.style.left = '-9999px'; // Mover para fora da tela
    document.body.appendChild(containerTemporario);

    // Clonar a tabela e aplicar estilos
    const tabelaClonada = tabelaOriginal.cloneNode(true);
    tabelaClonada.style.backgroundColor = "white";
    tabelaClonada.style.color = "black";

    // Manter o cabeçalho com a cor #292d96
    const cabecalho = tabelaClonada.querySelectorAll("thead th");
    cabecalho.forEach(th => {
        th.style.backgroundColor = "#292d96";
        th.style.color = "white";
    });

    // Aplicar estilos às células da tabela
    const celulas = tabelaClonada.querySelectorAll("td");
    celulas.forEach(celula => {
        celula.style.backgroundColor = "white";
        celula.style.color = "black";
    });

    // Adicionar a tabela clonada ao container temporário
    containerTemporario.appendChild(tabelaClonada);

    // Gerar a imagem com html2canvas
    html2canvas(containerTemporario.firstChild, {
        logging: true, // Ativar logs para depuração
        useCORS: true, // Permitir CORS para evitar problemas com imagens
        scale: 2, // Aumentar a escala para melhorar a qualidade da imagem
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'tabela_cotacao_aereo.png';
        link.href = canvas.toDataURL();
        link.click();

        // Remover o container temporário após o download
        document.body.removeChild(containerTemporario);
    }).catch(err => {
        console.error("Erro ao gerar a imagem:", err);
        document.body.removeChild(containerTemporario); // Limpar em caso de erro
    });
});

// Baixar tabela Transfer como PNG
document.getElementById('baixarTabelaTransfer').addEventListener('click', function() {
    // Selecionar a tabela original
    const tabelaOriginal = document.querySelector("#tabelaCotacaoTransfer");

    // Criar um elemento temporário para a tabela clonada
    const containerTemporario = document.createElement('div');
    containerTemporario.style.position = 'absolute';
    containerTemporario.style.left = '-9999px'; // Mover para fora da tela
    document.body.appendChild(containerTemporario);

    // Clonar a tabela e aplicar estilos
    const tabelaClonada = tabelaOriginal.cloneNode(true);
    tabelaClonada.style.backgroundColor = "white";
    tabelaClonada.style.color = "black";

    // Manter o cabeçalho com a cor #292d96
    const cabecalho = tabelaClonada.querySelectorAll("thead th");
    cabecalho.forEach(th => {
        th.style.backgroundColor = "#292d96";
        th.style.color = "white";
    });

    // Aplicar estilos às células da tabela
    const celulas = tabelaClonada.querySelectorAll("td");
    celulas.forEach(celula => {
        celula.style.backgroundColor = "white";
        celula.style.color = "black";
    });

    // Adicionar a tabela clonada ao container temporário
    containerTemporario.appendChild(tabelaClonada);

    // Gerar a imagem com html2canvas
    html2canvas(containerTemporario.firstChild, {
        logging: true, // Ativar logs para depuração
        useCORS: true, // Permitir CORS para evitar problemas com imagens
        scale: 2, // Aumentar a escala para melhorar a qualidade da imagem
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'tabela_cotacao_transfer.png';
        link.href = canvas.toDataURL();
        link.click();

        // Remover o container temporário após o download
        document.body.removeChild(containerTemporario);
    }).catch(err => {
        console.error("Erro ao gerar a imagem:", err);
        document.body.removeChild(containerTemporario); // Limpar em caso de erro
    });
});

// Baixar tabela Hotel como PNG
document.getElementById('baixarTabelaHotel').addEventListener('click', function() {
    // Selecionar a tabela original
    const tabelaOriginal = document.querySelector("#tabelaCotacaoHotel");

    // Criar um elemento temporário para a tabela clonada
    const containerTemporario = document.createElement('div');
    containerTemporario.style.position = 'absolute';
    containerTemporario.style.left = '-9999px'; // Mover para fora da tela
    document.body.appendChild(containerTemporario);

    // Clonar a tabela e aplicar estilos
    const tabelaClonada = tabelaOriginal.cloneNode(true);
    tabelaClonada.style.backgroundColor = "white";
    tabelaClonada.style.color = "black";

    // Manter o cabeçalho com a cor #292d96
    const cabecalho = tabelaClonada.querySelectorAll("thead th");
    cabecalho.forEach(th => {
        th.style.backgroundColor = "#292d96";
        th.style.color = "white";
    });

    // Aplicar estilos às células da tabela
    const celulas = tabelaClonada.querySelectorAll("td");
    celulas.forEach(celula => {
        celula.style.backgroundColor = "white";
        celula.style.color = "black";
    });

    // Adicionar a tabela clonada ao container temporário
    containerTemporario.appendChild(tabelaClonada);

    // Gerar a imagem com html2canvas
    html2canvas(containerTemporario.firstChild, {
        logging: true, // Ativar logs para depuração
        useCORS: true, // Permitir CORS para evitar problemas com imagens
        scale: 2, // Aumentar a escala para melhorar a qualidade da imagem
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'tabela_cotacao_hotel.png';
        link.href = canvas.toDataURL();
        link.click();

        // Remover o container temporário após o download
        document.body.removeChild(containerTemporario);
    }).catch(err => {
        console.error("Erro ao gerar a imagem:", err);
        document.body.removeChild(containerTemporario); // Limpar em caso de erro
    });
});

// Formatar data e horário
function formatarDataHora(data, hora) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano} ${hora}`;
}