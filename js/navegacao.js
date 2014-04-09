/**
 * Created by henrique on 4/6/14.
 */
var botao_actual = 0;
var estado;
var $botao;


function subir_botao() {
    botao_actual = (botao_actual + 1) % botoes_disponiveis.length;
    actualizar_botao();
}

function descer_botao() {
    botao_actual = (botao_actual - 1 ) % botoes_disponiveis.length;
    actualizar_botao();
}

function actualizar_botao() {
    if($botao!=undefined)
        $botao.removeClass('hover');

    if(botoes_disponiveis.length > 1)
        $botao = botoes_disponiveis.eq(botao_actual);
    else
        $botao = botoes_disponiveis;
    $botao.addClass('hover');
}

function power_off() {
    if(estado == 0)
        estado = 1;
    else
        estado = 0;

    $(".gps-corpo").fadeToggle('200');
    $(".barra-escurecimento").fadeToggle('200');
    escurecer_vidro(0,false);
    if(estado==0)
        inserir_alerta('power-off','O sistema foi desligado.','Para voltar a iniciar, clique no botão no volante.');
    else
        inserir_alerta('power-off','Bem Vindo ao KITT!','Seja bem vindo de volta! Já estava com saudades...');

}

$( document ).ready(function() {
    actualizar_botao();

    $(document).on('ecraMudado',function() {
        actualizar_botao()
    })
    //Iniciamos o posicionamento dos botões no sitio certo.
    $("#botao_volante_1 .cima").click(function() {
        descer_botao();
    });

    $("#botao_volante_1 .baixo").click(function() {
        subir_botao();
    });

    $("#botao_volante_2").click(function() {
        //Simula um clique no botao
        $botao.click();
        botao_actual = 0;
    });

    $("#botao_volante_3").click(function() {
        //Simula um clique no botao
        voltar_ecra();
    });

    $("#botao_volante_4").click(function() {
        //Simula um clique no botao
        power_off();
    });

    $(".gps-corpo .botao").mouseover(function(){
        if($botao!=undefined)
            $botao.removeClass('hover');
        botao_actual = 0;
    });
});