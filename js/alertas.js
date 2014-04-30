/**
 * Created by henrique on 4/22/14.
 */

var alertas_nomes = ['Operação Stop', 'Transito', 'Interrupção de via'];

var tipos_alertas = ['stop', 'transito', 'interrupcao'];
var alerta_antes = 2;
var alerta_actual = 0;
var alerta_depois = 1;


$( document ).ready(function() {

    $("#dir-tipo-botao").click(function() {
        //Colocar o botao centra
        $(".tipo-alerta.tipo-actual").removeClass(tipos_alertas[alerta_actual]);
        alerta_actual = (alerta_actual + 1) % tipos_alertas.length;
        $(".tipo-alerta.tipo-actual").addClass(tipos_alertas[alerta_actual]);

        //Mover o botao antes
        $(".tipo-alerta.tipo-antes").removeClass(tipos_alertas[alerta_antes]);
        alerta_antes = (alerta_antes + 1) % tipos_alertas.length;
        $(".tipo-alerta.tipo-antes").addClass(tipos_alertas[alerta_antes]);

        //Mover o botao depois
        $(".tipo-alerta.tipo-depois").removeClass(tipos_alertas[alerta_depois]);
        alerta_depois = (alerta_depois + 1) % tipos_alertas.length;
        $(".tipo-alerta.tipo-depois").addClass(tipos_alertas[alerta_depois]);

        $(".texto-alerta").text(alertas_nomes[alerta_actual]);

    });

    $("#esq-tipo-botao").click(function() {
        //Colocar o botao centra
        $(".tipo-alerta.tipo-actual").removeClass(tipos_alertas[alerta_actual]);
        alerta_actual = (alerta_actual - 1 + tipos_alertas.length) % tipos_alertas.length ;
        $(".tipo-alerta.tipo-actual").addClass(tipos_alertas[alerta_actual]);

        //Mover o botao antes
        $(".tipo-alerta.tipo-antes").removeClass(tipos_alertas[alerta_antes]);
        alerta_antes = (alerta_antes - 1 + tipos_alertas.length) % tipos_alertas.length;
        $(".tipo-alerta.tipo-antes").addClass(tipos_alertas[alerta_antes]);

        //Mover o botao depois
        $(".tipo-alerta.tipo-depois").removeClass(tipos_alertas[alerta_depois]);
        alerta_depois = (alerta_depois - 1 + tipos_alertas.length) % tipos_alertas.length;
        $(".tipo-alerta.tipo-depois").addClass(tipos_alertas[alerta_depois]);

        $(".texto-alerta").text(alertas_nomes[alerta_actual]);

    });

    $("#ver-alertas-botao").click(function () {
        mudar_ecra('ver-alertas-ecra');
    });

    $("#enviar-alertas-botao").click(function () {
        mudar_ecra('enviar-alertas-ecra');
    });

    $("#partilhar-botao").click(function() {
        processar_ecra("A partilhar...");
        setTimeout( function() {
            mudar_ecra('partilha-sucesso-ecra');
            setTimeout(function () {
                ir_para_home();
            },5000);
        },Math.round(Math.random()*(3000-500))+500);
    });

    $("#voltar-partilha-botao").click(function() {
        ir_para_home();
    });

});