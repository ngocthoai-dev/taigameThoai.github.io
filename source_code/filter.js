$(document).ready(function(){
  function getFilterGame(){
    var filterInfo = JSON.parse(sessionStorage.getItem("filterInfo"));
    $.ajax({
      url: 'https://5cee82c31c2baf00142cbffb.mockapi.io/gameData',
      type: 'GET',
    }).done(function(rs) {
      var NoGame = [];
      for(var i=0; i<79; i++){
        if(filterInfo[5] == null){
          if(rs[i].year>=filterInfo[0] && rs[i].year<=filterInfo[1]
          && rs[i].memory>filterInfo[2] && rs[i].memory<filterInfo[3]
          && rs[i].ram<=filterInfo[4]){
            if(NoGame.length === 0){
              NoGame.push(i);
            }
            else{
              var diff = true;
              for(var j=0; j<NoGame.length; j++){
                if(rs[NoGame[j]].name == rs[i].name){
                  diff = false;
                  break;
                }
              }
              if(diff == true){
                NoGame.push(i);
              }
            }
          }          
        }
        else if(rs[i].year>=filterInfo[0] && rs[i].year<=filterInfo[1]
        && rs[i].memory>filterInfo[2] && rs[i].memory<filterInfo[3]
        && rs[i].ram<=filterInfo[4] && rs[i].type==filterInfo[5]){
          if(NoGame.length === 0){
            NoGame.push(i);
          }
          else{
            var diff = true;
            for(var j=0; j<NoGame.length; j++){
              if(rs[NoGame[j]].name == rs[i].name){
                diff = false;
                break;
              }
            }
            if(diff == true){
              NoGame.push(i);
            }
          }
        }
      }
      $(".wrapperContainer .game .noGame").append(` `+ NoGame.length +` games phù hợp với điều kiện của bạn!`);
      var NoPage = Math.ceil(NoGame.length/12);
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
  getFilterGame();
});