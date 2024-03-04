panels = document.querySelectorAll('panel')

console.log("HELLO")
panels.forEach(panel => 1 {
    panel.addEventListener('click', () => {
        panel.classList.add('active')
    })
})


function removeActiveClasses(){
    panels.forEach(panel => {
        panel classList.remove('active')
    })
}
