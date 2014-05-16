(function () {
    var s = Snap('#snap'),
        grid = 160,
        imgSize = 130,
        outerSize = 100,
        innerSize = 90,
        animation = 'fade';

    var team = {
        avi:    {
            img: 'avi_bnw.jpg',
            color: 'avi_color.jpg',
            x: grid,
            y: 0
        },
        david:  {
            img: 'david_bnw.jpg',
            color: 'david_color.jpg',
            x: grid*2,
            y: 0
        },
        lp:     {
            img: 'lp_bnw.jpg',
            color: 'lp_color.jpg',
            x: grid/2,
            y: grid/2
        },
        logo:   {
            img: 'logo.png',
            x: grid + grid/2,
            y: grid/2
         },
        balazs: {
            img: 'balazs_bnw.jpg',
            color: 'balazs_color.jpg',
            x: grid*2 + grid/2,
            y: grid/2
        },
        mirko:  {
            img: 'mirko_bnw.png',
            color: 'mirko_color.png',
            x: grid,
            y: grid
        },
        zlatan: {
            img: 'zlatan_bnw.jpg',
            color: 'zlatan_color.jpg',
            x: grid*2,
            y: grid
        }
    };

    $('#buttons').on('click', 'button', function () {
        var zThis = $(this);

        if (zThis.hasClass('active')) return;

        $('#buttons button.active').removeClass('active');
        zThis.addClass('active');

        animation = zThis.data('animation');
    });

    for (member in team) {
        createMember(team[member]);
    }

    function createMember(member) {
        var img, outer, mask, bnw, color, colorMask;

        img = s.image('img/' + member.img, member.x, member.y, imgSize, imgSize);

        mask = s.rect(member.x + 20, member.y + 20, innerSize, innerSize)
            .transform('r-45')
            .attr({ fill: '#fff' });

        img.attr({ mask: mask });

        if (member.color) {
            color = s.image('img/' + member.color, member.x, member.y, imgSize, imgSize);

            colorMask = s.rect(member.x + 20, member.y + 20, innerSize, innerSize)
                .transform('r-45')
                .attr({ fill: '#fff' });

            color.attr({ mask: colorMask, transform: 's0', opacity: 0 });
        }

        outer = s.rect(member.x + 15, member.y + 15, outerSize, outerSize)
            .transform('r-45')
            .attr({
                'fill-opacity': 0,
                'stroke-width': 1,
                'stroke-opacity': 0.5,
                'stroke': '#000'
            });

        if (member.color) {
            outer.mouseover(function () { resolveInAnimation(member, img, color); });
            outer.mouseout(function () { resolveOutAnimation(member, img, color); });
        }
    }

    function resolveInAnimation(member, img, color) {
        switch (animation) {
            case 'fade':
                console.log('Not impemented');
                break;

            case 'scale':
                console.log('Not implemented');
                break;

            case 'explode':
                img.animate({ transform: getExplodeHideMatrix(member), opacity: 0 }, 200, mina.bounce, function () { img.attr({ transform: 's0' }) });
                color.animate({ transform: getExplodeShowMatrix(member), opacity: 1 }, 200, mina.bounce);
                break;

            case 'rotate':
                console.log('Not implemented');
                break;
        }
    }

    function resolveOutAnimation(member, img, color) {
        switch (animation) {
            case 'fade':
                console.log('Not impemented');
                break;

            case 'scale':
                console.log('Not implemented');
                break;

            case 'explode':
                img.animate({ transform: getExplodeShowMatrix(member), opacity: 1 }, 200, mina.bounce);
                color.animate({ transform: getExplodeHideMatrix(member), opacity: 0 }, 200, mina.bounce, function () { color.attr({ transform: 's0' }) });
                break;

            case 'rotate':
                console.log('Not implemented');
                break;
        }
    }

    // Explode specific
    function getExplodeShowMatrix(member) {
        return new Snap.Matrix().scale(1, 1, member.x + 130 /2, member.y + 130 /2);
    }

    function getExplodeHideMatrix(member) {
        return new Snap.Matrix().scale(2, 2, member.x + 130 /2, member.y + 130 /2);
    }
})();
