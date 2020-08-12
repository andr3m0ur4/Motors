$(() => {

    iniciarHome()
    verificarCliqueMenu()

})

function verificarCliqueMenu() {
    $('nav a').click(e => {

        let href = $(e.target).attr('href')
        $('nav a').removeClass('ativo')
        $(e.target).addClass('ativo')

        if (href != './pages/home.html') {
            $('header').addClass('borda')
            $('footer').addClass('borda')
        } else {
            $('header').removeClass('borda')
            $('footer').removeClass('borda')
        }

        $.ajax({
            url: href,
            error: (jqXHR, textStatus, errorThrown) => {
                if (jqXHR.statusText == 'Not Found') {
                    console.log('Página não encontrada!')
                }
            },
            success: data => {
                $('main').html(data)
            }
        })

        e.preventDefault()
    })
}

function iniciarHome() {
    $('nav li:first-child a').addClass('ativo')

    $.ajax({
        url: './pages/home.html',
        error: (jqXHR, textStatus, errorThrown) => {
            if (jqXHR.statusText == 'Not Found') {
                console.log('Página não encontrada!')
            }
        },
        success: data => {
            $('main').html(data)
        }
    })
}