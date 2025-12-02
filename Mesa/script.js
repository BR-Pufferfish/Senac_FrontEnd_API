// const baseUrl = "https://localhost:7166/api"
import { baseUrl } from "../baseUrl.js"
const headers = { "content-type": "application/json; charset=utf-8" }


const statusMesa = {
    1: "Disponível",
    2: "Ocupada",
    3: "Reservada",
}

async function getMesa() {
    const response = await fetch(`${baseUrl}/Mesa`)
    const resJson = await response.json()

    const lista = document.querySelector("ul")
    resJson.forEach(mesa => {
        lista.insertAdjacentHTML("beforeend", `
             <li>
                <p>${mesa.numeroMesa}</p>
                <button id='${mesa.id}-delete'>Excluir</button>
                <button id='${mesa.id}-edit'>Editar</button>
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
        div.append(p, btnEditar, btnExcluir)
    })
}
getMesa()






// Ação ao clicar no botão Adicionar Usuário
const novaMesa = document.querySelector("#novaMesa")
novaMesa.addEventListener("click", modalPostMesa)

function modalPostMesa() {
    const body = document.body

    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button id="close">X</button>
                <form>
                    <label for="numeroMesa"></label>
                    <input type="number" id="numeroMesa" placeholder="Ex: 10">

                    <label for="situacaoMesa"></label>
                    <input type="text" id="situacaoMesa" placeholder="Ex: Livre">

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
        `)


    postMesa()

    const close = document.querySelector("#close")
    close.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
    })
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


        const confirmar = await response.json()
        console.log(confirmar, "POST - Mesa adicionada")
    })
}





function abrirModalEdit(mesaEdit) {
    const body = document.body

    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button id="close">X</button>
                <form>
                    <label for="numeroMesa"></label>
                    <input type="number" id="numeroMesa" value="${mesaEdit.numeroMesa}">

                    <label for="situacaoMesa"></label>
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
    const response = await fetch(`${baseUrl}/Mesa/${id}`, {
        method: "DELETE"
    })
    console.log(response, "DELETE - Mesa excluída")
    location.reload()
}