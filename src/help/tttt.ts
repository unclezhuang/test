import { ethers, Contract } from "ethers";
import { FTcontract, SkinMarketcontract, SaveFilecontract } from './contract'
export let provider: any;

// 检查是否安装了 Metamask
if (typeof window.ethereum !== "undefined") {
    try {
        // 创建 Web3Provider 对象
        provider = new ethers.BrowserProvider(window.ethereum)
        provider.pollingInterval = 1000000; // 设置以太坊节点轮询间隔
        provider._getENSAddress = function () { } // 禁用ENS
        console.log("Web3Provider successfully created:", provider);
        // 执行您的应用程序逻辑...
    } catch (err) {
        console.error("Failed to create Web3Provider:", err);
    }
} else {
    console.error("Metamask not detected!");
}

export async function test() {
    const signer = await provider.getSigner();
    const FTcontractt = FTcontract(signer)
    const SaveFilecontractt = SaveFilecontract(signer)
    const SaveFilecontractAddress = await SaveFilecontractt.getAddress()
    // console.log("SaceFilecontractAddress：：：",SaveFilecontractAddress)
    await FTcontractt.approve(SaveFilecontractAddress, '10000000000000000000000000')
    const all =  await FTcontractt.allowance(signer.address, SaveFilecontractAddress)
    console.log("授权::::", all.toString())
}
// const SkinMarketcontractt = SkinMarketcontract(signer)

// import axios from 'axios'
// const getData = () => {
//     return axios.get('../../src/help/ceshi.json')
//       .then((response) => {
//         return response.data
//       })
//   }

// export async function test() {
//     const transAddr = await getData()
//     for(let i =0; i < transAddr.length;i++){
//         await SkinMarketcontractt.setPrice(transAddr[i].address,transAddr[i].id,transAddr[i].price)
//         console.log("地址"+transAddr[i].address);
//         console.log("价格",transAddr[i].price)
//         console.log("id",transAddr[i].id)
//     }
// }


