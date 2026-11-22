const startButton = document.getElementById("startButton");
const statusText = document.getElementById("status");

startButton.addEventListener("click", startSensor);

async function startSensor() {
    try {
        // Device Orientation APIが利用可能か確認
        if (typeof DeviceOrientationEvent === "undefined") {
            statusText.textContent = "センサーAPIを利用できません";
            return;
        }

        // 必要に応じてセンサーの利用許可を要求
        if (typeof DeviceOrientationEvent.requestPermission === "function") {
            const permission =
                await DeviceOrientationEvent.requestPermission();

            if (permission !== "granted") {
                statusText.textContent =
                    "センサーの利用が許可されませんでした";
                return;
            }
        }

        // センサーイベントを登録
        window.addEventListener(
            "deviceorientation",
            showOrientation
        );

        statusText.textContent = "センサー情報を取得しています";

        // 重複登録を防ぐためボタンを無効化
        startButton.disabled = true;

    } catch (error) {
        statusText.textContent =
            `センサーの開始に失敗しました：${error.name}：${error.message}`;
        console.error(error);
    }
}
