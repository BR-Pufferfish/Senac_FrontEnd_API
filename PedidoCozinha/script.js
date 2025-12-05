// const baseUrl = "https://localhost:7166/api"
import { baseUrl } from "../baseUrl.js"
const headers = { "content-type": "application/json; charset=utf-8" }






async function getPedido() {
    const response = await fetch(`${baseUrl}/PedidoCozinha`)
    const resJson = await response.json()

    const lista = document.querySelector("ul")
    resJson.forEach(pedido => {
        lista.insertAdjacentHTML("beforeend", `
             <li>
                <p>${pedido.id}</p>
                <button class='botoesEditarExcluir' id=${pedido.id}>Finalizar</button>
             </li>
            `)


        const btnExcluir = document.getElementById(pedido.id)
        btnExcluir.addEventListener("click", async () => {
            console.log("Finalizar", pedido.id)
            finalizarPedido(pedido.id)
        })
    })
}
getPedido()






function finalizarPedido() {
    const body = document.body

    // logica pra apenas remover do corpo o item ja finalizado
    // body.remove
}