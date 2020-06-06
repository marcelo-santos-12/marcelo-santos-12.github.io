var request = null; //objeto que guarda a conexao com o server

function createRequest(){ // cria objeto de conexao com o server
    try{
        request = new XMLHttpRequest();

    }catch(trymicrosoft){
        try{
            request = new ActiveXObject('Msxml2.XMLHTTP');

        }catch(othermiscrosoft){
            try{
                request = new ActiveXObject('Microsoft.XMLHTTP');
            }catch{
                request = null;
                
            }
        }
    }
    if (!request){
        alert('Erro ao criar objeto request. Feche a Page');
    }
}

function add_service_home(){
    createRequest();
    if (request){
        var id = document.getElementById('id').value;
        var qtd = document.getElementById('qtd').value;
        document.getElementById('id').value = 'Selecione';
        document.getElementById('qtd').value = '';
        var url = 'add_service.php?id=' + id + '&qtd=' + qtd;
        request.open('GET', url, true); // abre requisicao GET na url de form assincrona
        request.onreadystatechange = update_list_home;
        request.send(null);
    }
}

function update_list_home(){ // executada ao ser acionada pelo usuario
    createRequest();
    if (request){
        var url = 'list_service.php';
        request.open('GET', url, true); // abre requisicao GET na url de form assincrona
        request.onreadystatechange = set_update_list_home; // funcao executada ao receber retorno do servidor via echo do php anterior
        request.send(null);
    }   
}

function set_update_list_home(){
    if (request){
        if (request.readyState == 4){ // se solicitacao ja foi concluida
            var response_server = request.responseText; // reposta do server em string (via funcao echo do php anterior)
            
            document.getElementById('list_services').innerHTML = response_server; // elemento do html com o id vai receber essa resposta
            
            document.getElementById('value_total').innerHTML = response_server.split('<h5>')[1];
            
            show_code_note();
        }
        
    }

}

function delete_service_list(cod_service){
    createRequest();

    if (request){
        url = 'delete_service.php?cod=' + cod_service;
        
        request.open('GET', url, true);
        request.onreadystatechange = update_list_home;
        request.send(null);

    }
}

function show_code_note(){
    createRequest();
    if (request){
        var url = 'show_code_note.php';
        request.open('GET', url, true);
        request.onreadystatechange = set_show_code_note;
        request.send(null);
    }
}

function set_show_code_note(){
    if (request){
        var response_server = request.responseText;
        document.getElementById('code_note').innerText = response_server;
        
    }
}

function finish_note(){
    createRequest();
    if (request){
        var url='finish_note.php';
        request.open('GET', url, true);
        request.onreadystatechange = set_finish_note;
        request.send(null);
    }
}

function set_finish_note(){
    if(request){
        var response_server = request.responseText;
        
        if (response_server == 'true'){
            document.getElementById('list_services').innerText = '';
            document.getElementById('value_total').innerText = 'Valor Total';
            document.getElementById('code_note').innerText = '';
        }
    }
}
