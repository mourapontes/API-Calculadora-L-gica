document.getElementById('calcular').addEventListener('click', function() {
    const proposicao = document.getElementById('proposicao').value;
    let resultado;

    try {
        resultado = gerarTabelaVerdade(proposicao);
        document.getElementById('resultado').innerText = resultado;
    } catch (error) {
        document.getElementById('resultado').innerText = `Erro: ${error.message}`;
    }
});

function gerarTabelaVerdade(proposicao) {
    const valores = [];
    const headers = ['P', 'Q', 'R', proposicao];

    // Substitui os símbolos lógicos pelos operadores JavaScript
    const evalProposicao = proposicao
        .replace(/∧/g, '&&')
        .replace(/∨/g, '||')
        .replace(/¬/g, '!') // Para negação
        .replace(/→/g, '||') // Para implicação, substituindo por !P || Q
        .replace(/↔/g, '==='); // Para bicondicional

    for (let p = 0; p <= 1; p++) {
        for (let q = 0; q <= 1; q++) {
            for (let r = 0; r <= 1; r++) {
                // Substitui P, Q, R pelos valores 0 ou 1
                const expression = evalProposicao
                    .replace(/P/g, p)
                    .replace(/Q/g, q)
                    .replace(/R/g, r);
                
                // Avalia a expressão
                const resultado = eval(expression);
                valores.push(`P: ${p}, Q: ${q}, R: ${r} => ${resultado}`);
            }
        }
    }

    return `${headers.join(' | ')}\n${valores.join('\n')}`;
}
