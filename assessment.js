'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供をすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllchildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        return;
    }

    //診断結果表示エリアの作成
    removeAllchildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result =assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    // // TODO ツイートエリアの作成
    removeAllchildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたにおすすめのPC') + '&ref_src=twsec&5Etfw'
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', '診断結果の文章')
    anchor.innerText = 'Tweet #あなたにおすすめのPC'

    tweetDivided.appendChild(anchor);
    
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};
userNameInput.onkeydown = event => {
    assessmentButton.onclick();
};
const answers = [ //TODO 項目を追加する
    'RTX3060',
    'RTX3060 Ti',
    'RTX3070',
    'RTX3070 Ti',
    'RTX3080',
    'RTX3080 Ti',
    'RTX3090',
    'RTX2060',
    'RTX2060 SUPER',
    'RTX2070',
    'RTX2070 SUPER',
    'RTX2080',
    'RTX2080 SUPER',
    'RTX2080 Ti',
    'TITAN RTX',
    'GTX',
    'GTX',
    'RTX',
    'RTX',
    'RTX'
];
/**名前の文字列を渡すと診断結果を返す関数
*@param {string} userName ユーザーの名前
*@return {string} 診断結果
*/
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
}

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replaceAll('{userName}', userName);
    return result;
}
//test
console.assert(
    assessment('太郎') === assessment('太郎'),'error'
);