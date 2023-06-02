import { Contract } from "ethers";
import SkinMarket from '../../contracts/abi/SkinMarket.json'
import Skin from '../../contracts/abi/Skin.json'
import SaveFile from '../../contracts/abi/SaveFile.json'
import ft from '../../contracts/abi/FT.json'
import { getCookie }  from './cookie.ts'
import { ethers } from 'ethers'

export function FTcontract(signer) {
    const FTcontract = new Contract("0x2174fcdBa37b182d2958EF2e3b33438F273Ef950", ft, signer)
    return FTcontract;
}
export function SaveFilecontract(signer) {
    const SaveFilecontract = new Contract("0x450f83DeC24D96C79Be18703b7B47fEb818c747A", SaveFile, signer)
    return SaveFilecontract;
}
export function Skincontract(signer) {
    const Skincontract = new Contract("0x5db8Ba3c2658A7FF35929fa2Ee3e0a732B0B7778", Skin, signer)
    return Skincontract;
}
export function SkinMarketcontract(signer) {
    const SkinMarketcontract = new Contract("0xA613dfa1C9fC1b53102cc3015A33170146d2877D", SkinMarket, signer)
    return SkinMarketcontract;
}
export async function getSigner() {
    let provider: any;
    if (typeof window.ethereum !== "undefined") {
        try {
            // 创建 Web3Provider 对象
            provider = new ethers.BrowserProvider(window.ethereum);
            provider.pollingInterval = 1000000; // 设置以太坊节点轮询间隔
            provider._getENSAddress = function () { }; // 禁用ENS
            console.log("Web3Provider successfully created:", provider);
            // 执行您的应用程序逻辑...
        } catch (err) {
            console.error("Failed to create Web3Provider:", err);
        }
    } else {
        console.error("Metamask not detected!");
    }
    const signer = await provider.getSigner();
    return signer
}
