window.Ajax = function(route, calltype, params = null) {
    return new Promise(function(resolve, reject){
    });
}

//====== FUNCIONALIDADES =================================

var count = 1;

$(document).ready(function() {
      $("#ADD").click(function() {
        var show = "#contact"+count;
        $(show).show();
        count ++;
        if(count == 4) 
        {
            count = 3;
        }
        return false;
    });

    $("#HIDE").click(function() {

        var show = "#contact"+count;
        $(show).hide();
        count --;

        if(count == 0)
        {
            count = 1;
        }
        return false;
    });

//============= CADASTRAR ======================================

    $("#cad").on('click', function(e) {
        if($("#nome").val() === "" || $("#email").val() === "" || $("#contact").val() === "") 
        {
            $(".alertErr").slideDown("slow");
        } else
        {
            $(".alertSuc").slideDown("slow");
        }
        e.preventDefault();

        let action = 0;
        let name = $("#nome").val();
        let mail = $("#email").val();
        let contact = $("#contact").val();

        $.ajax({
            url: '/add/' + name + '/' + mail + '/' + contact + '/' + action,
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            cache: false,
            timeout: 5000,

            success: function (result) {
                if ($.isEmptyObject(result))
                {
                    console.log('Ocorreu um erro');
                }
                else
                {
                    console.log("Parametros recebidos pelo servidor");
                }
            },

            error: function (err) {
                console.log(err);
            },
        });


        if(count > 1) {
            tellAdd(count);
        }

    });

//====================== CONTATOS ADICIONAIS ============================

function tellAdd(x) {

        for(var i=0; i <= x; i++) {

        let action = 3;
        var tell = "#contact"+i;
        let contact = $(tell).val();

        $.ajax({
            url: '/add/' + contact + '/' + action,
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            cache: false,
            timeout: 5000,

            success: function (result) {
                if ($.isEmptyObject(result))
                {
                    console.log('Ocorreu um erro');
                }
                else
                {
                    console.log("Parametros recebidos pelo servidor");
                }
            },

            error: function (err) {
                console.log(tell);
            },
        });
    }

}


//====================== Lista de Clientes ============================
    
	$('#itens').empty();
	$.ajax({
		type:'post',
		dataType: 'json',
		url: '/list',
		success: function(dados){
			for(var i=0;dados.length>i;i++){
				$('#itens').append('<tr><td scope="row"><button type="submit" onclick="edit('+dados[i].id+')"  id="EDIT" class="btn btn-primary"><i class="fa fa-edit"></i></button> <button type="submit" onclick="del('+dados[i].id+')" id="DELETE" class="btn btn-danger"><i class="fa fa-trash"></i></button></td><td>'+dados[i].name+'</td><td>'+dados[i].mail+'</td><td>'+dados[i].contact+'</td></tr>');
			}
		}
    });


    $.ajax({
		type:'post',
		dataType: 'json',
		url: '/list/edit/'+ localStorage.getItem("id"),
		success: function(dados){
            $('#item').append('<tr><td scope="row"><button type="submit" onclick="update('+dados[0].id+')"  id="SAVE" class="btn btn-primary">Salvar</button> <a href="/" id="CLOSE" class="btn btn-danger">Cancelar</a></td><td><input type="text" class="form-control" id="name" value="'+dados[0].name+'"></td><td><input type="text" class="form-control" id="mail" value="'+dados[0].mail+'"></td><td><input type="text" class="form-control" id="contato" value="'+dados[0].contact+'"></td></tr>');
		}
    });

    
});

//================== ALTERAR ======================================

function update(clientId) {

$(document).ready(function(e) {
    
    $("#SAVE").on('click', function(e) {
        if($("#name").val() === "" || $("#mail").val() === "" || $("#contato").val() === "") 
        {
            $(".alertErr").slideDown("slow");
        } else
        {
            $(".alertSuc").slideDown("slow");
        }
        e.preventDefault();

        let action = 2;
        let name = $("#name").val();
        let mail = $("#mail").val();
        let contact = $("#contato").val();

        $.ajax({
            url: '/edit/' + clientId + '/' + name + '/' + mail + '/' + contact + '/' + action,
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            cache: false,
            timeout: 5000,

            success: function (result) {
                if ($.isEmptyObject(result))
                console.log('Ocorreu um erro');
                else
                    console.log("Parametros recebidos pelo servidor");
            },

            error: function (err) {
                console.log(err);
            },
        });


        if(count > 1) {
            tellAdd(count);
        }

    });
});
}


//========================== DELETE ==============================================

function del(id) {

    $(document).ready(function(){
        let action = 1;

        $.ajax({
            url: '/del/' + id + '/' + action,
            type: 'POST',
            dataType: "json",
            contentType: "application/json",

            success: function (result) {
                if ($.isEmptyObject(result))
                console.log('Ocorreu um erro');
                else
                    console.log("Parametro recebidos pelo servidor");
            },

            error: function (err) {
                console.log(err);
            },
        });

    
    location.reload();
    });
    
}

//========================== EDITAR ==============================================

function edit(i) {

    localStorage.setItem("id", i);
    window.location.href = "/editar";

}
