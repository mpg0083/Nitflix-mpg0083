$(window).on('load', function() { // Cambiamos $(document).ready a $(window).on('load'
    var header = $('header');
    var mainBackground = $('.main-background');
    var trailerContainer = $('.trailer-container');
    var trailerFrame = $('#trailer-frame');
    var mainTitle = $('#main-title');
    var mainDescription = $('#main-description');
    var isExpanded = false;
    var moviesContainer = $('#movies-container');
    var dramasContainer = $('#dramas-container');
    var moreDramasContainer = $('#more-dramas-container');
    var listViewBtn = $('#list-view-btn');
    var galleryViewBtn = $('#gallery-view-btn');

    function switchToListView() {
        $('.gallery-item').hide();
        $('.list-item').show();
        // Para My List
        moviesContainer.removeClass('row-cols-md-3');
        moviesContainer.addClass('row-cols-1');
        // Para TV Dramas
        dramasContainer.removeClass('row-cols-md-4');
        dramasContainer.addClass('row-cols-1');
        // Para More Dramas (si lo sigues usando)
        moreDramasContainer.removeClass('row-cols-md-4');
        moreDramasContainer.addClass('row-cols-1');
    }

    function switchToGalleryView() {
        $('.list-item').hide();
        $('.gallery-item').show();
        // Para My List
        moviesContainer.removeClass('row-cols-1');
        moviesContainer.addClass('row-cols-md-3');
        // Para TV Dramas
        dramasContainer.removeClass('row-cols-1');
        dramasContainer.addClass('row-cols-md-4');
        // Para More Dramas (si lo sigues usando)
        moreDramasContainer.removeClass('row-cols-1');
        moreDramasContainer.addClass('row-cols-md-4');
    }

    listViewBtn.click(function() {
        switchToListView();
    });

    galleryViewBtn.click(function() {
        switchToGalleryView();
    });

    $('.miniature').click(function() {
        var trailerUrl = $(this).data('trailer');
        var title = $(this).data('title');
        var description = $(this).data('description');

        mainTitle.text(title);
        mainDescription.text(description);
        $('#trailer-frame').attr('src', trailerUrl + '?controls=0&autoplay=1&loop=1&mute=1&playlist=' + trailerUrl.split('/').pop().split('?')[0]);
        trailerContainer.fadeIn('slow');
        mainBackground.addClass('expanded');
        $('html, body').animate({ scrollTop: 0 }, 'slow', function() {
            header.addClass('header-transparent');
            isExpanded = true;
        });
    });

    $(window).scroll(function() {
        if (isExpanded && $(this).scrollTop() > mainBackground.height() * 0.3) {
            header.removeClass('header-transparent');
            header.addClass('bg-dark');
        } else if (isExpanded && $(this).scrollTop() <= mainBackground.height() * 0.3) {
            header.removeClass('bg-dark');
            header.addClass('header-transparent');
        } else if (!isExpanded && $(this).scrollTop() > 50) {
            header.addClass('bg-dark');
        } else if (!isExpanded && $(this).scrollTop() <= 50) {
            header.removeClass('bg-dark');
        }
    });

    var firstMiniature = $('.miniature').first();
    if (firstMiniature.length > 0) {
        var initialTrailerUrl = firstMiniature.data('trailer');
        var initialTitle = firstMiniature.data('title');
        var initialDescription = firstMiniature.data('description');

        mainTitle.text(initialTitle);
        mainDescription.text(initialDescription);
        $('#trailer-frame').attr('src', initialTrailerUrl + '?controls=0&autoplay=1&loop=1&mute=1&playlist=' + initialTrailerUrl.split('/').pop().split('?')[0]);
        trailerContainer.show();
        mainBackground.addClass('expanded');
        header.addClass('header-transparent');
        isExpanded = true;
        $('html, body').scrollTop(0);
    }

    // Inicialmente, mostrar la vista de galería
    switchToGalleryView();
});