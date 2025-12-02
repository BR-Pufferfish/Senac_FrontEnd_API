export function excluir_registro() {
    return new Promise(resolve => {

        // Evita criar múltiplos modais ao clicar várias vezes
        if (document.querySelector(".wrapper-confirm")) {
            return;
        }

        // Cria o modal usando as mesmas classes que já têm CSS (.wrapper e .modal)
        document.body.insertAdjacentHTML("beforeend", `
            <div class="wrapper wrapper-confirm">
                <div class="modal modal-confirm">
                    <p>Tem certeza que deseja excluir este registro?</p>

                    <div class="buttons">
                        <button id="btn-confirm">Excluir</button>
                        <button id="btn-cancel">Cancelar</button>
                    </div>
                </div>
            </div>
        `);

        const wrapper = document.querySelector(".wrapper-confirm");
        const btnConfirm = document.getElementById("btn-confirm");
        const btnCancel = document.getElementById("btn-cancel");

        // Botão EXCLUIR
        btnConfirm.onclick = () => {
            wrapper.remove();
            resolve(true);
        };

        // Botão CANCELAR
        btnCancel.onclick = () => {
            wrapper.remove();
            resolve(false);
        };
    });
}
