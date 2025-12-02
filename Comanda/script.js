// const baseUrl = "https://localhost:7166/api"
import { baseUrl } from "../baseUrl.js"
const headers = { "content-type": "application/json; charset=utf-8" }


// Cria uma variável global para armazenar os itens do cardápio
let cardapioItems = []
async function getCardapioItem() {
    const response = await fetch(`${baseUrl}/CardapioItem`)
    const resJson = await response.json()
    cardapioItems = resJson
}
getCardapioItem()






function novaComanda() {
    const novaComanda = document.getElementById("novaComanda")
    novaComanda.addEventListener("click", async () => {
        console.log("Nova Comanda", cardapioItems)
        const lista = document.querySelector("#cardapio_items")

        // Pra cada item do cardápio, criar um li com checkbox
        cardapioItems.forEach(caItem => {
            lista.insertAdjacentHTML("beforeend", `
            <li>
                <p>${caItem.titulo}</p>
                <input class="check" id=${caItem.id} type="checkbox"/>
            </li>
            `)
        })

        // Adicionar campo para nome do cliente e botão para finalizar
        lista.insertAdjacentHTML("beforeend", `
            <input type="text" id="nomeCliente" placeholder="Nome do cliente"/>
            <button id="finalizarComanda">Salvar Comanda</button>
            `)


        const btnFinalizarComanda = document.getElementById("finalizarComanda")
        btnFinalizarComanda.addEventListener("click", async () => {
            console.log("Finalizar Comanda", document.querySelector("#mesa").value)
            const inputsCheck = document.querySelectorAll(".check")
            console.log(inputsCheck)
            let itensSelecionados = []

            inputsCheck.forEach(input => {
                if (input.checked) {
                    itensSelecionados.push(parseInt(input.id))
                }
            })

            const body = {
                "numeroMesa": numeroMesa.value,
                "nomeCliente": nomeCliente.value,
                "cardapioItemIds": itensSelecionados
            }

            const res = await fetch(`${baseUrl}/Comanda`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })

            console.log("Itens Selecionados:", itensSelecionados)
            const resJson = await res.json()
            console.log("Comanda criada:", resJson)
        })
    })
}
novaComanda()






async function getComandas() {
    const response = await fetch(`${baseUrl}/Comanda`)
    const resJson = await response.json()

    const lista = document.querySelector("ul")
    resJson.forEach(comanda => {
        lista.insertAdjacentHTML("beforeend", `
             <li>
                <p>Id: ${comanda.id}</p>
                <p>Mesa: ${comanda.numeroMesa}</p>
                <p>Cliente: ${comanda.nomeCliente}</p>
                <p>Itens: ${comanda.itens}</p>
                <button id='${usuario.id}-delete'>Excluir</button>
                <button id='${usuario.id}-edit'>Editar</button>
             </li>
            `)


        const btnExcluir = document.getElementById(`${usuario.id}-delete`)
        btnExcluir.addEventListener("click", async () => {
            console.log("Excluir", usuario.id)
            deleteUsuario(usuario.id)
        })


        const btnEditar = document.getElementById(`${usuario.id}-edit`)
        btnEditar.addEventListener("click", async () => {
            console.log("Editar", usuario.id)
            putUsuario(usuario)
        })


    })
}
getComandas()






async function deleteComanda(id) {
    const response = await fetch(`${baseUrl}/Comanda/${id}`, {
        method: "DELETE"
    })

    console.log("DELETE - Comanda deletado")
    location.reload()
}