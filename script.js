document.getElementById('calcular').addEventListener('click', function() {
    const proposicao = document.getElementById('proposicao').value;
    let resultado;

    try {
        resultado = gerarTabelaVerdade(proposicao);
        document.getElementById('resultado').innerText = resultado.tabela;
        document.getElementById('interpretacao').innerText = resultado.interpretacao;
    } catch (error) {
        document.getElementById('resultado').innerText = `Erro: ${error.message}`;
        document.getElementById('interpretacao').innerText = '';
    }
});

function gerarTabelaVerdade(proposicao) {
    const variaveis = Array.from(new Set(proposicao.match(/[A-Z]/g))).sort(); // Extrai letras maiúsculas únicas
    const totalVariaveis = variaveis.length;
    const totalCombinacoes = Math.pow(2, totalVariaveis); // Total de combinações de verdade
    const resultado = [];
    const interpretacao = [];

    // Cabeçalho da tabela
    resultado.push([...variaveis, proposicao].join(' | '));

    for (let i = 0; i < totalCombinacoes; i++) {
        const valoresAtual = variaveis.map((_, index) => (i >> (totalVariaveis - 1 - index)) & 1); // Gera 0 ou 1 para cada variável
        let expression = proposicao;

        // Substitui as variáveis pelos valores correspondentes
        variaveis.forEach((varName, index) => {
            expression = expression.replace(new RegExp(varName, 'g'), valoresAtual[index]);
        });

        // Avalia a expressão
        const resultadoLinha = eval(expression
            .replace(/∧/g, '&&')
            .replace(/∨/g, '||')
            .replace(/¬/g, '!')
            .replace(/→/g, '(!P || Q)') // Para implicação
            .replace(/↔/g, '((P && Q) || (!P && !Q))')); // Para bicondicional

        resultado.push([...valoresAtual, resultadoLinha ? 1 : 0].join(' | '));

        // Adiciona a interpretação da linha
        interpretacao.push(`Para ${variaveis.map((v, idx) => `${v} = ${valoresAtual[idx]}`).join(', ')}, o resultado de "${proposicao}" é ${resultadoLinha ? 'verdadeiro' : 'falso'}.`);
    }

    return {
        tabela: resultado.join('\n'),
        interpretacao: interpretacao.join('\n')
    };
}
