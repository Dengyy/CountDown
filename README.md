# CountDown
A count down component for React

## Development
The environment is based on a React cli. The `CountDownBtn.js` file is in the `\client\components\CountDownBtn.js` path.

### Requirements

  * Node >= v5

  * NPM >= v3

  * Webpack v2

## Usage

```shell
npm install
npm run dev
```
Import `CountDownBtn` to your file:
```Javascript
// ES6 mudule
import CountDownBtn from '@/components/CountDownBtn';
```

Then use it:
```html
<CountDownBtn {...config}></CountDownBtn>
```

## Example
Visit [this page](https://dengyy.github.io/CountDown/dist/index.html).

## API
| Option        | Description                                 | Value    | Default          |
|---------------|---------------------------------------------|----------|------------------|
| initText      | button's initial text                       | String   | '点击开始倒计时' |
| countDownText | button's text when counting down, `{n}` is the word that will replaced by counting down seconds | String   | '{n}s后可再次发送'  |
| totalTime     | count down total seconds                    | Number   | 20              |
| disabled      | if `true`, the button can't be clicked      | Boolean  |                 |