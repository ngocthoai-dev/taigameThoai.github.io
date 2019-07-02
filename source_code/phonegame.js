$(document).ready(function () {
  function getPhoneGame(length) {
    $.ajax({
      url: 'https://5cee82c31c2baf00142cbffb.mockapi.io/gameData',
      type: 'GET',
    }).done(function (rs) {
      var NoGame = [];
      for (var i = length; i < length + 10; i++) {
        NoGame.push(i);
      }
      var NoPage = Math.ceil(NoGame.length / 4);
      if (NoPage > 1) {
        $(".wrapperContainer .game").append(`<div class="pageNum d-flex flex-wrap justify-content-center my-3" id="topPageNum">
        <button class="pre rounded-left"><i class="fas fa-angle-left"></i></button></div>`);
        for (var i = 1; i <= NoPage; i++) {
          $(".wrapperContainer .game #topPageNum").append(`<button class="pageN pageN` + (i - 1) + `">` + i + `</button>`);
        }
        $(".wrapperContainer .game #topPageNum").append(`<button class="next rounded-right"><i class="fas fa-angle-right"></i></button>`);
      }
      for (var i = 0; i < NoPage; i++) {
        $(".wrapperContainer .game").append(`<div class="allGame" id="allGame` + i + `"></div>`);
        if (NoPage == i + 1) {
          for (var j = i * 4; j < NoGame.length; j = j + 2) {
            if (j > NoGame.length - 2) {
              $(".wrapperContainer .game #allGame" + i).append(
                `<div class="gameMobile row pb-2">
                  <div class="col-sm-6">
                    <img src="`+ rs[NoGame[j]].image + `" class="d-block w-50 rounded-lg float-left mr-3" alt="` + rs[NoGame[j]].name + `">
                    <p class="px-2 m-0">`+ rs[NoGame[j]].name + `</p>
                    <p class="px-2 m-0 text-muted">RAM: `+ rs[NoGame[j]].ram + `GB</p>
                  </div>
                </div>`);
            }
            else {
              $(".wrapperContainer .game #allGame" + i).append(
                `<div class="gameMobile row pb-2">
                  <div class="col-sm-6">
                    <img src="`+ rs[NoGame[j]].image + `" class="d-block w-50 rounded-lg float-left mr-3" alt="` + rs[NoGame[j]].name + `">
                    <p class="px-2 m-0">`+ rs[NoGame[j]].name + `</p>
                    <p class="px-2 m-0 text-muted">RAM: `+ rs[NoGame[j]].ram + `GB</p>
                  </div>
                  <div class="col-sm-6">
                    <img src="`+ rs[NoGame[j + 1]].image + `" class="d-block w-50 rounded-lg float-left mr-3" alt="` + rs[NoGame[j + 1]].name + `">
                    <p class="px-2 m-0">`+ rs[NoGame[j + 1]].name + `</p>
                    <p class="px-2 m-0 text-muted">RAM: `+ rs[NoGame[j + 1]].ram + `GB</p>
                  </div>
                </div>`);
            }
          }
        }
        else {
          for (var j = i * 4; j < (i + 1) * 4; j = j + 2) {
            $(".wrapperContainer .game #allGame" + i).append(
              `<div class="gameMobile row pb-2">
                <div class="col-sm-6">
                  <img src="`+ rs[NoGame[j]].image + `" class="d-block w-50 rounded-lg float-left mr-3" alt="` + rs[NoGame[j]].name + `">
                  <p class="px-2 m-0">`+ rs[NoGame[j]].name + `</p>
                  <p class="px-2 m-0 text-muted">RAM: `+ rs[NoGame[j]].ram + `GB</p>
                </div>
                <div class="col-sm-6">
                  <img src="`+ rs[NoGame[j + 1]].image + `" class="d-block w-50 rounded-lg float-left mr-3" alt="` + rs[NoGame[j + 1]].name + `">
                  <p class="px-2 m-0">`+ rs[NoGame[j + 1]].name + `</p>
                  <p class="px-2 m-0 text-muted">RAM: `+ rs[NoGame[j + 1]].ram + `GB</p>
                </div>
              </div>`);
          }
        }
      }
      $("#allGame0").addClass("Gactive");
      if (NoPage > 1) {
        $(".wrapperContainer .game").append(`<div class="pageNum d-flex flex-wrap justify-content-center my-3" id="bottomPageNum">
        <button class="pre rounded-left"><i class="fas fa-angle-left"></i></button></div>`);
        for (var i = 1; i <= NoPage; i++) {
          $(".wrapperContainer .game #bottomPageNum").append(`<button class="pageN pageN` + (i - 1) + `">` + i + `</button>`);
        }
        $(".wrapperContainer .game #bottomPageNum").append(`<button class="next rounded-right"><i class="fas fa-angle-right"></i></button>`);
      }
      $(".pageN0").addClass("active");
    });
  }
  if ($("body").children().attr("id") == "AndroidMain") {
    getPhoneGame(79);
  }
  else {
    getPhoneGame(89);
  }
});