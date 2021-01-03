function update_character_counter(field) {
    const maxlength = field.getAttribute('maxlength').trim();
    if (maxlength === '') return;
    const remaining = maxlength - field.value.length;

    let counter_color = '#444444';
    if (remaining < Math.min(0.25 * maxlength, 40)) {counter_color = '#c87800';}
    if (remaining < Math.min(0.1 * maxlength, 10)) {counter_color = '#ff0040';}

    if (field.nextElementSibling === null || !field.nextElementSibling.classList.contains('character-counter')) {
        field.parentNode.insertBefore(document.createElement('p'), field.nextSibling);
        field.nextElementSibling.classList.add('character-counter');
        field.nextElementSibling.style.textAlign = 'right';
        field.nextElementSibling.style.fontStyle = 'italic';
        field.nextElementSibling.style.fontSize = '0.85em';
    }

    field.nextElementSibling.innerText = remaining + ' characters remaining.';
    field.nextElementSibling.style.color = counter_color;
}

document.addEventListener('input', function(event) {
    if (event.target.classList.contains('count') && event.target.hasAttribute('maxlength')) {
        update_character_counter(event.target);
    }
});

document.addEventListener('blur', function(event) {
    const sibling_character_counter = event.target.parentNode.querySelector('.character-counter');
    if (sibling_character_counter !== null) {
        sibling_character_counter.parentNode.removeChild(sibling_character_counter);
    }
}, true);
