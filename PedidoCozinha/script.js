// [HttpPost]
// public IResult Post([FromBody] PedidoCozinhaCreateRequest pedidoCreate)
// {
//     if (pedidoCreate.Itens == null || !pedidoCreate.Itens.Any())
//         return Results.BadRequest("O pedido deve conter ao menos um item...");
//     if (pedidoCreate.ComandaId <= 0)
//         return Results.BadRequest("O pedido deve conter uma Comanda válida...");

//     var pedido = new PedidoCozinha
//     {
//         ComandaId = pedidoCreate.ComandaId,

//     };

//     // Cria a lista de itens do pedido
//     var itens = new List<PedidoCozinhaItem>();
//     foreach (var item in pedidoCreate.Itens)
//     {
//         var pedidoItem = new PedidoCozinhaItem
//         {
//             ComandaItemId = item.ComandaItemId
//         };
//         itens.Add(pedidoItem);
//     }

//     pedido.Itens = itens;

//     return Results.Created($"/api/pedidoCozinha/{pedido.Id}", pedido);

// }



// namespace Comandas_API.DTOs
// {
//     public class PedidoCozinhaCreateRequest
//     {
//         public int ComandaId { get; set; }
//         public List<PedidoCozinhaItemCreateRequest> Itens { get; set; } = [];
//     }


//     public class PedidoCozinhaItemCreateRequest
//     {
//         public int ComandaItemId { get; set; }
//     }
// }




const baseUrl = "https://localhost:7166/api"
const headers = { "content-type": "application/json; charset=utf-8" }






async function getPedido() {
    const response = await fetch(`${baseUrl}/PedidoCozinha`)
    const resJson = await response.json()

    const lista = document.querySelector("ul")
    resJson.forEach(pedido => {
        lista.insertAdjacentHTML("beforeend", `
             <li>
                <p>${pedido.id}</p>
                <button id=${pedido.id}>Excluir</button>
                <button id="${pedido.id}-edit">Editar</button>
             </li>
            `)


        // const btnExcluir = document.getElementById(mesa.id)
        // btnExcluir.addEventListener("click", async () => {
        //     console.log("Excluir", mesa.id)
        //     deleteMesa(mesa.id)
        // })


        // const btnEditar = document.getElementById(`${mesa.id}-edit`)
        // btnEditar.addEventListener("click", async () => {
        //     console.log("Editar", mesa.id)
        //     putMesa(mesa.id)
        // })
    })
}
getPedido()