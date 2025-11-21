const baseUrl = "https://localhost:7166/api"
const headers = { "content-type": "application/json; charset=utf-8" }



let cardapioItems = []


async function getCardapioItem() {
    const response = await fetch(`${baseUrl}/CardapioItem`)
    const resJson = await response.json()
    cardapioItems = resJson
}

getCardapioItem()
function novaComanda() {
    // <select id="mesa">
    //                 <option value="${caItem.id}">${caItem.id}</option>
    //                 <option value="f">f}</option>
    //                 </select>
    const btnNew = document.getElementById("new")
    btnNew.addEventListener("click", async () => {
        console.log("Nova Comanda", cardapioItems)
        const lista = document.querySelector("#cardapio_items")
        cardapioItems.forEach(caItem => {
            lista.insertAdjacentHTML("beforeend", `
             <li>
                <p>${caItem.titulo}</p>
                
                <input class="check" id=${caItem.id} type="checkbox"/>
             </li>
            `)
        })
        lista.insertAdjacentHTML("beforeend", `
            
            <input type="text" id="cliente" placeholder="Nome do cliente"/>
            <button id="finalizar">salvar Comanda</button>
            `)


        const btnFinalizar = document.getElementById("finalizar")
        btnFinalizar.addEventListener("click", async () => {
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
                "numeroMesa": 11,
                "nomeCliente": "testeTeste",
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