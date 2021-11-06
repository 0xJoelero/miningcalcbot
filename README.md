# MiningCalcBot
@miningcalcbot is a Telegram bot to calculate the ROI of investments in gpus to mining Ethereum. You can choose the GPU and insert the cost, and the bot will response you the MHs and ROI of that GPU.

To use the bot on Telegram, search for @miningcalcbot.

## SETUP
1. Copy content from `environment.example.js` and replace with your `TELEGRAM_TOKEN` and `ETHERSCAN_API_KEY`
2. On the console run `$ yarn` to install dependencies
3. Run `$ yarn add nodemon --dev`
4. To run the project use `yarn dev` or `nodemon --exec babel-node index.js`
5. To use the bot configure your bot with the `TELEGRAM_TOKEN` and follow the /start instructions


## TODO:
- [x] Write the About and How to run in the README
- [ ] Add electric energy cost to `calculateRevenue` function
- [x] Add more GPUs support
- [x] Deploy bot on cloud services like AWS or GCloud
- [x] `calculateRevenue` should return ETH revenue
- [x] `calculateRevenue` should return USD revenue
- [x] Add Spanish support
- [x] Remove translations from index and add translation constants
- [x] Remove Telegram constants from `index.js`
- [x] `getReward()` from `api.js` should request full coins info and filter only ETH
- [x] Handle API errors and throttling
