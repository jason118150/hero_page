## 執行步驟
1. npm install
2. npm start
3. 將網址改成 localhost:3000/heroes 會看到英雄列表

## 專案架構
1. index.js 是 router
2. folder page      底下放 page component，router直接call的component會放在這裡
3. folder component 底下放 共用的component
4. folder store     底下放 redux 相關包含 reducer, action
5. folder style     底下放 global style 包含 reset.css, normal.css, 或未來如果針對專案有 override design 也放在這裡

## Web架構
1. 在list頁把資料抓下來後儲存在localStorage, 供detail頁面直接讀取
（儲存在store裡面重新整理資料會不見，也可以存在sessionStorage，壞處是如果使用者關掉頁面，下次再打開detail頁面會沒有資料）
2. list頁跟detail頁只共用了heroCard component，沒有共用list component，因為過去經驗list頁面的資料跟detail頁面的資料會有所區隔，未來要處理這部分不需要再拆開

## 第三方library
1. redux，只用在loading的部分，其實也可以在每個page component分別handle loading，只是當頁面越來越多放在store裡面就不需要再宣告新的參數了

## 寫註解的原則
1. 只寫商業邏輯

## 遇到的困難
1. 沒注意到patch api的response只有OK，我一開始寫了response => response.json()，一直報錯我以為是輸入錯了找了一下
