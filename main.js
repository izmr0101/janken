'use strict'; 

(() => {
    const HAND_FORMS = [   // 手の形の指定
        0, 
        1,
        2
    ];

    const HAND_X = [ // 画像の中の区切り位置
        0, // ぐー
        380, // ちょき
        730　// ぱー
    ];

    const HAND_WIDTH = [
        360,
        340,
        430
    ];

    const IMAGE_PATH = './images/sprite.png';

    const FPS = 10; // 1秒間に10回手の画像が切り替わる

    let isPause = false; // ocClick関数が実行されるとtrueに変わり、loop関数内の条件を満たさなくなる

    let currentFrame = 0;

    // アニメーション開始させる

    function main() {
        const canvas = document.getElementById('screen'); // 描画場所を取得
        const context = canvas.getContext('2d'); // 描画内容を指定
        const imageObj = new Image(); // ？
        currentFrame = 0;

        imageObj.onload = function() {
            function loop(){
                if (!isPause) {
                    draw(canvas, context, imageObj,  currentFrame++);
                }
                setTimeout(loop, 1000 / FPS);
            }
            loop();
        };
        imageObj.src = IMAGE_PATH;
    }

    function draw(canvas, context, imageObj, frame) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        const handIndex = frame % HAND_FORMS.length;
        const sx = HAND_X[handIndex];
        const swidth = HAND_WIDTH[handIndex];

        context.drawImage(
            imageObj,
            sx,
            0,
            swidth,
            imageObj.height,
            0,
            0,
            swidth,
            canvas.height
        );
    }

    function setButtonAction() {
        const rock = document.getElementById('rock');
        const scissors = document.getElementById('scissors');
        const paper = document.getElementById('paper');
        const restart = document.getElementById('restart');

        function onClick(event) {
            const myHandType = parseInt(event.target.value, 10);
            const enemyHandType = parseInt(currentFrame % HAND_FORMS.length, 10);

            isPause = true;

            judge(myHandType, enemyHandType);
        }

        rock.addEventListener('click', onClick);
        scissors.addEventListener('click', onClick);
        paper.addEventListener('click', onClick);

        restart.addEventListener('click', function() {
            window.location.reload();
        });
    }

    function judge(myHandType, enemyHandType) {

        const result = (myHandType - Math.abs(enemyHandType) + 3) % HAND_FORMS.length;
        
        if (result === 0) {
            alert('あいこ！もう一回！');
        } else if (result === 1) {
            alert('君の負け！');
        } else {
            alert('君の勝ち。');
        }
    }
    setButtonAction();
    main();
})();