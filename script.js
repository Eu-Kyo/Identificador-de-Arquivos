import { APP_SUGERIDO } from "./extensoes.js"; // caso for adicionar outras extensões/aplicativos, só modificar o arquivo.

const inputArquivo = document.getElementById("fileInput");
const botaoEnviar = document.getElementById("botaoEnviar");
const areaResultados = document.getElementById("resultados");

botaoEnviar.addEventListener("click", () => {
    inputArquivo.click();
})

inputArquivo.addEventListener("change", (evento) => {
    const arquivos = evento.target.files;
    if(!arquivos || arquivos.length === 0) return;

    areaResultados.innerHTML = "";

    Array.from(arquivos).forEach(processsarArquivo);
});

function processsarArquivo(arquivo){
    const extensao = obterExt(arquivo.name);

    const dados = {
        nome: arquivo.name, tamanho: formatarTamanho(arquivo.size), tipoMime: arquivo.type || "Desconhecido! MIME não identificado x-x",
        extensao: extensao || "Sem extensão :/", ultModif: new Date(arquivo.lastModified).toLocaleString("pt-br"), appSugerido: APP_SUGERIDO[extensao || "Aplicativo não especificado :("],
    }
    mostrarResultados(dados);
}

function obterExt(nomeArquivo){
    const partes = nomeArquivo.split(".");
    if(partes.length === 1) return "";
    return partes.pop().toLowerCase();
}
function formatarTamanho(bytes){
    if(bytes===0) return "O bytes :0";
    const unid = ["Bytes", "KB", "MB", "GB"];
    const indice = Math.floor(Math.log(bytes) / Math.log(1024));
    const valor = (bytes / Math.pow(1024, indice)).toFixed(2);
    return `${valor} ${unid[indice]}`;
}

function mostrarResultados(dados){ 
    const card = document.createElement("div");
    card.className = "arquivo-card";
    card.innerHTML = `
        <h3>${dados.nome}</h3>
        <ul>
            <li><strong>Tamanho:</strong> ${dados.tamanho}</li>
            <li><strong>Tipo MIME:</strong> ${dados.tipoMime}</li>
            <li><strong>Extensão:</strong> .${dados.extensao}</li>
            <li><strong>Última modificação:</strong> ${dados.ultModif}</li>
            <li><strong>Abrir com:</strong> ${dados.appSugerido}</li>
        </ul>
    `;
  areaResultados.appendChild(card);
}