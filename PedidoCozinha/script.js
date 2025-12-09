// const baseUrl = "https://localhost:7166/api"
import { baseUrl } from "../baseUrl.js"
const headers = { "content-type": "application/json; charset=utf-8" }






async function getPedido() {
    const response = await fetch(`${baseUrl}/PedidoCozinha`)
    const resJson = await response.json()
    console.log(resJson, "Resposta do fetch na url")

    const lista = document.querySelector("ul")
    resJson.forEach(pedido => {
        lista.insertAdjacentHTML("beforeend", `
             <li id=pedido-${pedido.id}>
                <h2>Pedido ${pedido.id}</h2>
                <button class='botoesEditarExcluir' id=btn-${pedido.id}>Finalizar</button>
             </li>
            `)

        const btnFinalizar = document.getElementById(`btn-${pedido.id}`)
        btnFinalizar.addEventListener("click", async () => {
            console.log("Finalizar", pedido.id)
            finalizarPedido(pedido.id)
        })
    })
}
getPedido()






function finalizarPedido(id) {
    const li = document.getElementById(`pedido-${id}`)
    if (li)
        li.remove()
    location.reload()
}
