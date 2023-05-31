import { ethers, Contract } from "ethers";
import { ref } from "vue";
import SkinMarketBy from '../../contracts/byte/SkinMarketby.json'
import SkinMarket from '../../contracts/abi/SkinMarket.json'
import SkinBy from '../../contracts/byte/Skin.json'
import Skin from '../../contracts/abi/Skin.json'
import SaveFileBy from '../../contracts/byte/SaveFile.json'
import SaveFile from '../../contracts/abi/SaveFile.json'
import ftBy from '../../contracts/byte/FTby.json'
import ft from '../../contracts/abi/FT.json'
export let provider: any;
const url = ref('http://localhost:8545')
console.log("这是直接输出", SkinMarket)

// 检查是否安装了 Metamask
if (typeof window.ethereum !== "undefined") {
    try {
        // 创建 Web3Provider 对象
        provider = new ethers.JsonRpcProvider(url.value);
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
const signer = await provider.getSigner();
export const blockNumber = await provider.getBlockNumber();
const FTfactory = new ethers.ContractFactory(ft,  ftBy.code, signer);
const SaveFilefactory = new ethers.ContractFactory(SaveFile,  SaveFileBy.code, signer);
const Skinfactory = new ethers.ContractFactory(Skin,  SkinBy.code, signer);
const SkinMarketfactory = new ethers.ContractFactory(SkinMarket,  SkinMarketBy.code, signer);
export const FTcontract = await FTfactory.deploy("cxlt","CX");
const FTAddress = await FTcontract.getAddress()
console.log("ft的地址：",FTAddress)
export const SaveFilecontract = await SaveFilefactory.deploy(FTAddress);
const SaveFilecontractAddress = await SaveFilecontract.getAddress()
console.log("SaveFile的地址::::",SaveFilecontractAddress)
export const Skincontract = await Skinfactory.deploy();
console.log()
export const SkinMarketcontract = await SkinMarketfactory.deploy();

