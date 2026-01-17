// const baseUrl = "https://localhost:7166/api"
import { baseUrl } from "../baseUrl.js"
import { excluir_registro } from "../zzz_confirmacoes/excluir_registro.js"

const headers = { "content-type": "application/json; charset=utf-8" }






// Cria uma variável global para armazenar os itens do cardápio
let cardapioItems = []
async function getCardapioItem() {
    const response = await fetch(`${baseUrl}/CardapioItem`)
    const resJson = await response.json()
    cardapioItems = resJson
}
getCardapioItem()


async function getComandas() {
    const response = await fetch(`${baseUrl}/Comanda`)
    const resJson = await response.json()
    console.log(resJson, "Comandas recebidas")

    const lista = document.querySelector("ul")
    resJson.forEach(comanda => {
        lista.insertAdjacentHTML("beforeend", `
        <li class="comanda-card">
            <div class="comanda-header">
                <span class="comanda-id">#Id: ${comanda.id}</span>
                <span class="comanda-mesa">Mesa: ${comanda.numeroMesa}</span>
            </div>

            <div class="comanda-cliente"> 
                👤 ${comanda.nomeCliente}
            </div>

            <div class="comanda-itens">
                <span class="label-itens">Itens:</span>
                <div class="itens-lista" id="${comanda.id}-itens-container"></div>
            </div>

        <div class="comanda-acoes">
                <button class="btn-editar" id="${comanda.id}-edit">✏️Editar</button>
                <button class="btn-excluir" id="${comanda.id}-delete">🗑 Excluir</button>
        </div>

        </li>
        `)


        const itensContainer = document.getElementById(`${comanda.id}-itens-container`)
        comanda.itens.forEach(item => {
            itensContainer.insertAdjacentHTML("beforeend", `<span class="item-chip">${item.titulo}</span>`)
        })


        const btnExcluir = document.getElementById(`${comanda.id}-delete`)
        btnExcluir.addEventListener("click", async () => {
            console.log("Excluir", comanda.id)
            deleteComanda(comanda.id)
        })


        const btnEditar = document.getElementById(`${comanda.id}-edit`)
        btnEditar.addEventListener("click", async () => {
            console.log("Editar", comanda.id)
            putComanda(comanda)
        })
    })
}
getComandas()







const novaComanda = document.querySelector("#novaComanda")
novaComanda.addEventListener("click", modalPostComanda)

async function modalPostComanda() {
    const body = document.body

    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button id="close">X</button>
                <form>
                    <label for="numeroMesa">Número da Mesa</label>
                    <input type="number" id="numeroMesa" placeholder="Ex: 10">
                    <label for="nomeCliente">Nome do Cliente</label>
                    <input type="text" id="nomeCliente" placeholder="Ex: Fulano">
                    <label for="itensComanda">Itens da Comanda</label>
                    <ul id="itens"></ul>
                   
                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
        `)

    const itensUl = document.getElementById("itens")
    cardapioItems.forEach(caItem => {
        itensUl.insertAdjacentHTML("beforeend", `
            <label>${caItem.titulo}</label>
            <input type="checkbox" class="caitem" value="${caItem.id}"/>
            `)
    })

    const close = document.querySelector("#close")
    close.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
        location.reload()
    })

    await postComanda();
}






async function postComanda() {
    const form = document.querySelector("form")
    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        let itensSelecionados = []
        const itensSelecionadosInpput = document.querySelectorAll(".caitem")

        itensSelecionadosInpput.forEach(input => {
            if (input.checked) {
                itensSelecionados.push(parseInt(input.value))
            }
        })

        const numeroMesa = document.getElementById("numeroMesa")
        const nomeCliente = document.getElementById("nomeCliente")

        const comanda = {
            numeroMesa: parseInt(numeroMesa.value),
            nomeCliente: nomeCliente.value,
            cardapioItemIds: itensSelecionados
        }

        const response = await fetch(`${baseUrl}/Comanda`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(comanda)
        })

        const confirmar = await response.json();
        console.log(confirmar, "POST - Comanda adicionada")
    })
}






function abrirModalEdit(comandaEdit) {

    const body = document.body
    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button id="close">X</button>
                <form>
                    <label for="numeroMesa">Número da Mesa</label>
                    <input type="number" id="numeroMesa" value="${comandaEdit.numeroMesa}">
                    <label for="nomeCliente">Nome do Cliente</label>
                    <input type="text" id="nomeCliente" value="${comandaEdit.nomeCliente}">
                    <label for="itensComanda">Itens da Comanda</label>
                    <ul id="itens"></ul>

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
        `)

    const itensUl = document.getElementById("itens")
    cardapioItems.forEach(caItem => {
        itensUl.insertAdjacentHTML("beforeend", `
            <label>${caItem.titulo}</label>
            <input type="checkbox" class="caitem" value="${caItem.id}"/>
        `)
    })

    const close = document.querySelector("#close")
    close.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
        location.reload()
    })
}






async function putComanda(comandaEdit) {

    abrirModalEdit(comandaEdit)
    const form = document.querySelector("form")
    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const numeroMesa = document.getElementById("numeroMesa")
        const nomeCliente = document.getElementById("nomeCliente")
        console.log(nomeCliente.value, "valor nome cliente")
        console.log(numeroMesa.value, "valor número mesa")

        let itensSelecionados = []
        const itensSelecionadosInpput = document.querySelectorAll(".caitem")
        itensSelecionadosInpput.forEach(input => {
            if (input.checked) {
                itensSelecionados.push(parseInt(input.value))
            }
        })
        console.log(itensSelecionados, "itens selecionados no PUT")

        const comanda = {
            numeroMesa: parseInt(numeroMesa.value),
            nomeCliente: nomeCliente.value,
            cardapioItemIds: itensSelecionados
        }

        const response = await fetch(`${baseUrl}/Comanda/${comandaEdit.id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(comanda)
        })

        console.log(response, "PUT - Comanda atualizado")
    })
}






async function deleteComanda(id) {
    const confirmar = await excluir_registro();
    console.log(confirmar, "confirmação recebida no script.js")

    if (confirmar) {

        const response = await fetch(`${baseUrl}/Comanda/${id}`, {
            method: "DELETE"
        })
        console.log(response, "DELETE - Comanda deletado")
        location.reload()
    }
}