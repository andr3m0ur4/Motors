let img_show = 3
let max_index
let current_index = 0

let amount_depoimento
let current_depoimento = 0

$(() => {

    iniciarHome()
    verificarCliqueMenu()
    verificarCliqueLink()

    // Sistema de pesquisa
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

    $('main').on('mousemove', '.barra-preco', e => {
        if (isDrag) {
            disableTextSelection()
            let elementBase = $(e.currentTarget)
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

    // Menu responsivo
    $('header nav').click(e => {
        $(e.target).find('ul').slideToggle()
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
    }).then(data => {
        if (href == './pages/home.html') {
            // Clicar e ir para a div de contato com base no atributo goto
            $('[goto=contato]').click(e => {
                $('html, body').animate({ 'scrollTop': $('#contato').offset().top })
                e.preventDefault()
            })

            //checkUrl()

            // Sistema de navegação nos depoimentos na home
            amount_depoimento = $('.depoimento-single p').length

            iniciarDepoimentos()
            navegarDepoimentos()
        } else if (href == './pages/veiculo.html') {
            iniciarSlider()
            navegarSlider()
            clickSlider()
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

// Sistema de slide da página individual de cada carro.

function iniciarSlider() {
    let amount = $('.mini-img-wrapper').length * 33.3
    let elementScroll = $('.nav-galeria-wrapper')
    let elementSingle = $('.mini-img-wrapper')
    elementScroll.css('width', amount + '%')
    elementSingle.css('width', 33.3 * (100 / amount) + '%')
}

function navegarSlider() {
    max_index = Math.ceil($('.mini-img-wrapper').length / 3) - 1

    $('.arrow-right-nav').click(() => {
        if (current_index < max_index) {
            current_index++
            let elementOff = $('.mini-img-wrapper').eq(current_index * 3).offset().left - $('.nav-galeria-wrapper').offset().left
            $('.nav-galeria').animate({ 'scrollLeft': elementOff + 'px' })
        } else {
            console.log('chegamos até o final')
        }
    })

    $('.arrow-left-nav').click(() => {
        if (current_index > 0) {
            current_index--
            let elementOff = $('.mini-img-wrapper').eq(current_index * 3).offset().left - $('.nav-galeria-wrapper').offset().left
            $('.nav-galeria').animate({ 'scrollLeft': elementOff + 'px' })
        } else {
            console.log('chegamos até o início')
        }
    })
}

function clickSlider() {
    $('.mini-img-wrapper').click(e => {
        $('.mini-img-wrapper').removeClass('ativo')
        $(e.currentTarget).addClass('ativo')
        let img = $(e.currentTarget).children().css('background-image')
        $('.foto-destaque').css('background-image', img)
    })

    $('.mini-img-wrapper').eq(0).click()
}

function checkUrl() {
    let search = location.search.split('?')
    let current_page = search[1]

    if (current_page != undefined && current_page == 'contato') {
        $('html, body').animate({ 'scrollTop': $('#contato').offset().top })
    }
}

function iniciarDepoimentos() {
    $('.depoimento-single p').hide()
    $('.depoimento-single p').eq(0).show()
}

function navegarDepoimentos() {
    $('[next]').click(() => {
        current_depoimento++
        if (current_depoimento >= amount_depoimento) {
            current_depoimento = 0
        }

        $('.depoimento-single p').hide()
        $('.depoimento-single p').eq(current_depoimento).show()
    })

    $('[prev]').click(() => {
        current_depoimento--
        if (current_depoimento < 0) {
            current_depoimento = amount_depoimento - 1
        }

        $('.depoimento-single p').hide()
        $('.depoimento-single p').eq(current_depoimento).show()
    })
}