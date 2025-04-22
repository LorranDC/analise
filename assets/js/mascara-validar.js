/* Máscaras ER  Exemplo: onkeypress="mascara(this, mcpf)"*/
function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}
function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}
function mcep(v) {
    v = v.replace(/\D/g, "")                    //Remove tudo o que não é dígito
    v = v.replace(/^(\d{5})(\d)/, "$1-$2") 	//Esse é tão fácil que não merece explicações
    return v
}

function moeda(v){
    v = v.replace(/\D/g, "") // permite digitar apenas numero 
    v = v.replace(/(\d{1})(\d{15})$/,"$1.$2") // coloca ponto antes dos ultimos digitos 
    v = v.replace(/(\d{1})(\d{11})$/,"$1.$2") // coloca ponto antes dos ultimos 11 digitos 
    v = v.replace(/(\d{1})(\d{8})$/,"$1.$2") // coloca ponto antes dos ultimos 8 digitos 
    v = v.replace(/(\d{1})(\d{5})$/,"$1.$2") // coloca ponto antes dos ultimos 5 digitos 
    v = v.replace(/(\d{1})(\d{1,2})$/,"$1,$2") // coloca virgula antes dos ultimos 2 digitos 
    return v;
}

function peso(v){
    v = v.replace(/[^0-9|-]/g,'') // permite digitar apenas numero 
    v = v.replace(/(\d{1})(\d{20})$/,"$1.$2") // coloca ponto antes dos ultimos digitos 
    v = v.replace(/(\d{1})(\d{16})$/,"$1.$2") // coloca ponto antes dos ultimos 16 digitos 
    v = v.replace(/(\d{1})(\d{12})$/,"$1.$2") // coloca ponto antes dos ultimos 12 digitos 
    v = v.replace(/(\d{1})(\d{8})$/,"$1.$2") // coloca ponto antes dos ultimos 8 digitos 
    v = v.replace(/(\d{1})(\d{1,4})$/,"$1,$2") // coloca virgula antes dos ultimos 4 digitos 
    return v;
}

function mtelcel(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    var tamanho = v.lengh;
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}

function mtel(v) {
    v = v.replace(/\D/g, "")                 //Remove tudo o que não é dígito
    v = v.replace(/^(\d\d)(\d)/g, "($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
    var tamanho = v.lengh;
    v = v.replace(/(\d{4})(\d)/, "$1-$2")    //Coloca hífen entre o quinto e o sexto dígitos
    
    return v
}

function mcel(v) {
    v = v.replace(/\D/g, "")                 //Remove tudo o que não é dígito
    v = v.replace(/^(\d\d)(\d)/g, "($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
    var tamanho = v.lengh;
    v = v.replace(/(\d{5})(\d)/, "$1-$2")    //Coloca hífen entre o quinto e o sexto dígitos   
    return v
}

function mcnpj(v) {
    v = v.replace(/\D/g, "")                           //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/, "$1.$2")             //Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")           //Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2")              //Coloca um hífen depois do bloco de quatro dígitos
    return v
}
function mcpf(v) {
    v = v.replace(/\D/g, "")                    //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
    return v
}
function mdata(v) {
    v = v.replace(/\D/g, "");                    //Remove tudo o que não é dígito
    v = v.replace(/(\d{2})(\d)/, "$1/$2");
    v = v.replace(/(\d{2})(\d)/, "$1/$2");

    v = v.replace(/(\d{2})(\d{2})$/, "$1$2");
    return v;
}
function mtempo(v) {
    v = v.replace(/\D/g, "");                    //Remove tudo o que não é dígito
    v = v.replace(/(\d{1})(\d{2})(\d{2})/, "$1:$2.$3");
    return v;
}
function mhora(v) {
    v = v.replace(/\D/g, "");                    //Remove tudo o que não é dígito
    v = v.replace(/(\d{2})(\d)/, "$1h$2");
    return v;
}
function mrg(v) {
    v = v.replace(/\D/g, "");					//Remove tudo o que não é dígito
    v = v.replace(/(\d)(\d{7})$/, "$1.$2");	//Coloca o . antes dos últimos 3 dígitos, e antes do verificador
    v = v.replace(/(\d)(\d{4})$/, "$1.$2");	//Coloca o . antes dos últimos 3 dígitos, e antes do verificador
    v = v.replace(/(\d)(\d)$/, "$1-$2");		//Coloca o - antes do último dígito
    return v;
}
function mnum(v) {
    v = v.replace(/\D/g, "");					//Remove tudo o que não é dígito
    return v;
}

function mcartao(v) {
    v = v.replace(/\D/g, "")                 //Remove tudo o que não é dígito
    v = v.replace(/(\d{4})(\d)/, "$1 $2")    //Coloca hífen entre o quinto e o sexto dígitos   
    v = v.replace(/(\d{4})(\d)/, "$1 $2")    //Coloca hífen entre o quinto e o sexto dígitos   
    v = v.replace(/(\d{4})(\d)/, "$1 $2")    //Coloca hífen entre o quinto e o sexto dígitos   
    v = v.replace(/(\d{4})(\d)/, "$1 $2")    //Coloca hífen entre o quinto e o sexto dígitos   
    v = v.replace(/(\d{4})(\d)/, "$1 $2")    //Coloca hífen entre o quinto e o sexto dígitos   
    v = v.replace(/(\d{4})(\d)/, "$1 $2")    //Coloca hífen entre o quinto e o sexto dígitos   
    v = v.replace(/(\d{4})(\d)/, "$1 $2")    //Coloca hífen entre o quinto e o sexto dígitos   
    v = v.replace(/(\d{4})(\d)/, "$1 $2")    //Coloca hífen entre o quinto e o sexto dígitos   
    v = v.replace(/(\d{4})(\d)/, "$1 $2")    //Coloca hífen entre o quinto e o sexto dígitos   
    v = v.replace(/(\d{4})(\d)/, "$1 $2")    //Coloca hífen entre o quinto e o sexto dígitos   
    return v
}

$(document).on('change','#cpf', function(){
    var input_cpf = this.value;
    var cpf = input_cpf.replace(/[^0-9]/g, '').toString();
    if(cpf === '') return false;
    if( cpf.length === 11 ){
        var v = [];
        //Calcula o primeiro dígito de verificação.
        v[0] = 1 * cpf[0] + 2 * cpf[1] + 3 * cpf[2];
        v[0] += 4 * cpf[3] + 5 * cpf[4] + 6 * cpf[5];
        v[0] += 7 * cpf[6] + 8 * cpf[7] + 9 * cpf[8];
        v[0] = v[0] % 11;
        v[0] = v[0] % 10;

        //Calcula o segundo dígito de verificação.
        v[1] = 1 * cpf[1] + 2 * cpf[2] + 3 * cpf[3];
        v[1] += 4 * cpf[4] + 5 * cpf[5] + 6 * cpf[6];
        v[1] += 7 * cpf[7] + 8 * cpf[8] + 9 * v[0];
        v[1] = v[1] % 11;
        v[1] = v[1] % 10;

        //Retorna Verdadeiro se os dígitos de verificação são os esperados.
        if ( (v[0] != cpf[9]) || (v[1] != cpf[10]) ){
            alert('CPF inválido: ' + cpf);
            $('#cpf').val('');
            if($(".cpf").length){$('.cpf').val('');}
            $('#cpf').focus();
            return false;
        }
    }
    else{
        alert('CPF inválido: ' + cpf);
        $('#cpf').val('');
        if($(".cpf").length){$('.cpf').val('');}
        $('#cpf').focus();
        return false;
    }
    return true;
});


$(document).on('change','#cnpj', function(){
    var b = [6,5,4,3,2,9,8,7,6,5,4,3,2];
    var c = this.value;
    var cnpj = this.value;

    if((c = c.replace(/[^\d]/g,"")).length != 14){
        alert('CNPJ inválido: ' + cnpj);
        $('#cnpj').val('');
        $('#cnpj').focus();
        return false;
    }

    if(/0{14}/.test(c)){
        alert('CNPJ inválido: ' + cnpj);
        $('#cnpj').val('');
        $('#cnpj').focus();
        return false;
    }

    for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n)){
        alert('CNPJ inválido: ' + cnpj);
        $('#cnpj').val('');
        $('#cnpj').focus();
        return false;
    }
    
    for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n)){
        alert('CNPJ inválido: ' + cnpj);
        $('#cnpj').val('');
        $('#cnpj').focus();
        return false;
    }

    return true;
});

function muda_cpf_cnpf(validar_onsubmit, id_form){
    var campo_input, pessoa;
    var pessoa2 = document.getElementsByClassName("pessoa");
    for(i=0;i<pessoa2.length;i++){
        if(pessoa2[i].checked){
            pessoa = pessoa2[i].value;
        }
    }
    if(pessoa === 'juridica'){
        campo_input = document.getElementById("cpf");       
        campo_input.name = "cnpj";
        campo_input.placeholder = "CNPJ";
        campo_input.setAttribute('onkeypress', 'mascara(this, mcnpj)');
        campo_input.setAttribute('onchange', 'validarCNPJ();mascara(this, mcnpj)');
        campo_input.id = "cnpj";
        if(validar_onsubmit === "sim"){
            document.getElementById("h4_cpf_cnpj").innerHTML = 'CPNJ*';
            document.getElementById(id_form).setAttribute('onSubmit', 'return validarCNPJ()');
        }
        if(validar_onsubmit === "cadastro"){
            document.getElementById(id_form).setAttribute('onSubmit', 'return validateFormCadastro(\"cnpj\")');
        }

    }else{
        campo_input = document.getElementById("cnpj");
        campo_input.name = "cpf";
        campo_input.placeholder = "CPF";
        campo_input.setAttribute('onkeypress', 'mascara(this, mcpf)');
        campo_input.setAttribute('onchange', 'validarCPF();mascara(this, mcpf)');
        campo_input.id = "cpf";
        if(validar_onsubmit === "sim"){
            document.getElementById("h4_cpf_cnpj").innerHTML = 'CPF*';
            document.getElementById(id_form).setAttribute('onSubmit', 'return validarCPF()');
        }
        if(validar_onsubmit === "cadastro"){
            document.getElementById(id_form).setAttribute('onSubmit', 'return validateFormCadastro(\"cpf\")');
        }
    }
}

function verifica_senhas(id_senha, id_confirma) {
    var senha = document.getElementById(id_senha).value;
    var confirma_senha = document.getElementById(id_confirma).value;

    if (senha === confirma_senha) {
        return true;
    } else {
        alert("As senhas não conferem!");
        document.getElementById(id_senha).value = "";
        document.getElementById(id_confirma).value = "";
        document.getElementById(id_senha).focus();
        return false;
    }
}

function validateFormCadastro(cpf_cnpf){
    var valida1, valida2;
    if(cpf_cnpf === "cnpj"){
        valida1 = validarCNPJ();
    }else{
        valida1 = validarCPF();
    }
    valida2 = verifica_senhas("senha_cadastro", "confirma_senha");
    
    if(valida1 === false || valida2 === false){
        return false;
    }else{
        return true;
    }
}

$(document).on('change','#cep', function(){
    validaCep();
});

$(document).on('change','#cepColeta', function(){
    validaCep("Coleta");
});

$(document).on('change','#cepRecebimento', function(){
    validaCep("Recebimento");
});

function validaCep(sufixo=""){
    //Nova variável "cep" somente com dígitos.
    var cep_verifica = $('#cep'+sufixo).val();
    var cep = cep_verifica.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep !== "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            var endereco = '';
            var estado = '';
            
            if(document.getElementById('endereco'+sufixo) != null){
                endereco = 'endereco'+sufixo;
            }else if(document.getElementById('logradouro'+sufixo) != null){
                endereco = 'logradouro'+sufixo;
            }else{
                endereco = 'rua'+sufixo;
            }
            
            if(document.getElementById('estado'+sufixo) != null){
                estado = 'estado'+sufixo;
            }else{
                estado = 'uf'+sufixo;
            }
            
            $("#"+endereco).val("...");
            $("#bairro"+sufixo).val("...");
            $("#cidade"+sufixo).val("...");
            $("#"+estado).val("...");

            //Consulta o webservice viacep.com.br/
            $.ajax({
                url: 'https://viacep.com.br/ws/'+cep.replace(/\D/g, '')+'/json/',
                dataType: 'json',
                crossDomain: true,
                success: function (data) {
                    if(!(typeof data.erro == "undefined")){
                        //CEP pesquisado não foi encontrado.
                        alert("CEP não encontrado.");
                        $('#cep'+sufixo).val("");
                    }else{
                        //Atualiza os campos com os valores da consulta.
                        $("#"+endereco).val(data.logradouro);
                        $("#bairro"+sufixo).val(data.bairro);
                        $("#cidade"+sufixo).val(data.localidade);
                        $("#"+estado).val(data.uf);
                    }
                }
            });
        } //end if.
        else {
            //cep é inválido.
            alert("Formato de CEP inválido.");
            $('#cep'+sufixo).val("");
        }
    } //end if.
    else {
        $('#cep'+sufixo).val("");
    }
}

function ValidaCep2(cep){
        exp = /\d{2}\.\d{3}\-\d{3}/
        if(!exp.test(cep.value))
                return true;               
}

function validarCPF(input_cpf){
    var cpf = input_cpf.replace(/[^0-9]/g, '').toString();

    if( cpf.length == 11 ){
        var v = [];
        //Calcula o primeiro dígito de verificação.
        v[0] = 1 * cpf[0] + 2 * cpf[1] + 3 * cpf[2];
        v[0] += 4 * cpf[3] + 5 * cpf[4] + 6 * cpf[5];
        v[0] += 7 * cpf[6] + 8 * cpf[7] + 9 * cpf[8];
        v[0] = v[0] % 11;
        v[0] = v[0] % 10;

        //Calcula o segundo dígito de verificação.
        v[1] = 1 * cpf[1] + 2 * cpf[2] + 3 * cpf[3];
        v[1] += 4 * cpf[4] + 5 * cpf[5] + 6 * cpf[6];
        v[1] += 7 * cpf[7] + 8 * cpf[8] + 9 * v[0];
        v[1] = v[1] % 11;
        v[1] = v[1] % 10;

        //Retorna Verdadeiro se os dígitos de verificação são os esperados.
        if ( (v[0] != cpf[9]) || (v[1] != cpf[10]) ){
            alert('CPF inválido: ' + cpf);
            $('#cpf').val('');
            $('#cpf').focus();
        }
    }
    else{
        alert('CPF inválido: ' + cpf);
        $('#cpf').val('');
        $('#cpf').focus();
    }
};