import _ from "lodash";
// updated 03.02.20

class NewGame {
  constructor() {
    console.log("new Game was created ");
  }

  getFirstValue() {
    var allGames = [];

    var st;
    var level;
    var gameObj;
    let id;



    id = 11; //
    level = "hard";
    st =
      "8;;;;;5;1;;;;;;;1;;;9;;;;2;;;7;4;;;;9;;;;;;8;4;;4;8;;3;;9;7;;2;5;;;;;;1;;;;6;2;;;5;;;;2;;;7;;;;;;;4;3;;;;;7;";
    gameObj = { id: id, str: st, level: level };
    allGames.push(gameObj);

    id = 10; //
    level = "hard";
    st =
      "3;;;7;9;;5;2;;1;;;;;2;;;4;8;;;3;;;;;;;1;;9;;;2;;3;4;;;;3;;;;1;9;;7;;;4;;5;;;;;;;8;;;2;2;;;6;;;;;5;;8;1;;2;3;;;7;";
    gameObj = { id: id, str: st, level: level };
    allGames.push(gameObj);

    id = 9; //
    level = "hard";
    st =
      ";;;;;;3;8;;;;;8;;2;;5;6;;;;;6;;7;;2;9;4;8;;;;;;;;2;5;9;3;7;8;4;;;;;;;;2;6;9;5;;9;;1;;;;;4;1;;6;;3;;;;;6;2;;;;;;;";
    gameObj = { id: id, str: st, level: level };
    allGames.push(gameObj);



    id = 8; //
    level = "medium";
    st =
      "6;;9;;;;2;;;;;;;;3;7;;;;;2;;6;4;;;3;;;5;;;;;;8;2;7;;;;8;6;;;8;;;;;2;;;;;;;9;;;;;5;;;;3;;;;;7;;4;7;;;5;9;;;";
    gameObj = { id: id, str: st, level: level };
    allGames.push(gameObj);




    id = 7; //
    level = "medium";
    st =
      ";;;;2;3;;;;;5;6;;;4;;1;2;;3;7;;;;;;5;;;2;;;;;6;;1;8;;;;;;9;7;;9;;;;;2;;;4;;;;;;8;3;;7;2;;3;;;6;5;;;;;6;9;;;;;";
    gameObj = { id: id, str: st, level: level };
    allGames.push(gameObj);

 





    id = 2;

    st =
      ";;;;2;3;;;;;5;6;;;4;;1;2;;3;7;;;;;;5;;;2;;;;;6;;1;8;;;;;;9;7;;9;;;;;2;;;4;;;;;;8;3;;7;2;;3;;;6;5;;;;;6;9;;;;;";

    level = "easy";
    gameObj = { id: id, str: st, level: level };

    allGames.push(gameObj);

    // medium

    id = 3; //
    st =
      ";8;3;;;2;;1;;;;;;3;;;;4;;2;7;;;;;;8;;;5;;7;;;3;;;;;5;8;6;;;;;6;;;4;;1;;;9;;;;;;5;7;;3;;;;1;;;;;;7;;6;;;4;9;;";
    level = "medium";
    gameObj = { id: id, str: st, level: level };

    allGames.push(gameObj);

    // hard
    id = 4; //

    st =
      ";;6;;;5;;;;1;9;;;;;;;;;;7;;1;2;;4;;3;7;;;9;1;;5;;8;;;;;;;;1;;1;;7;5;;;6;3;;4;;1;7;;6;;;;;;;;;;1;9;;;;5;;;8;;;";
    level = "hard";
    gameObj = { id: id, str: st, level: level };

    allGames.push(gameObj);

    id = 5;

    st =
      "4;;;;9;;;7;;;;;2;;6;9;;;;;;;;7;;;2;3;8;;9;;;;;1;;2;4;;;;6;3;;9;;;;;3;;5;4;8;;;4;;;;;;;;1;6;;8;;;;;9;;;7;;;;5;";
    level = "easy";
    gameObj = { id: id, str: st, level: level };

    allGames.push(gameObj);





    id = 1; //
    level = "hard";
    st =
      "6;3;;;;;;;;7;;4;;;5;;;;;1;5;;4;;;;6;5;;7;;;8;;;;;8;;;2;;;1;;;;;5;;;3;;7;4;;;;6;;1;7;;;;;9;;;2;;5;;;;;;;;4;3;";
    gameObj = { id: id, str: st, level: level };
    allGames.push(gameObj);
    /* ---------- -------- */


 

        /*--------------- */
        id = 15; //
        level = "hard";
        st =
          ";;;;2;;;7;;;;;;3;4;;;;3;5;8;;;;;;;5;;4;8;;;;;;;;;1;;;;8;9;;;2;;;;;;6;2;4;;;;;7;;;;9;;;;5;2;;;;;;;6;7;1;;;";
        gameObj = { id: id, str: st, level: level };
        allGames.push(gameObj);
        /* ---------- -------- */


        id = 6;
        st =
          "9;8;1;;;6;4;5;;;;;4;;;1;;7;;;;;;;;;;;;;;2;;;4;;1;;9;;;;2;;3;;3;;;1;;;;;;;;;;;7;;;6;;3;;;5;;;;;1;8;9;;;5;2;6;";
        level = "hard";
    
        gameObj = { id: id, str: st, level: level };




    allGames.push(gameObj);

    return _.sample(allGames);
  }
}

export default NewGame;
