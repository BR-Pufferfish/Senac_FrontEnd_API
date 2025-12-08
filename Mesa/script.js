import { baseUrl } from "../baseUrl.js"
import { excluir_registro } from "../zzz_confirmacoes/excluir_registro.js"
const headers = { "content-type": "application/json; charset=utf-8" }






const statusMesa = {
    0: { nome: "Disponível", classe: "mesa-disponivel" },
    1: { nome: "Ocupada", classe: "mesa-ocupada" },
    2: { nome: "Reservada", classe: "mesa-reservada" },
}

async function getMesa() {
    const response = await fetch(`${baseUrl}/Mesa`)
    const resJson = await response.json()

    const lista = document.querySelector("ul")
    resJson.forEach(mesa => {
        lista.insertAdjacentHTML("beforeend", `
             <li class="${statusMesa[mesa.situacaoMesa].classe}">
                <p class="numeroMesa">${mesa.numeroMesa}</p>
                <p>Situação: ${statusMesa[mesa.situacaoMesa].nome}</p>
                <div class="botoes">
                    <button class='botoesEditarExcluir' id='${mesa.id}-edit'>Editar</button>
                    <button class='botoesEditarExcluir' id='${mesa.id}-delete'>Excluir</button>
                </div>
             </li>
            `)

        const btnExcluir = document.getElementById(`${mesa.id}-delete`)
        btnExcluir.addEventListener("click", async () => {
            console.log("Excluir", mesa.id)
            deleteMesa(mesa.id)
        })


        const btnEditar = document.getElementById(`${mesa.id}-edit`)
        btnEditar.addEventListener("click", async () => {
            console.log("Editar", mesa.id)
            putMesa(mesa)
        })
    })
}
getMesa()






// Ação ao clicar no botão Adicionar
const novaMesa = document.querySelector("#novaMesa")
novaMesa.addEventListener("click", modalPostMesa)

async function modalPostMesa() {
    const body = document.body

    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button id="close">X</button>
                <form>
                    <label for="numeroMesa">Número da Mesa</label>
                    <input type="number" id="numeroMesa" placeholder="Ex: 10">

                    <label for="situacaoMesa">Situação</label>
                    <input type="number" id="situacaoMesa" placeholder="Ex: 0 / 1 / 2">

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
        `)

    const close = document.querySelector("#close")
    close.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
    })

    await postMesa();

    // location.reload()
}






async function postMesa() {

    const form = document.querySelector("form")
    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const numeroMesa = document.querySelector("#numeroMesa")
        const situacaoMesa = document.querySelector("#situacaoMesa")


        const mesa = {
            numeroMesa: numeroMesa.value,
            situacaoMesa: situacaoMesa.value
        }


        const response = await fetch(`${baseUrl}/Mesa`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(mesa)
        })


        const confirmar = await response.json();
        console.log(confirmar, "POST - Mesa adicionada")
    })
    // location.reload()
}






function abrirModalEdit(mesaEdit) {

    const body = document.body
    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button class="close" id="close">X</button>
                <form>
                    <label for="numeroMesa">Número da Mesa</label>
                    <input type="number" id="numeroMesa" value="${mesaEdit.numeroMesa}">

                    <label for="situacaoMesa">Situação</label>
                    <input type="text" id="situacaoMesa" value="${mesaEdit.situacaoMesa}">

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
        `)

    const close = document.querySelector("#close")
    close.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
    })
}






async function putMesa(mesaEdit) {

    abrirModalEdit(mesaEdit)
    const form = document.querySelector("form")

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const numeroMesa = document.querySelector("#numeroMesa")
        const situacaoMesa = document.querySelector("#situacaoMesa")

        const mesa = {
            numeroMesa: numeroMesa.value,
            situacaoMesa: situacaoMesa.value
        }

        const response = await fetch(`${baseUrl}/Mesa/${mesaEdit.id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(mesa)
        })

        const confirmar = await response.json()
        console.log(confirmar, "PUT - Mesa atualizada")

    })
    // location.reload()
}






async function deleteMesa(id) {

    const confirmar = await excluir_registro();
    console.log(confirmar, "confirmação recebida no script.js")

    if (confirmar) {

        const response = await fetch(`${baseUrl}/Mesa/${id}`, {
            method: "DELETE"
        })
        console.log(response, "DELETE - Mesa excluída")
        location.reload()
    }
}