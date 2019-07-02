$(document).ready(function(){
  function getTypeGame(){
    var typeInfo = JSON.parse(sessionStorage.getItem("typeInfo"));
    $.ajax({
      url: 'https://5cee82c31c2baf00142cbffb.mockapi.io/gameData',
      type: 'GET',
    }).done(function(rs) {
      var NoGame = [];
      for(var i=0; i<79; i++){
        if(rs[i].type == typeInfo){
          NoGame.push(i);
        }
      }
      var NoPage = Math.ceil(NoGame.length/12);
      $(".wrapperContainer .game").append(`<div class="noGame bg-warning text-light p-2 rounded-lg mb-3">`+ typeInfo +`</div>`);
      if(NoPage > 1){
        $(".wrapperContainer .game").append(`<div class="pageNum d-flex flex-wrap justify-content-center my-3" id="topPageNum">
        <button class="pre rounded-left"><i class="fas fa-angle-left"></i></button></div>`);
        for(var i=1; i<=NoPage; i++){
          $(".wrapperContainer .game #topPageNum").append(`<button class="pageN pageN`+ (i-1) +`">`+ i +`</button>`);
        }
        $(".wrapperContainer .game #topPageNum").append(`<button class="next rounded-right"><i class="fas fa-angle-right"></i></button>`);
      }
      for(var i=0; i<NoPage; i++){
        $(".wrapperContainer .game").append(`<div class="allGame" id="allGame`+ i +`"></div>`);
        if(NoPage == i+1){
          for(var j=i*12; j<NoGame.length; j=j+3){
            if(j > NoGame.length-3){
              if(j == NoGame.length-1){
                $(".wrapperContainer .game #allGame"+ i).append(
                `<div class="game-list row pb-2">
                  <div class="col-sm-4">
                    <img src="`+ rs[NoGame[j]].image +`" class="d-block w-100 rounded-lg" alt="`+ rs[NoGame[j]].name +`">
                  </div>
                </div>`);
              }
              else if(j == NoGame.length-2){
                $(".wrapperContainer .game #allGame"+ i).append(
                `<div class="game-list row pb-2">
                  <div class="col-sm-4">
                    <img src="`+ rs[NoGame[j]].image +`" class="d-block w-100 rounded-lg" alt="`+ rs[NoGame[j]].name +`">
                  </div>
                  <div class="col-sm-4">
                    <img src="`+ rs[NoGame[j+1]].image +`" class="d-block w-100 rounded-lg" alt="`+ rs[NoGame[j+1]].name +`">
                  </div>
                </div>`);
              }
            }
            else {
              $(".wrapperContainer .game #allGame"+ i).append(
              `<div class="game-list row pb-2">
                <div class="col-sm-4">
                  <img src="`+ rs[NoGame[j]].image +`" class="d-block w-100 rounded-lg" alt="`+ rs[NoGame[j]].name +`">
                </div>
                <div class="col-sm-4">
                  <img src="`+ rs[NoGame[j+1]].image +`" class="d-block w-100 rounded-lg" alt="`+ rs[NoGame[j+1]].name +`">
                </div>
                <div class="col-sm-4">
                  <img src="`+ rs[NoGame[j+2]].image +`" class="d-block w-100 rounded-lg" alt="`+ rs[NoGame[j+2]].name +`">
                </div>
              </div>`);
            }
          }
        }
        else {
          for(var j=i*12; j<(i+1)*12; j=j+3){
            $(".wrapperContainer .game #allGame"+ i).append(
            `<div class="game-list row pb-2">
              <div class="col-sm-4">
                <img src="`+ rs[NoGame[j]].image +`" class="d-block w-100 rounded-lg" alt="`+ rs[NoGame[j]].name +`">
              </div>
              <div class="col-sm-4">
                <img src="`+ rs[NoGame[j+1]].image +`" class="d-block w-100 rounded-lg" alt="`+ rs[NoGame[j+1]].name +`">
              </div>
              <div class="col-sm-4">
                <img src="`+ rs[NoGame[j+2]].image +`" class="d-block w-100 rounded-lg" alt="`+ rs[NoGame[j+2]].name +`">
              </div>
            </div>`);
          }
        }
      }
      $("#allGame0").addClass("Gactive");
      if(NoPage > 1){
        $(".wrapperContainer .game").append(`<div class="pageNum d-flex flex-wrap justify-content-center my-3" id="bottomPageNum">
        <button class="pre rounded-left"><i class="fas fa-angle-left"></i></button></div>`);
        for(var i=1; i<=NoPage; i++){
          $(".wrapperContainer .game #bottomPageNum").append(`<button class="pageN pageN`+ (i-1) +`">`+ i +`</button>`);
        }
        $(".wrapperContainer .game #bottomPageNum").append(`<button class="next rounded-right"><i class="fas fa-angle-right"></i></button>`);
      }
      $(".pageN0").addClass("active");
    });
  }
  getTypeGame();
});