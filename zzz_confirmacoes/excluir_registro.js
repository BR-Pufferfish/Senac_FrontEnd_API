export function excluir_registro() {
    return new Promise(resolve => {

        // Cria o modal dinamicamente
        document.body.insertAdjacentHTML("beforeend", `
            <div class="wrapper-confirm">
                <div class="modal-confirm">
                    <p>Tem certeza que deseja excluir este registro?</p>

                    <div class="buttons">
                        <button id="btn-confirm">Excluir</button>
                        <button id="btn-cancel">Cancelar</button>
                    </div>
                </div>
            </div>
        `);

        const wrapper = document.querySelector(".wrapper-confirm");
        const btnConfirm = document.querySelector("#btn-confirm");
        const btnCancel = document.querySelector("#btn-cancel");

        // Confirmar
        btnConfirm.addEventListener("click", () => {
            wrapper.remove();
            resolve(true);
            //  return true
        });

        // Cancelar
        btnCancel.addEventListener("click", () => {
            wrapper.remove();
            resolve(false);
            //return false
        });
    });
}
