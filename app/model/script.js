window.Ajax = function(route, calltype, params = null) {
    return new Promise(function(resolve, reject){

    });
}
var count = 1;

$(document).ready(function() {

    if(count == 5) {
        count = 4;
    }

  $("#ADD").click(function() {
      var show = "#contact"+count;
      $(show).show();
      count ++;
      return false;
  });
});

$(document).ready(function() {

    if(count == 0) {
        count = 1;
    }

  $("#HIDE").click(function() {
      var show = "#contact"+count;
      $(show).hide();
      count --;
      return false;
  });
});

//================= cadastrar ===================

$(document).ready(function(e) {
    
    $("#cad").on('click', function(e) {
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


//====================== contastos extras ============================

function tellAdd(x) {
    
    $(document).ready(function(e) {

        for(var i=1; i < x; i++) {

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
                console.log('Ocorreu um erro');
                else
                    console.log("Parametros recebidos pelo servidor");
            },

            error: function (err) {
                console.log(tell);
            },
        });
    }
});

}


//====================== Lista de Clientes =============================

var id = 20;

$(document).ready(function(){

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
		url: '/list/edit/'+ id,
		success: function(dados){
			$('#item').append('<tr><td scope="row"><button type="submit"  id="EDIT" class="btn btn-primary"><i class="fa fa-edit"></i></button> <button type="submit" id="DELETE" class="btn btn-danger"><i class="fa fa-trash"></i></button></td><td>'+dados[0].name+'</td><td>'+dados[0].mail+'</td><td>'+dados[0].contact+'</td></tr>');
		}
    });

    
});


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

    });
    location.reload();
    
}

//========================== EDITAR ==============================================

function edit(i) {

  //this.id = 20;

    window.location.href = "/editar";
}
