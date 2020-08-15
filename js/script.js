$(() => {

    iniciarHome()
    verificarCliqueMenu()
    verificarCliqueLink()

    let currentValue = 0
    let isDrag = false
    let preco_maximo = 70000
    let = preco_atual = 0

    $('main').on('mousedown', '.pointer-barra', () => {
        isDrag = true
    })

    $(document).mouseup(() => {
        isDrag = false
        enableTextSelection()
    })

    $('main').on('mousemove', '.barra-preco', function(e) {
        if (isDrag) {
            disableTextSelection()
            let elementBase = $(this)
            let mouseX = e.pageX - elementBase.offset().left
            
            if (mouseX < 0) {
                mouseX = 0
            }

            if (mouseX > elementBase.width()) {
                mouseX = elementBase.width()
            }

            $('.pointer-barra').css('left', mouseX - 13 + 'px')
            currentValue = (mouseX / elementBase.width()) * 100
            $('.barra-preco-fill').css('width', currentValue + '%')

            preco_atual = (currentValue / 100) * preco_maximo
            preco_atual = formatarPreco(preco_atual)
            $('.preco-pesquisa').html('R$ ' + preco_atual)
        }
    })

})

// Função para fazer a navegação através do menu
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

        fazerRequisicao(href)

        e.preventDefault()
    })
}

// Função para carregar a página principal
function iniciarHome() {
    $('nav li:first-child a').addClass('ativo')

    fazerRequisicao('./pages/home.html')
}

// Função para carregar links na página
function verificarCliqueLink() {
    $('main').on('click', 'a', e => {
        let href = $(e.target).attr('href')

        fazerRequisicao(href)

        e.preventDefault()
    })
}

function fazerRequisicao(href) {
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
}

function disableTextSelection() {
    $('body').css({
        '-webkit-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        '-o-user-select': 'none',
        'user-select': 'none',
    })
}

function enableTextSelection() {
    $('body').css({
        '-webkit-user-select': 'auto',
        '-moz-user-select': 'auto',
        '-ms-user-select': 'auto',
        '-o-user-select': 'auto',
        'user-select': 'auto',
    })
}

function formatarPreco(preco) {
    preco = preco.toFixed(2)
    preco_array = preco.split('.')

    let novo_preco = formatarTotal(preco_array)

    return novo_preco
}

function formatarTotal(preco_array) {
    if (preco_array[0] < 1000) {
        return preco_array[0] + ',' + preco_array[1]
    } else if (preco_array[0] < 10000) {
        return preco_array[0][0] + '.' + preco_array[0].substr(1, preco_array[0].length) + ',' + preco_array[1]
    } else {
        return preco_array[0][0] + preco_array[0][1] + '.' + preco_array[0].substr(2, preco_array[0].length) + ',' + preco_array[1]
    }
}