// const baseUrl = "https://localhost:7166/api"
import { baseUrl } from "../baseUrl.js"
import { excluir_registro } from "../zzz_confirmacoes/excluir_registro.js"
const headers = { "content-type": "application/json; charset=utf-8" }






async function getCardapioItem() {
    const response = await fetch(`${baseUrl}/CardapioItem`)
    const resJson = await response.json()

    const lista = document.querySelector("ul")
    resJson.forEach(caItem => {


        lista.insertAdjacentHTML("beforeend", `
             <li>
             <img src="Imagem_Cardapio/principalFoodIcon.png" class="iconeCardapio">
                    <h1>${caItem.titulo}</h1>
                <div class="botoes">
                    <button class='botoesEditarExcluir' id="${caItem.id}-edit">Editar</button>
                    <button class='botoesEditarExcluir' id=${caItem.id}>Excluir</button>
                </div>
             </li>
            `)


        const btnExcluir = document.getElementById(caItem.id)
        btnExcluir.addEventListener("click", async () => {
            console.log("Excluir", caItem.id)
            deleteCardapioItem(caItem.id)
        })


        const btnEditar = document.getElementById(`${caItem.id}-edit`)
        btnEditar.addEventListener("click", async () => {
            console.log("Editar", caItem.id)
            putCardapioItem(caItem.id)
        })
    })
}
getCardapioItem()






async function postCardapioItem() {

    const form = document.querySelector("form")

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const titulo = document.querySelector("#titulo")
        const descricao = document.querySelector("#descricao")
        const preco = document.querySelector("#preco")
        const checkbox = document.querySelector("#possuipreparo")


        const cardapioItem = {
            titulo: titulo.value,
            descricao: descricao.value,
            preco: preco.value,
            possuiPreparo: checkbox.checked
        }


        const response = await fetch(`${baseUrl}/CardapioItem`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(cardapioItem)
        })

        const confirmar = await response.json();
        console.log(confirmar, "POST - CardapioItem adicionado")
    })
}






// Ação ao clicar no botão Adicionar
const novoCardapio = document.querySelector("#novoCardapio")
novoCardapio.addEventListener("click", modalPostCardapio)

function modalPostCardapio() {
    const body = document.body

    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button id="close">X</button>
                <form>
                    <label for="titulo">Titulo</label>
                    <input type="text" id="titulo" placeholder="Ex: Torrada Completa">

                    <label for="descricao"></label>
                    <input type="text" id="descricao" placeholder="Ex: Saboroso lanche...">

                    <label for="preco"></label>
                    <input type="number" id="preco" placeholder="Ex: 15,00">

                    <label for="possuipreparo"></label>
                    <input type="checkbox" id="possuipreparo">

                    <button type="submit">salvar</button>
                </form>
            </div>
        </div>
        `)

    const close = document.querySelector("#close")
    close.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
        location.reload()
    })

    await postCardapioItem();

    // location.reload()
}






async function putCardapioItem(cardapioEdit) {
    abrirModalEdit(cardapioEdit)
    const form = document.querySelector("form")

    // TODO
    // validar como que posso inserir o reload aqui
    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const titulo = document.querySelector("#titulo")
        const descricao = document.querySelector("#descricao")
        const preco = document.querySelector("#preco")
        let checkbox = document.querySelector("#possuipreparo")

        const cardapioItem = {
            titulo: titulo.value,
            descricao: descricao.value,
            preco: Number(preco.value),
            possuiPreparo: checkbox.checked
        }

        const response = await fetch(`${baseUrl}/CardapioItem/${cardapioEdit.id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(cardapioItem)
        })
        console.log(response, "PUT - CardapioItem atualizado")
    })
    // location.reload()
}






function abrirModalEdit(cardapioEdit) {
    const body = document.body

    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button id="close">X</button>
                <form>
                    <label for="titulo">Titulo</label>
                    <input type="text" id="titulo" value="${cardapioEdit.titulo}">

                    <label for="descricao"></label>
                    <input type="text" id="descricao" value="${cardapioEdit.descricao}">

                    <label for="preco"></label>
                    <input type="number" id="preco" value="${cardapioEdit.preco}">

                    <label for="possuipreparo"></label>
                    <input type="checkbox" id="possuipreparo" value="${cardapioEdit.possuiPreparo}">

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
        `)

    const close = document.querySelector("#close")
    close.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
        // location.reload()
    })
}






async function deleteCardapioItem(id) {

    const confirmar = await excluir_registro();
    console.log(confirmar, "confirmação recebida no script.js")

    if (confirmar){

        const response = await fetch(`${baseUrl}/CardapioItem/${id}`, {
            method: "DELETE"
        })
        console.log(response, "DELETE - CardapioItem excluído")
        location.reload()
    }
}