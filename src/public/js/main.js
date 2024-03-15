const nameInput = document.getElementById('nameInput');
const nameLabel = document.getElementById('nameLabel');

nameInput.addEventListener('input', () => {
    if (nameInput.value !== '') {
        nameLabel.style.display = 'none';
    } else {
        nameLabel.style.display = 'inline-block';
    }
});

nameInput.addEventListener('onclick', ()=>{
    console.log('aaaa')
})