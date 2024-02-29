loadText = document.querySelector('.loading-text')
bg = document.querySelector('.bg')

load = 0

setInterval(blurring,50)

function blurring() {
    load++

    if (load > 100){
        clearInterval(int)
    }
    loadText.innerText = `${load}%`
    loadText.style.opacity = 1 - load/100
    bg.style.filter = `blur(${30-load/100*30}px)`
}

