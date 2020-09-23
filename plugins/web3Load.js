// import { ethers } from 'ethers'
export default async (context, inject) => {
  // const hello = (msg) => console.log(`Hello ${msg}!`)
  // Inject $hello(msg) in Vue, context and store.
  // inject('hello', hello)
  // For Nuxt <= 2.12, also add 👇
  // context.$hello = hello
  // console.log('PLUGIN: web3load', context)
  // console.log('PLUGIN: process.env', process.env)

  const network = 'rinkeby'
  console.log('PLUGIN: process.env.WEB3_NETWORK', process.env.WEB3_NETWORK)

  // const provider = new ethers.getDefaultProvider(network, {
  //   // etherscan: YOUR_ETHERSCAN_API_KEY,
  //   infura: '46aac655d58d4fc198a43792d193fd70',
  //   // alchemy: YOUR_ALCHEMY_API_KEY
  // })
  // if (provider) {
  //   console.log('PLUGIN: ethers provider exists')
  // }
  // console.log('PLUGIN: provider', provider)
  // const signer = provider.getSigner()

  // const httpEndpoint = 'http://127.0.0.1:8545'
  // const web3 = new Web3(new Web3.providers.HttpProvider(httpEndpoint))
  // console.log('web3', web3)
  // inject('web3', web3)
}
// export default async function(context, inject) {
//     const httpEndpoint = "http://127.0.0.1:8545"
//     const web3 = new Web3(new Web3.providers.HttpProvider(httpEndpoint))

//     inject('web3',web3)
// }
