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
export async function getsigner() {
    const signer = await provider.getSigner();
    const address = signer.address;
    console.log("jfjaifjajfaf",address);
    return address;
}
const signer = await provider.getSigner();
// console.log("签名：：：",signer);
// const Skinfactory = new ethers.ContractFactory(Skin,  SkinBy.code, signer);
// export const Skincontract = await Skinfactory.deploy("https://img0.baidu.com/it/u=3569732215,468234533&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500");
// export const SkincontractAddress = await Skincontract.getAddress()
// console.log("上架的皮肤合约",SkincontractAddress)
// export  const SaveFilecontract = new Contract("0x41Ac4058bbd72221D7bdE3e107183643857A5322",SaveFile,signer);
// export const SkincontractAddress = await SaveFilecontract.getAddress();
// console.log("尝试连接合约地址",SkincontractAddress);
//  const address = signer.address;
// export const addWhiteList = await SaveFilecontract.getUserInfo(address)
//  console.log("tianjiachenggong",addWhiteList)
//  const addWhiteListHash = addWhiteList.hash;
// console.log("Transaction Hash: ", addWhiteList.hash);

//  const addWhiteListReceipt = await provider.getTransactionReceipt(addWhiteListHash);
// console.log("合约这算查了成",addWhiteListReceipt);

   export async function getcontract(signer){
   
    
    const SaveFilecontract = new Contract("0x41Ac4058bbd72221D7bdE3e107183643857A5322",SaveFile,signer);
    
    return
    SaveFilecontract
    
}
    // export default contract;
    
