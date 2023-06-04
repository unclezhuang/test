import { Contract } from "ethers";
import SkinMarket from '../../contracts/abi/SkinMarket.json'
import Skin from '../../contracts/abi/Skin.json'
import SaveFile from '../../contracts/abi/SaveFile.json'
import ft from '../../contracts/abi/FT.json'
import { getCookie }  from './cookie.ts'
import { ethers } from 'ethers'

export function FTcontract(signer) {
    const FTcontract = new Contract("0xA70021BD50801E9b26e2B6becCAbe7069c500Ca4", ft, signer)
    return FTcontract;
}
export function SaveFilecontract(signer) {
    const SaveFilecontract = new Contract("0x70Fc24Cd616B8e7e8272C9e6feA551EbF22540d7", SaveFile, signer)
    return SaveFilecontract;
}
export function Skincontract(signer) {
    const Skincontract = new Contract("0x34D622e633F77B91c02C39C272658F833ac5E8d0", Skin, signer)
    return Skincontract;
}
export function SkinMarketcontract(signer) {
    const SkinMarketcontract = new Contract("0xa5C6bB8E0ea912be7613d3dd269ed104E0Edb0B3", SkinMarket, signer)
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
