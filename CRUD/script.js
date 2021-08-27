const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const cidade = document.getElementById("cidade");
const cadastrar = document.getElementById("cadastrar");
const tabela = document.getElementById("tabela");
const editando = document.getElementById("editando");

let todosUsuarios = JSON.parse(localStorage.getItem("usuarios")) ?? [];

atualizarTabela();

function addUsuario() {
  const usuario = {
    Nome: nome.value,
    EMail: email.value,
    Telefone: telefone.value,
    Cidade: cidade.value,
  };

  todosUsuarios.push(usuario);

  localStorage.setItem("usuarios", JSON.stringify(todosUsuarios));

  nome.value = "";
  email.value = "";
  telefone.value = "";
  cidade.value = "";

  atualizarTabela();
}

function apagar(i) {
  todosUsuarios.splice(i, 1);

  localStorage.setItem("usuarios", JSON.stringify(todosUsuarios));

  atualizarTabela();
}

function atualizarTabela() {
  tabela.innerHTML = `<tr>
  <td>Nome</td>
  <td>E-Mail</td>
  <td>Telefone</td>
  <td>Endereço</td>
  <td>Opções</td>
</tr>`;

  for (let i = 0; i < todosUsuarios.length; i++) {
    let formato = ` <tr id="${i}">
  <td>${todosUsuarios[i].Nome}</td>
  <td>${todosUsuarios[i].EMail}</td>
  <td>${todosUsuarios[i].Telefone}</td>
  <td>${todosUsuarios[i].Cidade}</td>
  <td><button class="btn editar" onclick="editar('${i}')">Editar</button>
  <button class="btn apagar" onclick="apagar('${i}')">Apagar</button></td>
</tr>`;

    tabela.innerHTML += formato;
  }
}

function editar(i) {
  editando.style.display = "flex";

  let temporario = ` <div id="${i}">
  <h3>Editando dados</h3>
  <p> Nome<input id="editnome" type="text" value="${todosUsuarios[i].Nome}" /> E-Mail<input id="editemail" type="text" value="${todosUsuarios[i].EMail}" /></p>
  
  <p> Telefone <input id="edittelefone" type="text" value="${todosUsuarios[i].Telefone}" /> Endereço<input id="editcidade" type="text" value="${todosUsuarios[i].Cidade}" /></p>
  
  <p><button id="confirmar" class="btn editar" onclick="confirmar('${i}')">Confirmar</button>
  <button id="cancelar" class="btn apagar" onclick="cancelar()">Cancelar</button></p>
</div>`;

  editando.innerHTML += temporario;
}

function confirmar(i) {
  editando.style.display = "none";

  const editnome = document.getElementById("editnome");
  const editemail = document.getElementById("editemail");
  const edittelefone = document.getElementById("edittelefone");
  const editcidade = document.getElementById("editcidade");

  todosUsuarios[i].Nome = editnome.value;
  todosUsuarios[i].EMail = editemail.value;
  todosUsuarios[i].Telefone = edittelefone.value;
  todosUsuarios[i].Cidade = editcidade.value;

  localStorage.setItem("usuarios", JSON.stringify(todosUsuarios));

  editando.innerHTML = "";

  atualizarTabela();
}

function cancelar() {
  editando.style.display = "none";
  editando.innerHTML = "";
}
