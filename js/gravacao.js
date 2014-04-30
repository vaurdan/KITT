var a_gravar = false;

function actualizar_botao_gravacao() {
    if(a_gravar == 'foto') {
        $(".botao.foto").addClass('selecionado');
        $(".botao.video").removeClass('selecionado');
    } else if(a_gravar == 'video') {
        $(".botao.foto").removeClass('selecionado');
        $(".botao.video").addClass('selecionado');
    } else {
        $(".botao.foto").removeClass('selecionado');
        $(".botao.video").removeClass('selecionado');
    }
}


$( document ).ready(function() {
    /** Botões de controlo de gravação de foto/video */
    $(".botao.video").click(function() {
        if(a_gravar=='video') {
            //desactivamos a gravaçao
            a_gravar = false;
            inserir_alerta('video','Gravação desactivada.');
            $(".gravacao.video").fadeOut(200);
            $(".gravacao-video .rec").fadeOut(100);

        } else {
            a_gravar = 'video';
            inserir_alerta('video','Gravação iniciada.','Estou agora a gravar tudo o que se passa à sua frente...');
            $(".gravacao.foto").fadeOut(100);
            $(".gravacao.video").fadeIn(200);
            $(".gravacao-video .rec").fadeIn(200);

        }
        actualizar_botao_gravacao();
    });

    $(".botao.foto").click(function() {
        if(a_gravar=='foto') {
            //desactivamos a gravaçao
            a_gravar = false;
            inserir_alerta('foto','Modo de Fotografia desactivado.');
            $(".gravacao.foto").fadeOut(200);;
        } else {
            a_gravar = 'foto';
            inserir_alerta('foto','Modo de Fotografia activado.');
            $(".gravacao.video").fadeOut(100);
            $(".gravacao-video .rec").fadeOut(100);
            $(".gravacao.foto").fadeIn(200);;

        }
        actualizar_botao_gravacao();
    });

    $(".gravacao.video .stop").click(function() {
        a_gravar = false;
        inserir_alerta('video','Gravação desactivada.');
        $(".gravacao.video").fadeOut(200);
        $(".gravacao-video .rec").fadeOut(100);
    });

    $(".shutter").click(function() {
        $(".gravacao.foto").addClass("blink");
        setTimeout(function() {
            $(".gravacao.foto").removeClass('blink');
        },100);
    });
});