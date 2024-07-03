function processNames() {
    console.log("Processar nomes foi chamado!");

    const namesInput = document.getElementById('namesInput').value.split('\n');
    const processedData = [];
    const maxLength = 30;

    // Function to remove special characters, trim spaces and remove tabs
    const normalize = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\t/g, '').trim();
    };

    namesInput.forEach((name, index) => {
        const normalized = normalize(name);
        const uppercased = normalized.toUpperCase();
        const charCount = uppercased.length;
        const isLong = charCount >= maxLength;

        processedData.push({
            id: index + 1,
            originalName: name,
            modifiedName: uppercased,
            charCount: charCount,
            isLong: isLong
        });
    });

    console.log('Processed Data:', processedData);
    generateExcel(processedData);
}

async function generateExcel(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Resultados');

    worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nome Original', key: 'originalName', width: 30 },
        { header: 'Nome Modificado', key: 'modifiedName', width: 30 },
        { header: 'Contagem de Caracteres', key: 'charCount', width: 20 }
    ];

    data.forEach(row => {
        const newRow = worksheet.addRow(row);
        if (row.isLong) {
            newRow.eachCell({ includeEmpty: true }, function(cell) {
                cell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF0000' } };
            });
        }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, 'nomes_processados.xlsx');
}
