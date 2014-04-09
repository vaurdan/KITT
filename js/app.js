/**
 * Created by henrique on 4/2/14.
 */

//Variaveis globais (estado)
var percentagem_escurecimento = 0;
var curr_screen;
var curr_buttom;

var screen_history = new Array();
var botoes_disponiveis = [];
var tipo_escurecimento = 0; //0 - Automático; 1 - Manual
/**
 * Array onde se guardam os ecrãs.
 * Primeiro elemento é o ecrã, o segundo é o botão principal activo.
 */
var screens = {
    'escurecimento-ecra': 'definicao',
    'definicoes-ecra': 'definicao',
    'alertas-ecra': 'alertas',
    'navegacao-ecra': 'navegacao',
    'escurecimento-manual-ecra': 'definicao'
};

function escurecer_vidro(percentagem, alertas, speed, automatico) {
    if(speed==undefined)
        speed=300;
    if(undefined==alertas) alertas = true;
    if(undefined==automatico) automatico = false;
    percentagem = percentagem; //obriga a estar entre 0 e 110 (por casa da barra)
    if(percentagem >= 100) percentagem = 100;
    //Calculamos o valor da opacidade (limite de 0.8)
    var valor_opacity = percentagem/100 * 0.8;
    $(".escurecimento").fadeTo( speed , valor_opacity);

    //Depois de ter escurecido, subimos a percentagem
    var percentagem_height = $('.barra-escurecimento').height() * percentagem / 100;
    $('.percentagem').animate({height:percentagem_height} ,speed);

    $(".barra-valor-percentagem").show().animate({
        bottom: percentagem_height - 15,
        left: $(".barra-escurecimento").offset().left + $(".barra-escurecimento").width() + 6
    }, speed, function() {
        //no final da animação
        if(alertas && !automatico)
            inserir_alerta('sol',"Vidro escurecido para " + Math.round(percentagem) + "%");
        else if(alertas && automatico)
            inserir_alerta('sol',"Encadeamento dectectado!","Vidro escurecido para " + Math.round(percentagem) + "%");

    }).html( Math.round(percentagem) + "%" );
    if(percentagem==0)
        $(".barra-valor-percentagem").hide();
    else
        $(".barra-valor-percentagem").show();
    //Actualizar a variavel global
    percentagem_escurecimento = percentagem;

    tipo_escurecimento = 1; //Manual
    actualizar_botao_escurecimento();


}

function mudar_ecra(ecra) {
    if(curr_screen != undefined && curr_screen.attr('id')!=ecra) {
       //Se já temos um ecrã
       curr_screen.hide();
       //Guardamos o ecrã antigo
       screen_history.push(curr_screen.attr('id'));
    } else {
        screen_history.push('return_to_home');
    }
    //Vamos activar o botão certo
    if(curr_buttom!=undefined) {
       curr_buttom.removeClass("botao-selecionado");
    }
    curr_buttom = $("."+screens[ecra]);
    curr_buttom.addClass("botao-selecionado");
    curr_screen = $("#"+ecra);
    curr_screen.show(100);
    botoes_disponiveis = $(".definicoes#" + ecra +" .botao");
    $.event.trigger({
        type: "ecraMudado",
        ecra: ecra
    });
}

function voltar_ecra() {
    if(curr_screen==undefined || screen_history.length == 0)
        return;
    curr_screen.hide();
    var screen_name = screen_history.pop();
    //Se já estamos na home, nao continuamos
    if(screen_name == "return_to_home") {
        if(curr_buttom!=undefined) curr_buttom.removeClass("botao-selecionado");
        screen_history = new Array();
        botoes_disponiveis = $(".gps-corpo > .botao");
        return;
    }

    curr_screen = $("#"+screen_name);
    curr_screen.show(100);
    botoes_disponiveis = $(".definicoes#" + screen_name +" .botao");

    if(curr_buttom!=undefined) {
        curr_buttom.removeClass("botao-selecionado");
    }
    curr_buttom = $("."+screens[screen_name]);
    curr_buttom.addClass("botao-selecionado");

    $.event.trigger({
        type: "ecraMudado",
        ecra: screen_name
    });
}

function inserir_alerta(icon, linha1, linha2) {
    //Remover alertas antigos
    $(".alerta").remove();

    var elemento = $('<div></div>').hide().addClass('alerta');
    if(icon != undefined) {
        elemento.append( $("<div></div>").addClass('icon').addClass(icon));
    }
    if(linha2 == undefined) {
        elemento.append( $("<div></div>").addClass("mensagem-single").append(
            $('<span></span>').text(linha1) ));
    } else {
        elemento.append( $("<div></div>").addClass("mensagem-dual").text(linha1).append(
            $("<p></p>").text(linha2)
        ));
    }
    elemento.append( $("<div></div>").css({"clear":"both"}) );
    $(".retrovisor-corpo").after(elemento);
    elemento.fadeIn(200).delay(5000).fadeOut(200,function() {
        $(this).remove();
    });
}

function actualizar_botao_escurecimento() {
    if(tipo_escurecimento == 0) {
        $("#automatico-botao").addClass('selecionado');
        $("#manual-botao").removeClass('selecionado');
    } else {
        $("#automatico-botao").removeClass('selecionado');
        $("#manual-botao").addClass('selecionado');
    }
}


$( document ).ready(function() {
    //Inicializamos a escuridão do ecrã a 0
    escurecer_vidro(0,false);
    //Inicializamos os botões disponiveis com os de topo
    botoes_disponiveis = $(".gps-corpo > .botao");
    //Colocar os botões de escurecimento manual e automatico selecionados de acordo com a variavel
    actualizar_botao_escurecimento();

    //Ao clicar no link de escurecimento
    $("#aumentar-escuro-botao").click(function() {
        percentagem_escurecimento += 10;
        //Garantimos que não passa dos 100%
        if(percentagem_escurecimento > 100) {
            percentagem_escurecimento = 100;
            return;
        }
        escurecer_vidro(percentagem_escurecimento);
    });

    $("#diminuir-escuro-botao").click(function() {
        percentagem_escurecimento -= 10;
        if(percentagem_escurecimento < 0) {
            percentagem_escurecimento = 0;
            return;
        }
        escurecer_vidro(percentagem_escurecimento);
    });

    $("#limpar-botao").click(function() {
        escurecer_vidro(0);
    });

    $(".barra-escurecimento").click(function(e) {
        var offset_t = $(this).offset().top - $(window).scrollTop();
        var top = Math.round( (e.clientY - offset_t) );

        var percentagem = 100 - (100 * top / $('.barra-escurecimento').height());
        escurecer_vidro(percentagem);
    })

    $("#escurecimento-botao").click(function() {
        mudar_ecra("escurecimento-ecra");
    });


    /** Botões de navegação principal **/
    $(".botao.definicao").click( function() {
        mudar_ecra("definicoes-ecra");

        screen_history = new Array('return_to_home'); //Limpamos o historico

    })

    $(".botao.alertas").click(function() {
        mudar_ecra('alertas-ecra');
        screen_history = new Array('return_to_home'); //Limpamos o historico

    });

    $(".botao.voltar").click(function() {
        voltar_ecra();
    });
    /** Fim de botões de navegação principal **/


    $("#automatico-botao").click(function() {
        escurecer_vidro(0,false);
        tipo_escurecimento = 0;
        actualizar_botao_escurecimento();
        inserir_alerta('sol', "Escurecimento automático activado.")

        var pos1 = $('.sol-grande').position();

        $('.sol-grande').delay(2000).animate({ 'top': '70px', 'left': '470px'}, 3000, function(){
            setTimeout(function() {
                escurecer_vidro(50,true,2000,true);
            },1000);
        });
    });

    $("#manual-botao").click(function() {
        tipo_escurecimento = 1;
        actualizar_botao_escurecimento();
        mudar_ecra('escurecimento-manual-ecra');
    });

});