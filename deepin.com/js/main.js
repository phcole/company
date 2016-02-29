function navigateAuxi(pageUrl, pagePrefix, pageMax, callback) {
    return callback(pageUrl, pagePrefix, pageMax);
}

function navigateToPage(event, pageUrl, pagePrefix, pageMax) {
    var e = event || window.event;
    if (e.keyCode !== 13) {
        return false;
    }

    return navigateAuxi(pageUrl, pagePrefix, pageMax, function(url, page, max) {
        var pageInput = parseInt($('#page').val());
    //var pageInput = document.getElementById('go').attr('')
        var pageMax = parseInt(max);
        if (isNaN(pageInput) || pageInput > pageMax) {
            return false;
        }
        window.open(url + page + pageInput, '_self');
    });
}

(function($) {
    "use strict";

    function UE() {
    }

    UE.prototype.toggleSubMenu = function($parent, subMenuName) {
        $parent.on('click', function() {
            var $this = $(this);
            var $siblings = $this.siblings().has('.' + subMenuName);
            $siblings.removeClass('active').find('.' + subMenuName).hide();
            $this.find('.' + subMenuName).toggle();

            if (!!$this.find('.' + subMenuName).length && !!!$this.hasClass('active')) {
                $this.addClass('active');
            }

        });
    };

    UE.prototype.toggleSearch = function($searchButton, $searchInput) {

        function startSearch(pattern, keywords) {
            if (!keywords.length) {
                   return false;
            }

            window.open(pattern + ' ' + keywords, '_black').focus();
            return true;
        }


        $searchButton.on('click', function(event) {
            var $this = $(this);

            if (!$this.hasClass('active')) {
                $this.addClass('active');

                //Set search input's top to the button's top so they can be align properly.
                $searchInput.css({
                    top: $this.offset().top
                }).show();

                event.stopPropagation();

            } else {
                return startSearch($searchInput.data('search-pattern'), $searchInput.val());
            }
        });

        $searchInput.on('keypress', function(event) {
                var $this = $(this);
                if (event.keyCode === 13 && $this.val().length) {
                    startSearch($this.data('search-pattern'), $this.val());
                    $(document.body).trigger('click');
                }
        });

        $searchInput.on('click', function(event) {
            event.stopPropagation();
        });

        $(document.body).on('click', function() {
            $searchInput.hide();
            $searchButton.removeClass('active');
        });
    };

    UE.prototype.setupSlider = function($slider, options) {
        if (typeof $.fn.bxSlider === 'undefined' || !!!$slider.length) {
            return ;
        }

        //var options = { $AutoPlay: true };
        $slider.bxSlider(options);
        $('#gallery .arrow.prev').show().on('click', function() {
            $slider.goToPrevSlide();
        });

        $('#gallery .arrow.next').show().on('click', function() {
            $slider.goToNextSlide();
        });
    };

    UE.prototype.toggleMoreCategories = function($showMore) {
        $showMore.on('click', function() {
            var $this = $(this);
            var $catagories = $this.parent().find('ul');

            if(!!!$this.hasClass('active')) {
                $this.addClass('active');
                $catagories.css({height: 'auto'});
            } else {
                $this.removeClass('active');
                $catagories.css({height: '22px'});
            }
        });
    };

    UE.prototype.fixedTableHeader = function($table) {
        function adjustTableHeader($this, restore) {
            var $row = $table.find('tr:last-of-type');
            var $tds = $row.find('td');
            var $ths = $this.find('th');
            $ths.each(function(index, value) {
                var $this = $(this);
                var $td = $($tds[index]);

                if (restore) {
                    $this.css({
                        border: '1px solid #EAEAEA'
                    });
                    $this.css({width: 'auto'});
                } else {
                    $this.css({
                        border: 'none'
                    });
                    $this.width($td.outerWidth(true) + 1);
                }
            })
        }
        if (typeof $.fn.scrollToFixed !== 'undefined') {
            var $tableHeader = $table.find('tr:has(th)');
            $tableHeader.scrollToFixed({
                preFixed: function() {
                    adjustTableHeader($(this), false);
                },
                postFixed: function() {
                    adjustTableHeader($(this), true);
                }
            });
        }
    };

    UE.prototype.handleTopLink = function($scrollToTop) {
        function adjustPosition() {
            var $pageContentContainer = $('#content > .container');
            if (!!$pageContentContainer.length) {
                $scrollToTop.css({
                    right: ($pageContentContainer.offset().left - $scrollToTop.width() / 2 ) + 'px'
                });
            }
        }

        if(!!$scrollToTop.length) {
            adjustPosition();

            $scrollToTop.on('click', function() {
                $('html, body').animate({scrollTop:0}, 'slow');
                return false;
            });

            $(window).scroll(function() {
                if($(document).scrollTop() > 1000) {
                    $scrollToTop.fadeIn();
                } else {
                    $scrollToTop.fadeOut();
                }
             });
        }
    }

    $(document).ready(function() {
        var ue = new UE();
        //ue.toggleSubMenu($('.page-nav-body .menu > li'), 'sub-menu');
        ue.toggleSearch($('.search .search-button'), $('.search .search-input'));
        ue.setupSlider($('#slider-box.on'), {
            auto: true,
            pause: 3000,
            useCSS: false,
            autoHover: true
        });


        $('.global .view').on('click', function(event) {
            window.map.setViewport(window.map_view_points);
            event.stopPropagation();
        });

        $('.base .location .view').on('click', function(event) {
            var location = $ (this).siblings('.company').data('location');
            location = location.toLowerCase();
            window.map.centerAndZoom(new BMap.Point(window._company_coordinates[location]['longitude'], window._company_coordinates[location]['latitude']), 20);
            event.stopPropagation();
        });

        ue.toggleMoreCategories($('.categories .cell .show-more'));

        if(typeof $.fn.scrollToFixed !== 'undefined') {
            ue.fixedTableHeader($('#compatibility .details'));
        }

        ue.handleTopLink($('#back-to-top'));

        $('.more .show-more .link').on('click', function() {
            $(this).parent()
                   .parent()
                   .find('.honors')
                   .slideDown()
                   .end()
                   .find('.show-more')
                   .css({
                        'margin-top': 0
                    })
                   .hide();
            //var x = $(this).parent().parent().find('.honors').show().end();



        });

    });
})(jQuery);
