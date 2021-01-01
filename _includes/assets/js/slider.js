(function() {
    function move_to_slide(slider, index) {
        slider.slides[slider.current_slide].classList.remove('active');
        slider.current_slide = (index + slider.slides.length) % slider.slides.length;
        slider.slides[slider.current_slide].classList.add('active');
        slider.style.height = slider.slides[slider.current_slide].clientHeight + 'px';
    }
    function next_slide(slider) {move_to_slide(slider, slider.current_slide + 1);}
    function previous_slide(slider) {move_to_slide(slider, slider.current_slide - 1);}

    const sliders = document.querySelectorAll('.slider-wrapper');
    for (let i = 0; i < sliders.length; i++) {
        const slider = sliders[i];
        slider.slides = slider.querySelectorAll('.slider-item');
        slider.current_slide = 0;
        slider.last_user_interaction = null;
        slider.initial_x = null;
        slider.initial_y = null;
        window.addEventListener('load', function() {
            move_to_slide(slider, slider.current_slide);
        });
        window.addEventListener('resize', function() {
            slider.style.height = slider.slides[slider.current_slide].clientHeight + 'px';
        });

        // automatically advance the slider
        setInterval(function() {
            if (slider.last_user_interaction === null || Date.now() - slider.last_user_interaction > 15000) {
                next_slide(slider);
            }
        }, 5000);

        // previous/next buttons
        slider.nav_triggers = slider.querySelectorAll('.next-slide, .previous-slide');
        for (let j = 0; j < slider.nav_triggers.length; j++) {
            const nav_trigger = slider.nav_triggers[j];
            nav_trigger.addEventListener('click', function() {
                slider.last_user_interaction = Date.now();
                if (nav_trigger.classList.contains('next-slide')) {next_slide(slider);}
                else if (nav_trigger.classList.contains('previous-slide')) {previous_slide(slider);}
            });
        }

        // keyboard navigation
        slider.addEventListener('keydown', function(event) {
            switch (event.keyCode) {
                case 39:
                    slider.last_user_interaction = Date.now();
                    next_slide(slider);
                    break;
                case 37:
                    slider.last_user_interaction = Date.now();
                    previous_slide(slider);
                    break;
            }
        });

        // swipe navigation
        slider.addEventListener('touchstart', function(event) {
            slider.initial_x = event.touches[0].clientX;
            slider.initial_y = event.touches[0].clientY;
        }, false);
        slider.addEventListener('touchmove', function(event) {
            if (slider.initial_x === null || slider.initial_y === null) {return;}
            event.preventDefault();
            const
                diff_x = slider.initial_x - event.touches[0].clientX,
                diff_y = slider.initial_y - event.touches[0].clientY;
            if (Math.abs(diff_x) > Math.abs(diff_y)) {
                slider.last_user_interaction = Date.now();
                if (diff_x > 0) {next_slide(slider);}
                else {previous_slide(slider);}
            }
            slider.initial_x = null;
            slider.initial_y = null;
        }, false);
    }
})();