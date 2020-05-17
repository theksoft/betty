import Routes from "@/router/base/navigation.routes.js";

("use strict");

/* TODO: Give credits to image maker
  <a href="https://www.vecteezy.com/free-vector/ancient-map">Ancient Map Vectors by Vecteezy</a>
*/

export default new Routes({
  rootPath: "/games",
  rootName: "Games",
  idName: "Game",
  storeName: "games",
  icon: "$games",
  image: "game-package.png",
  appBar: "GamesAppBar",
  title: "Betty/Boardgame designer"
});
