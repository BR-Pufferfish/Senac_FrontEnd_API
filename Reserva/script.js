const baseUrl = "https://localhost:7166/api"
const headers = { "content-type": "application/json; charset=utf-8" }




// Ação ao clicar no botão Adicionar Reserva
const novaReserva = document.querySelector("#novaReserva")
novaReserva.addEventListener("click", modalPostReserva)

function modalPostReserva() {
    const body = document.body

    body.insertAdjacentHTML("beforeend",
        `<div class="wrapper">
            <div class="modal">
                <button id="close">X</button>
                <form>
                    <label for="numeroMesa"></label>
                    <input type="number" id="numeroMesa" placeholder="Ex: 10">

                    <label for="nomeCliente"></label>
                    <input type="text" id="nomeCliente" placeholder="Ex: Serjão dos Foguetes">

                    <label for="telefone"></label>
                    <input type="text" id="telefone" placeholder="Ex: 99123456789">

                    <label for="dataHoraReserva"></label>
                    <input type="datetime" id="dataHoraReserva" placeholder="Ex: 28-11-2025">

                    <button type="submit">Salvar</button>
                </form>
            </div>
        </div>
        `)

    // verificar como que vou captar os dados destes campos e enviar para a api


    const close = document.querySelector("#close")
    close.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
    })
}





async function getReserva() {
    const response = await fetch(`${baseUrl}/Reservas`)
    const resJson = await response.json()

    const lista = document.querySelector("ul")
    resJson.forEach(reserva => {
        lista.insertAdjacentHTML("beforeend", `
             <li>
                <p>${reserva.id}</p>
                <p>${reserva.nomeCliente}</p>
                <button id='${reserva.id}-delete'>Excluir</button>
                <button id='${reserva.id}-edit'>Editar</button>
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
            putUsuario(usuario.id)
        })


    })
}
getReserva()