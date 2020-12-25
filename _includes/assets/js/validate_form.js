function field_has_error(field) {
    if (field.disabled || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return null;
    if (field.hasAttribute('data-custom-validator') && typeof custom_validators === 'object' && custom_validators !== null) {
        const validator_name = field.getAttribute('data-custom-validator');
        if (validator_name !== '' && typeof custom_validators === 'object' && custom_validators !== null && typeof custom_validators[validator_name] === 'function') {
            const custom_validator_result = custom_validators[validator_name](field);
            if (custom_validator_result !== null) {return custom_validator_result;}
        }
    }
    const validity = field.validity;
    if (validity.valid) return null;
    if (validity.valueMissing) {
        if (field.type === 'radio' || field.type === 'checkbox') return 'Please select an option.';
        if (field.type === 'file') return 'Please choose a file.';
        return 'Please fill out this field.';
    }
    if (validity.typeMismatch) {
        if (field.type === 'email') return 'Please enter a valid email address.';
        if (field.type === 'url') return 'Please enter a valid URL.';
        return 'Please enter a valid value.';
    }
    if (validity.tooShort) return 'The minimum length for this field is ' + field.getAttribute('minlength') + ' characters. You are currently using ' + field.value.length + ' characters.';
    if (validity.tooLong) return 'The maximum length for this field is ' + field.getAttribute('maxlength') + ' characters. You are currently using ' + field.value.length + ' characters.';
    if (validity.badInput) return 'Please enter a number.';
    if (validity.stepMismatch) return 'Please enter a valid value.';
    if (validity.rangeOverflow) return 'Please select a value no larger than ' + field.getAttribute('max') + '.';
    if (validity.rangeUnderflow) return 'Please select a value no smaller than ' + field.getAttribute('min') + '.';
    if (validity.patternMismatch) {
        if (field.hasAttribute('title')) return field.getAttribute('title');
        return 'Please match the requested format.';
    }
    return 'The value you entered for this field is invalid.';
}

function show_error(field, error) {
    field.classList.add('error');
    if (field.type === 'radio' && field.name) {
        const group = document.getElementsByName(field.name);
        if (group.length > 0) {
            for (let i = 0; i < group.length; i++) {
                if (group[i].form !== field.form) {continue;}
                group[i].classList.add('error');
            }
            field = group[group.length - 1];
        }
    }
    const field_id = field.id || field.name;
    const error_message_id = 'error-' + field_id;
    if (error_message_id === 'error-') return;

    let error_message_container = field.form.querySelector('.error-message#' + error_message_id);
    if (error_message_container === null) {
        error_message_container = document.createElement('div');
        error_message_container.className = 'error-message';
        error_message_container.id = error_message_id;

        if (field.type === 'radio' || field.type === 'checkbox') {
            const label = field.form.querySelector('label[for="' + field_id + '"]') || field.parentNode;
            if (label) {
                label.parentNode.insertBefore(error_message_container, label.nextSibling);
            }
            else {
                field.parentNode.insertBefore(error_message_container, field.nextSibling);    
            }
        }
        else {
            field.parentNode.insertBefore(error_message_container, field.nextSibling);
        }
    }
    field.setAttribute('aria-describedby', error_message_id);
    error_message_container.innerText = error;
    error_message_container.style.display = 'block';
    error_message_container.style.visibility = 'visible';
}

function remove_error(field) {
    field.classList.remove('error');
    if (field.type === 'radio' && field.name) {
        const group = document.getElementsByName(field.name);
        if (group.length > 0) {
            for (let i = 0; i < group.length; i++) {
                if (group[i].form !== field.form) {continue;}
                group[i].classList.remove('error');
            }
            field = group[group.length - 1];
        }
    }
    field.removeAttribute('aria-describedby');

    const error_message_id = 'error-' + (field.id || field.name);
    if (error_message_id === 'error-') return;

    const error_message_container = field.form.querySelector('.error-message#' + error_message_id);
    if (error_message_container !== null) {
        error_message_container.innerHTML = '';
        error_message_container.style.display = 'none';
        error_message_container.style.visibility = 'hidden';
    }
}

const forms = document.querySelectorAll('form.validate');
for (let i = 0; i < forms.length; i++) {
    forms[i].setAttribute('novalidate', true);
}

document.addEventListener('blur', function(event) {
    if ('form' in event.target) {
        if (!event.target.form.classList.contains('validate')) return;
        if (event.target.type !== 'file') {
            event.target.value = event.target.value.trim();
        }
        const error = field_has_error(event.target);
        if (error === null) {remove_error(event.target);}
        else {show_error(event.target, error);}
    }
}, true);

document.addEventListener('input', function(event) {
    if (!event.target.form.classList.contains('validate')) return;
    remove_error(event.target);
}, true);

document.addEventListener('input', function(event) {
    if (!event.target.form.classList.contains('validate')) return;
    if (event.target.type !== 'file') return;
    const error = field_has_error(event.target);
    if (error === null) {remove_error(event.target);}
    else {show_error(event.target, error);}
}, true);

document.addEventListener('submit', function(event) {
    if (!event.target.classList.contains('validate')) {return;}
    const fields = event.target.elements;

    let first_field_with_error = null;
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].type !== 'file') {
            fields[i].value = fields[i].value.trim();
        }
        const error = field_has_error(fields[i]);
        if (error !== null) {
            show_error(fields[i], error);
            if (!first_field_with_error) {
                first_field_with_error = fields[i];
            }
        }
    }
    if (first_field_with_error !== null) {
        event.preventDefault();
        first_field_with_error.focus();
    }
}, false);
