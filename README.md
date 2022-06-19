# PiggyPal Login & SignUp
裡面已經寫好login和signup，其他頁面的框架也有了。
### 1.Initialize setting
    npm i
### 2. Setting config.js
config.js裡的資料被我拿掉了，要連到database前記得補上。
### 3. 進行打包
用parcel打包
```
./node_modules/.bin/parcel watch ./parcel/signup.pug --public-url ./
```
與server連線
```
node ser.js
```
### 4. Check
幫我檢查看看有沒有問題，有問題再告訴我