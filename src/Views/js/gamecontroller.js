// Bắt đầu trò chơi
function startGame() {
    unityInstance = UnityLoader.instantiate("unityContainer", "Build/DungDeRacRoi_TrashFall.loader.js", {onProgress: UnityProgress});
}

// Dừng trò chơi
function stopGame() {
    unityInstance.Quit();
}