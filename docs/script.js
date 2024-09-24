var afwijking = 60;

function changeLineToObject(index) {
    var item = $("[data-menu-item=" + index + "]");

    $(".menu-item").removeClass("active");
    $(item).addClass("active");
    var width = $(item).outerWidth();
    var left = $(item).position().left;
    $(".menu .line").css("width", width);
    $(".menu .line").css("left", left);
}
function scrollTo(index, callback) {
    $('html, body').animate({
        scrollTop: $("[data-anchor=" + index + "]").offset().top - afwijking
    }, 500);
    if (callback) {
        setTimeout(callback, 500);
    }
}

function getActiveIndex() {
    var scrollTop = $(window).scrollTop();

    if (maxscrolltop() == scrollTop) {
        return 3;
    }

    for (var i = 0; i < 4; i++) {
        if (scrollTop < ($("[data-anchor=" + i + "]").offset().top - (afwijking + 1))) {
            return i - 1;
        }
    }
}

function maxscrolltop() {
    return document.body.offsetHeight - window.innerHeight;
}

function intresseIn(naam) {
    scrollTo(3, function () {
        $("#name").focus();
    });
    var message = "Beste Ruark,\n\nIk heb intresse in '" + naam + "'. Wil je contact met mij opnemen voor meer informatie?\n\nMet vriendelijke groet,\n";

    $("#message").val(message);
}

function calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function toggleCaravanTrainig(event) {
    $("#caravan-training-more-info").slideToggle();
    event.preventDefault();
    return false;
}

var currentActive = null;
function updateMenuLine() {
    var newIndex = getActiveIndex();
    if (currentActive != newIndex) {
        currentActive = newIndex;
        changeLineToObject(newIndex);
    }
}

function sendMail(event) {
    event.preventDefault();

    $("#allFieldRequired").hide();
    $("#mailSend").hide();
    if ($('[name=name]').val().trim() === "" || $('[name=emailOrPhone]').val().trim() === "" || $('[name=message]').val().trim() === "") {
        $("#allFieldRequired").show();
        return false;
    }
    $.post("https://www.verkeersschoolruarkvandijken.nl/send-mail.php", $("#contactForm").serialize())
        .done(function (data) {
            if (data == 'true') {
                $("#mailSend").show();
            } else {
                alert("Er is helaas een fout opgetreden. Je bericht kon niet worden verzonden. Zie onderaan de pagina voor alternatieve contactmogelijkheden.");
            }
        });
    return false;
}

function sendPhone(event) {
    event.preventDefault();

    $("#phoneSend").hide();
    if ($('#phoneNumberToSend').val().trim() === "") {
        return false;
    }
    $.post("https://www.verkeersschoolruarkvandijken.nl/send-mail.php", {
        name: $('#phoneNumberToSend').val(),
        emailOrPhone: $('#phoneNumberToSend').val(),
        message: "Deze persoon wil graag teruggebeld worden."
    })
        .done(function (data) {
            if (data == 'true') {
                $("#phoneSend").show();
            } else {
                alert("Er is helaas een fout opgetreden. Je bericht kon niet worden verzonden. Zie onderaan de pagina voor alternatieve contactmogelijkheden.");
            }
        });
    return false;
}

window.addEventListener("load", function () {

    $(function () {

        setTimeout(function () {
            updateMenuLine();
        }, 10);

        setInterval(function () {
            updateMenuLine();
        }, 2000);

        $(window).scroll(function (e) {
            updateMenuLine();
        });

        $("[data-onclick-scroll-to]").click(function () {
            scrollTo($(this).attr("data-onclick-scroll-to"));
        });

        $("#age").text(calculateAge(new Date("1989-09-04")) + " jaar, ");
    });
});
