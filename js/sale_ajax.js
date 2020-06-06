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

function update_list_sale(cod){ // executada ao ser acionada pelo usuario
    createRequest();
    if (request){
        
        var elements = document.getElementsByClassName('list-group-item');
        
        for (var i = 0; i < elements.length; i++) {
            
            elements[i].classList.remove('active');

            if (elements[i].textContent == cod){
                elements[i].classList.add('active');
            }
        }

        var url = "list_service.php?cod=" + cod;
        request.open('GET', url, true); // abre requisicao GET na url de form assincrona
        request.onreadystatechange = set_update_list_sale; // funcao executada ao receber retorno do servidor via echo do php anterior
        request.send(null);
    }   
}

function set_update_list_sale(){
    if (request){
        if (request.readyState == 4){ // se solicitacao ja foi concluida
            var response_server = request.responseText; // reposta do server em string (via funcao echo do php anterior)
            
            document.getElementById('list_services_sale').innerHTML = response_server; // elemento do html com o id vai receber essa resposta
        }
    }
}
