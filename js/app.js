/**
 * Created by henrique on 4/2/14.
 */

//Variaveis globais (estado)
var percentagem_escurecimento = 0;
var curr_screen = $(".elementoquenuncavaiexistir");
var curr_buttom = curr_screen;
function escurecer_vidro(percentagem) {
    percentagem = percentagem; //obriga a estar entre 0 e 110 (por casa da barra)
    if(percentagem >= 100) percentagem = 100;
    //Calculamos o valor da opacidade (limite de 0.8)
    var valor_opacity = percentagem/100 * 0.8;
    $(".escurecimento").fadeTo( 200 , valor_opacity);

    //Depois de ter escurecido, subimos a percentagem
    var percentagem_height = $('.barra-escurecimento').height() * percentagem / 100;
    $('.percentagem').animate({height:percentagem_height} ,200);

    $(".barra-valor-percentagem").show().animate({
        bottom: percentagem_height - 15,
        left: $(".barra-escurecimento").offset().left + $(".barra-escurecimento").width() + 6
    }, 200).html( Math.round(percentagem) + "%" );
    //Actualizar a variavel global
    percentagem_escurecimento = percentagem;
}

$( document ).ready(function() {
    //Inicializamos a escuridão do ecrã a 0
    escurecer_vidro(0);

    //Ao clicar no link de escurecimento
    $("#escurecer-ecra").click(function() {
        percentagem_escurecimento += 10;
        //Garantimos que não passa dos 100%
        percentagem_escurecimento %= 110;

        escurecer_vidro(percentagem_escurecimento);
    });

    $(".barra-escurecimento").click(function(e) {
        var offset_t = $(this).offset().top - $(window).scrollTop();
        var top = Math.round( (e.clientY - offset_t) );

        var percentagem = 100 - (100 * top / $('.barra-escurecimento').height());
        escurecer_vidro(percentagem);
    })

    $("#escurecimento-botao").click(function() {
        curr_screen.hide();
        curr_screen = $("#escurecimento-ecra");
        curr_screen.show(100);
    });

    $(".botao.definicao").click( function() {
        curr_screen.hide();
        curr_buttom.removeClass("botao-selecionado");
        curr_buttom = $(this);
        curr_screen = $("#definicoes-ecra");
        curr_buttom.addClass("botao-selecionado");
        curr_screen.show(100);
    })




});