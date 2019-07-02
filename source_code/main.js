$(document).ready(function () {
    $(".nav .ho-color").hover(function () {
        $(this).css({ "background-color": "rgba(0, 0, 255, 0.25)" });
    }, function () {
        $(this).css({ "background-color": "rgb(0, 0, 122)" });
    });
    function gameInfo(game) {
        $(".imgInfo").empty();
        $(".imgInfo").show();
        $(".wrapperContainer").css({ "background-color": "gray", "filter": " grayscale(160%)" });
        $(".footer .card").css({ "background-color": "rgba(0, 0, 0, 0.15)" });
        $(".rest").show();
        $.ajax({
            url: 'https://5cee82c31c2baf00142cbffb.mockapi.io/gameData',
            type: 'GET',
        }).done(function (rs) {
            var moreType = 0;
            for (var i = 0; i < 99; i++) {
                if (rs[i].name == game) {
                    if (moreType == 0) {
                        $(".imgInfo").append(
                            `<div class="row no-gutters bg-white">
                                <div class="col-md-4 p-2">
                                    <img src="`+ rs[i].image + `" class="card-img imgData" alt="` + rs[i].name + `">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">`+ rs[i].name + `</h5>
                                        <p class="card-text type">Thể loại: `+ rs[i].type + `</p>
                                        <p class="card-text">Năm: `+ rs[i].year + `</p>
                                        <p class="card-text">Giới thiệu: `+ rs[i].description + `</p>
                                        <p class="card-text">Ram: `+ rs[i].ram + ` GB</p>
                                        <p class="card-text">Bộ nhớ: `+ rs[i].memory + ` GB</p>
                                    </div>
                                </div>
                            </div>`
                        );
                        moreType++;
                    }
                    else {
                        $(".imgInfo .card-body .type").append(", " + rs[i].type);
                    }
                }
            }
        });
    }
    $("body").on("click", "img", function (evt) {
        var className = $(evt.target);
        if ($(className).hasClass("imgData")){
            return;
        }
        else{
            gameInfo($(className).attr("alt"));
        }
    });
    $(".signIn").click(function () {
        $(".participate").empty();
        $(".participate").show();
        $(".wrapperContainer").css({ "background-color": "gray", "filter": " grayscale(160%)" });
        $(".footer .card").css({ "background-color": "rgba(0, 0, 0, 0.15)" });
        $(".rest").show();
        $(".participate").append(
            `<form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Lưu Password</label>
                </div>
                <button type="submit" class="btn btn-primary">Đăng Nhập</button>
            </form>`
        );
    });
    $(".register").click(function () {
        $(".participate").empty();
        $(".participate").show();
        $(".wrapperContainer").css({ "background-color": "gray", "filter": " grayscale(160%)" });
        $(".footer .card").css({ "background-color": "rgba(0, 0, 0, 0.15)" });
        $(".rest").show();
        $(".participate").append(
            `<form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Nhập lại Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Lưu Password</label>
                </div>
                <button type="submit" class="btn btn-primary">Đăng Ký</button>
            </form>`
        );
    });
    $(".rest").click(function () {
        $(".imgInfo").hide();
        $(".participate").hide();
        $(".wrapperContainer").css({ "background-color": "white", "filter": " grayscale(0)" });
        $(".footer .card").css({ "background-color": "rgba(0, 0, 0, 0.1)" });
        $(".rest").hide();
    });
    $(".filterBtn").click(function () {
        var filterInfo = [$(".yearFrom").val(), $(".yearTo").val(), $(".memFrom").val(), $(".memTo").val(), $(".ramGB").val(), $(".typeFilter").val()];
        if (filterInfo[0] == null) {
            filterInfo[0] = 2000;
        }
        if (filterInfo[1] == null) {
            filterInfo[1] = 2019;
        }
        if (filterInfo[2] == "") {
            filterInfo[2] = 0;
        }
        if (filterInfo[3] == "") {
            filterInfo[3] = 100;
        }
        if (filterInfo[4] == null) {
            filterInfo[4] = 16;
        }
        sessionStorage.setItem("filterInfo", JSON.stringify(filterInfo));
    });
    $(".cate-list a").click(function () {
        var typeInfo = $(this).text();
        console.log(typeInfo);
        sessionStorage.setItem("typeInfo", JSON.stringify(typeInfo));
    });
    var currentPage = 0;
    $(".wrapperContainer").on("click", ".pageNum .next", function () {
        $(".allGame").removeClass("Gactive");
        if (currentPage == $(".pageN").last().index() - 1) {
            currentPage = 0;
        }
        else {
            currentPage++;
        }
        $(".pageN").removeClass("active");
        $(".pageN" + currentPage).addClass("active");
        $("#allGame" + currentPage).addClass("Gactive");
    });
    $(".wrapperContainer").on("click", ".pageNum .pre", function () {
        $(".allGame").removeClass("Gactive");
        if (currentPage == 0) {
            currentPage = $(".pageN").last().index() - 1;
        }
        else {
            currentPage--;
        }
        $(".pageN").removeClass("active");
        $(".pageN" + currentPage).addClass("active");
        $("#allGame" + currentPage).addClass("Gactive");
    });
    $(".wrapperContainer").on("click", ".pageN", function () {
        $(".pageN").removeClass("active");
        currentPage = $(this).index() - 1;
        $(".pageN" + currentPage).addClass("active");
        $(".allGame").removeClass("Gactive");
        $("#allGame" + currentPage).addClass("Gactive");
    });
    $(".search .searchBtn").click(function () {
        sessionStorage.setItem("searchInfo", JSON.stringify($(".searchIn").val()));
    });
    function datalist() {
        var searchInfo = $(".searchIn").val();
        $("#searchGameRecommendation").empty();
        $.ajax({
            url: 'https://5cee82c31c2baf00142cbffb.mockapi.io/gameData',
            type: 'GET',
        }).done(function (rs) {
            var NoGame = [];
            if ($(".searchIn").val()) {
                for (var i = 0; i < 79; i++) {
                    if (rs[i].name.includes(searchInfo)) {
                        if (NoGame.length === 0) {
                            NoGame.push(i);
                        }
                        else {
                            var diff = true;
                            for (var j = 0; j < NoGame.length; j++) {
                                if (rs[NoGame[j]].name == rs[i].name) {
                                    diff = false;
                                    break;
                                }
                            }
                            if (diff == true) {
                                NoGame.push(i);
                            }
                        }
                    }
                }
                for (var i = 0; i < NoGame.length; i++) {
                    $("#searchGameRecommendation").append(`
                    <div class="recomGame row no-gutters">
                        <div class="col-md-4 p-2">
                            <img src="`+ rs[NoGame[i]].image + `" class="card-img" alt="` + rs[NoGame[i]].name + `" style="height: 40px">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body py-2">
                                <p class="card-title m-0 small">`+ rs[NoGame[i]].name + `</p>
                            </div>
                        </div>
                    </div>`);
                }
            }
        });
        $("#searchGameRecommendation").show();
    }
    $(".search .searchIn").on("input", function () {
        $("#searchGameRecommendation").empty();
        if ($(".searchIn").val()) {
            datalist();
        }
    });
    $(".search .searchIn").click(function () {
        $("#searchGameRecommendation").empty();
        $("#searchGameRecommendation").show();
        if ($(".searchIn").val()) {
            datalist();
        }
    });
    $("#searchGameRecommendation").on("click", ".recomGame", function () {
        $(".searchIn").val($(this).find(".card-title").text());
        $("#searchGameRecommendation").empty();
        gameInfo($(this).find(".card-title").text());
    });
    $('body').on("click", function (evt) {
        var className = $(evt.target);
        if ($(className).hasClass("searchIn")){
            return;
        }
        else{
            $("#searchGameRecommendation").hide();
        }
    });
    function getRecomPos(){
        var topRecom = $(".search").outerHeight() + $(".search").offset().top + 5;
        var leftRecom = $(".search").offset().left - 25;
        $("#searchGameRecommendation").parent().css({"left": leftRecom, "top": topRecom});
    }
    getRecomPos();
});