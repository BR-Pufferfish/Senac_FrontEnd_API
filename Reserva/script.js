import { baseUrl } from "../baseUrl.js"
import { excluir_registro } from "../zzz_confirmacoes/excluir_registro.js"
const headers = { "content-type": "application/json; charset=utf-8" }





async function getReserva() {
    const response = await fetch(`${baseUrl}/Reservas`)
    const resJson = await response.json()

    const lista = document.querySelector("ul")
    resJson.forEach(reserva => {
        lista.insertAdjacentHTML("beforeend", `
             <li>
                <p>ID: ${reserva.id}</p>
                <p>Mesa: ${reserva.numeroMesa}</p>
                <p>Cliente: ${reserva.nomeCliente}</p>
                <p>Contato: ${reserva.telefone}</p>
                <p>Data: ${reserva.dataHoraReserva}</p>
                <button class='botoesEditarExcluir' id='${reserva.id}-edit'>Editar</button>
                <button class='botoesEditarExcluir' id='${reserva.id}-delete'>Excluir</button>
             </li>
            `)


        const btnExcluir = document.getElementById(`${reserva.id}-delete`)
        btnExcluir.addEventListener("click", async () => {
            console.log("Excluir", reserva.id)
            deleteReserva(reserva.id)
        })


        const btnEditar = document.getElementById(`${reserva.id}-edit`)
        btnEditar.addEventListener("click", async () => {
            console.log("Editar", reserva.id)
            putReserva(reserva.id)
        })
    })
}
getReserva()




// Ação ao clicar no botão Adicionar
const novaReserva = document.querySelector("#novaReserva")
novaReserva.addEventListener("click", modalPostReserva)

async function modalPostReserva() {
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

    const close = document.querySelector("#close")
    close.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper")
        wrapper.remove()
    })

    await postReserva();

    // location.reload()
}






async function postReserva() {

    const form = document.querySelector("form")
    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const numeroMesa = document.querySelector("#numeroMesa")
        const nomeCliente = document.querySelector("#nomeCliente")
        const telefone = document.querySelector("#telefone")
        const dataHoraReserva = document.querySelector("#dataHoraReserva")


        const reserva = {
            numeroMesa: numeroMesa.value,
            nomeCliente: nomeCliente.value,
            telefone: telefone.value,
            dataHoraReserva: dataHoraReserva.value
        }


        const response = await fetch(`${baseUrl}/Reservas`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(reserva)
        })

        const confirmar = await response.json()
        console.log(confirmar, "POST - Reserva criada")
    })
}






function abrirModalEdit(reservaEdit) {
    const body = document.body

    body.insertAdjacentHTML("afterbegin",
        `<div class="wrapper">
            <div class="modal">
                <button class="close" id="close">X</button>
                <form>
                    <label for="numeroMesa"></label>
                    <input type="number" id="numeroMesa" value="${reservaEdit.numeroMesa}">

                    <label for="nomeCliente"></label>
                    <input type="text" id="nomeCliente" value="${reservaEdit.nomeCliente}">

                    <label for="telefone"></label>
                    <input type="text" id="telefone" value="${reservaEdit.telefone}">

                    <label for="dataHoraReserva"></label>
                    <input type="datetime" id="dataHoraReserva" value="${reservaEdit.dataHoraReserva}">

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






async function putReserva(reservaEdit) {

    abrirModalEdit(reservaEdit)
    const form = document.querySelector("form")

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const numeroMesa = document.querySelector("#numeroMesa")
        const nomeCliente = document.querySelector("#nomeCliente")
        const telefone = document.querySelector("#telefone")
        const dataHoraReserva = document.querySelector("#dataHoraReserva")

        const reserva = {
            numeroMesa: numeroMesa.value,
            nomeCliente: nomeCliente.value,
            telefone: telefone.value,
            dataHoraReserva: dataHoraReserva.value
        }

        const response = await fetch(`${baseUrl}/Reservas/${reservaEdit.id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(reserva)
        })

        const confirmar = await response.json()
        console.log(confirmar, "PUT - Reserva atualizada")

    })
}






async function deleteReserva(id) {

    const confirmar = await excluir_registro();
    console.log(confirmar, "confirmação recebida no script.js")

    if (confirmar) {

        const response = await fetch(`${baseUrl}/Reservas/${id}`, {
            method: "DELETE"
        })
        // Precisa dar o await na response pra printar na tela?
        // const reser = await response.json()
        // console.log(reser, "DELETE - Reserva deletada")
        console.log(response, "DELETE - Reserva deletada")
        location.reload()
    }
}