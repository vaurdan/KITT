
var em_navegacao = false;
var destino;

var toggle = false;
function activar_navegacao() {}

$(document).on('semEcras',function(teste) {
    if(em_navegacao) {
        mudar_ecra('cancelar-navegacao-ecra');
    }
})

$(document).ready(function() {

    $(".botao.navegar").click( function() {
        if(em_navegacao) {
            mudar_ecra("cancelar-navegacao-ecra");
            screen_history = new Array('return_to_home'); //Limpamos o historico
        } else {
            mudar_ecra("navegacao-ecra");
            screen_history = new Array('return_to_home'); //Limpamos o historico
        }
    })

    $("#cancelar-nav-botao").click(function() {
        em_navegacao = false;
        $(".gps-corpo .imagem").css({ 'background': 'url("img/staticmap.png") no-repeat center'});
        $(".vidro-carro").css({ 'background': 'url("img/estrada.jpg")', 'background-size': 'cover'});
        ir_para_home();
    });

    $("#iniciar-nav-botao").click(function() {
        processar_ecra("A procurar caminho...");
        setTimeout( function() {
            $(".gps-corpo .imagem").css({ 'background': 'url("img/staticmap_caminho.png") no-repeat center'});
            $(".vidro-carro").css({ 'background': 'url("img/estrada_seta.jpg")', 'background-size': 'cover'});
            destino = $("input.navto").val();
            inserir_alerta('frente','Siga em frente','Siga pela Rua das Amélias, durante 1500 metros.');
            ir_para_home();
            $('span#destino').text(destino);
            em_navegacao = true;
            setTimeout( function() {
                inserir_alerta('stop',"Operação Stop a 2.9km!","Conduza com cuidado, vai passar por lá.");
            },3000);
        },Math.round(Math.random()*(3000-500))+500);
    });

});