const perguntas = [
    { texto: "Eu prefiro atividades que envolvam o uso de ferramentas ou máquinas.", area: "." },
    { texto: "Gosto de entender como os objetos funcionam por dentro.", area: "." },
    { texto: "Prefiro trabalhar ao ar livre do que em um escritório fechado.", area: "." },
    { texto: "Tenho facilidade em consertar coisas que quebraram em casa.", area: "." },
    { texto: "Atividades manuais me dão mais satisfação.", area: "Exatas" },
    { texto: "Atividades físicas e manuais me dão mais satisfação do que tarefas puramente intelectuais.", area: "." },
    { texto: "Eu me sinto bem executando projetos que entregam um resultado físico e visível.", area: "." },
    { texto: "Eu gosto de passar tempo resolvendo problemas matemáticos ou lógicos complexos.", area:"." },
    { texto: "Tenho muita curiosidade sobre como o universo e a natureza funcionam.", area: "." },
    { texto: "Eu prefiro ler artigos científicos ou técnicos do que obras de ficção.", area: "." },
    { texto: "Gosto de investigar as causas de um problema antes de tentar resolvê-lo.", area: "." },
    { texto: "Trabalhar em um laboratório ou com análise de dados parece algo estimulante.", area: "." },
    { texto: "Eu me sinto confortável lidando com teorias e conceitos abstratos.", area: "." },
    { texto: "Eu valorizo muito a liberdade de criação no meu dia a dia.", area: "." },
    { texto: "Gosto de me expressar através da música, escrita, desenho ou outras artes.", area: "." },
    { texto: "Eu reparo facilmente na estética e no design das coisas ao meu redor.", area: "." },
    { texto: "Prefiro ambientes de trabalho informais e visualmente estimulantes.", area: "." },
    { texto: "Muitas vezes encontro soluções fora da caixa para os problemas.", area: "." },
    { texto: "Eu me sinto atraído por profissões que permitam inovação constante.", area: "." },
    { texto: "Ajudar outras pessoas a resolverem seus problemas me traz muita satisfação.", area: "." },
    { texto: "Eu me sinto à vontade ensinando algo novo para alguém.", area: "." },
    { texto: "Prefiro trabalhar em equipe do que realizar tarefas sozinho.", area: "." },
    { texto: "Eu tenho facilidade em perceber quando alguém ao meu redor não está bem.", area: "." },
    { texto: "Projetos que geram impacto social positivo são prioridade para mim.", area: "." },
    { texto: "Gosto de ouvir as histórias de vida e as experiências das pessoas.", area: "." },
    { texto: "Eu me sinto confortável tomando decisões importantes sob pressão.", area: "." },
    { texto: "Gosto de convencer as pessoas sobre as minhas ideias e projetos.", area: "." },
    { texto: "Tenho facilidade em liderar grupos e organizar tarefas coletivas.", area: "." },
    { texto: "O mundo dos negócios, startups e vendas me desperta interesse.", area: "." },
    { texto: "Eu me considero uma pessoa competitiva e focada em metas.", area: "." },
    { texto: "Gosto de assumir riscos se houver uma chance clara de sucesso.", area: "." },
    { texto: "Eu me sinto satisfeito quando consigo organizar informações em planilhas ou listas.", area: "." },
    { texto: "Prefiro seguir instruções claras e rotinas bem definidas.", area: "." },
    { texto: "Sou uma pessoa muito atenta aos detalhes que outros costumam ignorar.", area: "." },
    { texto: "Manter documentos e registros organizados é algo natural para mim.", area: "." },
    { texto: "Eu prefiro ambientes de trabalho estruturados e com regras claras.", area: "." },
    { texto: "Gosto de planejar tudo com antecedência para evitar imprevistos.", area: "." },
    { texto: "Eu me interesso por aprender linguagens de programação ou entender algoritmos.", area: "." },
    { texto: "Acompanhar as últimas tendências tecnológicas é um dos meus passatempos.", area: "." },
    { texto: "Eu me sinto confortável usando ferramentas digitais para otimizar meu trabalho.", area: "." },
];

let paginaAtual = 0;
const perguntasPorPagina = 8; 
let respostasDadas = {};

const totalPaginas = Math.ceil(perguntas.length / perguntasPorPagina);

const container = document.getElementById('container-quiz');
const btnProx = document.getElementById('btn-prox');
const btnAnt = document.getElementById('btn-ant');

function carregarPagina() {
    container.innerHTML = "";

    const inicio = paginaAtual * perguntasPorPagina;
    const fim = inicio + perguntasPorPagina;
    const perguntasExibidas = perguntas.slice(inicio, fim);

    perguntasExibidas.forEach((item, index) => {
        const indiceReal = inicio + index;
        const pontoSalvo = respostasDadas[indiceReal] || null;

        const card = document.createElement('div');
        card.className = 'bloco-Pergunta';
        card.innerHTML = `
            <h1>Pergunta ${indiceReal + 1}</h1>
            <p>${item.texto}</p>
            <nav class="opções" data-pergunta="${indiceReal}">
                <button class="azul1 ${pontoSalvo === 1 ? 'ativo' : ''}" onclick="votar(${indiceReal}, 1, event)"title="discordo totalmente"></button>
                <button class="azul2 ${pontoSalvo === 2 ? 'ativo' : ''}" onclick="votar(${indiceReal}, 2, event)"title="discordo totalmente"></button>
                <button class="azul3 ${pontoSalvo === 3 ? 'ativo' : ''}" onclick="votar(${indiceReal}, 3, event)"title="discordo totalmente"></button>
                <button class="azul2 ${pontoSalvo === 4 ? 'ativo' : ''}" onclick="votar(${indiceReal}, 4, event)"title="discordo totalmente"></button>
                <button class="azul1 ${pontoSalvo === 5 ? 'ativo' : ''}" onclick="votar(${indiceReal}, 5, event)"title="discordo totalmente"></button>
            </nav>
        `;
        container.appendChild(card);
    });

    atualizarInterface();
    atualizarBarraStatus();
}

window.votar = function(indice, pontos, event) {
    respostasDadas[indice] = pontos;

    const nav = document.querySelector(`nav[data-pergunta="${indice}"]`);
    nav.querySelectorAll('button').forEach(btn => btn.classList.remove('ativo'));
    event.target.classList.add('ativo');

    atualizarBarraStatus();
};

function atualizarBarraStatus() {
    const totalRespondidas = Object.keys(respostasDadas).length;
    const porcento = Math.round((totalRespondidas / perguntas.length) * 100);
    document.getElementById('status-texto').innerHTML =
        `${totalRespondidas} respondidas <span>${porcento}% completo</span>`;
}

function atualizarInterface() {
    document.getElementById('contador-paginas').innerText =
        `Página ${paginaAtual + 1} de ${totalPaginas}`;

    btnAnt.style.display = paginaAtual === 0 ? "none" : "inline-block";

    btnProx.innerText =
        paginaAtual === totalPaginas - 1 ? "Ver Resultado" : "Próxima Página";
}

btnProx.addEventListener('click', () => {
    const inicio = paginaAtual * perguntasPorPagina;
    const fim = inicio + perguntasPorPagina;
    const perguntasExibidas = perguntas.slice(inicio, fim);

    let todasRespondidas = true;

    perguntasExibidas.forEach((_, index) => {
        const indiceReal = inicio + index;
        if (!respostasDadas[indiceReal]) {
            todasRespondidas = false;
        }
    });

    if (!todasRespondidas) {
        alert("Por favor, responda todas as perguntas antes de continuar.");
        return;
    }

    if (paginaAtual < totalPaginas - 1) {
        paginaAtual++;
        carregarPagina();
        window.scrollTo(0, 0);
    } else {
        calcularEExibirResultado();
    }
});

btnAnt.addEventListener('click', () => {
    if (paginaAtual > 0) {
        paginaAtual--;
        carregarPagina();
    }
});

function calcularEExibirResultado() {
    let somaAreas = { Exatas: 0, Saude: 0, Humanas: 0, Tecnologia: 0 };

    perguntas.forEach((p, i) => {
        const pts = respostasDadas[i] || 0;
        if (somaAreas[p.area] !== undefined) {
            somaAreas[p.area] += pts;
        }
    });

}

carregarPagina();