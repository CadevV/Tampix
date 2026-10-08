const linkBotao = document.getElementById("btnLink")

function mudarAba() {
    document.getElementById("contato").scrollIntoView({ behavior: "smooth" })
}

linkBotao.addEventListener("click", mudarAba)

document.querySelectorAll(".linksMenu a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("menu-toggle").checked = false
    })
})

const arrecadacoes = []
const dataInicial = document.getElementById("dateStart")
const dataFinal = document.getElementById("dateEnd")
const mensagem = document.getElementById("mensagemQuantidade")
const total = document.getElementById("totalQuantidade")
const lista = document.getElementById("listaQuantidade")

function consultarQuantidade() {
    const inicio = dataInicial.value
    const fim = dataFinal.value

    total.hidden = true
    lista.innerHTML = ""

    if (!inicio || !fim || inicio > fim) {
        mensagem.textContent = "Selecione um período válido para consultar."
        return
    }

    const registros = arrecadacoes.filter(item => item.data >= inicio && item.data <= fim)

    if (registros.length === 0) {
        mensagem.textContent = "Ainda não há registros de arrecadação publicados para esse período."
        return
    }

    const quantidade = registros.reduce((soma, item) => soma + item.quantidade, 0)
    mensagem.textContent = "Resultados do período selecionado:"
    total.hidden = false
    total.textContent = `Total de tampinhas: ${quantidade.toLocaleString("pt-BR")}`

    registros.forEach(item => {
        const linha = document.createElement("li")
        const data = item.data.split("-").reverse().join("/")
        linha.textContent = `${data}: ${item.quantidade.toLocaleString("pt-BR")} tampinhas`
        lista.appendChild(linha)
    })
}

document.getElementById("btnConsultar").addEventListener("click", consultarQuantidade)
