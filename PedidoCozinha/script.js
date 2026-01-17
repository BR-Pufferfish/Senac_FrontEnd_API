// const baseUrl = "https://localhost:7166/api"
import { baseUrl } from "../baseUrl.js"
const headers = { "content-type": "application/json; charset=utf-8" }






async function getPedido() {
    const response = await fetch(`${baseUrl}/PedidoCozinha`)
    const resJson = await response.json()
    console.log(resJson, "Pedidos recebidos")

    const lista = document.getElementById("lista-pedidos");

    if (!Array.isArray(resJson) || resJson.length === 0) {
        lista.innerHTML = "<p>Nenhum pedido na cozinha.</p>";
        return;
    }

    resJson.forEach(pedido => {

        let itensHtml = "";

        if (pedido.itens && pedido.itens.length > 0) {
            pedido.itens.forEach(item => {
                itensHtml += `<p>${item.titulo}</p>`;
            });
        } else {
            itensHtml = "<p>Nenhum item encontrado.</p>";
        }

        lista.insertAdjacentHTML("beforeend", `
            <li id="pedido-${pedido.id}">
                <h2>Pedido #${pedido.id}</h2>
                <h3>Itens do Pedido</h3>
                ${itensHtml}
                <button class="botoesEditarExcluir" id="btn-${pedido.id}">
                    Finalizar
                </button>
            </li>
        `);

        const btnFinalizar = document.getElementById(`btn-${pedido.id}`);
        btnFinalizar.addEventListener("click", () => {
            console.log("Finalizar", pedido.id);
            finalizarPedido(pedido.id);
        });
    });
}

getPedido();



function finalizarPedido(id) {
    const li = document.getElementById(`pedido-${id}`)
    if (li)
        li.remove()
    location.reload()
}
