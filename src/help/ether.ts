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

// 检查是否安装了 Metamask
if (typeof window.ethereum !== "undefined") {
    try {
        // 创建 Web3Provider 对象
        provider = new ethers.BrowserProvider(window.ethereum)
        provider._getENSAddress = function () { } // 禁用ENS
        provider.pollingInterval = 1000000; // 设置以太坊节点轮询间隔
        
        console.log("Web3Provider successfully created:", provider);
        // 执行您的应用程序逻辑...
    } catch (err) {
        console.error("Failed to create Web3Provider:", err);
    }
} else {
    console.error("Metamask not detected!");
}

const signer = await provider.getSigner();
console.log("签名：：：",signer)
export const blockNumber = await provider.getBlockNumber();
console.log(blockNumber)
const FTfactory = new ethers.ContractFactory(ft,  ftBy.code, signer);
console.log(1)
const SaveFilefactory = new ethers.ContractFactory(SaveFile,  SaveFileBy.code, signer);
console.log(1)
const Skinfactory = new ethers.ContractFactory(Skin,  SkinBy.code, signer);
const SkinMarketfactory = new ethers.ContractFactory(SkinMarket,  SkinMarketBy.code, signer);
console.log(1)
export const FTcontract = await FTfactory.deploy("cxlt","CX");
console.log(1)
const FTAddress = await FTcontract.getAddress()
console.log("ft的地址：",FTAddress)
export const SaveFilecontract = await SaveFilefactory.deploy(FTAddress,signer.address);
const SaveFilecontractAddress = await SaveFilecontract.getAddress()
console.log("SaveFile的地址::::",SaveFilecontractAddress)
export const SkinMarketcontract = await SkinMarketfactory.deploy(FTAddress);
const SkinMarketcontractAddress = await SkinMarketcontract.getAddress()
console.log("SkinMarketcontract的地址::::",SkinMarketcontractAddress)
export const Skincontract111 = await Skinfactory.deploy("https://pic4.zhimg.com/80/v2-6989e63431a2f457d158acd800cfa3db_1440w.webp");
const Skincontract111Address = await Skincontract111.getAddress()
console.log("Skincontract111::::",Skincontract111Address)
export const Skincontract112 = await Skinfactory.deploy("https://pic1.zhimg.com/v2-235ab378ef0c0bd388ab7c92f3127240_r.jpg");
const Skincontract112Address = await Skincontract112.getAddress()
console.log("Skincontract112::::",Skincontract112Address)
export const Skincontract113 = await Skinfactory.deploy("https://pic2.zhimg.com/v2-8cb34ba26d2bb76584541136f9b0aad5_r.jpg");
const Skincontract113Address = await Skincontract113.getAddress()
console.log("Skincontract113::::",Skincontract113Address)
export const Skincontract1 = await Skinfactory.deploy("https://pic2.zhimg.com/80/v2-9c239cfd61d5665f4f3283d63fc2ced9_1440w.webp");
const Skincontract1Address = await Skincontract1.getAddress()
console.log("Skincontract1::::",Skincontract1Address)
export const Skincontract2 = await Skinfactory.deploy("https://pic1.zhimg.com/v2-f62fcb4665575b40c558e185ef906ab8_r.jpg");
const Skincontract2Address = await Skincontract2.getAddress()
console.log("Skincontract2::::",Skincontract2Address)
export const Skincontract3 = await Skinfactory.deploy("https://pic4.zhimg.com/v2-4ef19100b2f376d1b094417bdb07cab3_r.jpg");
const Skincontract3Address = await Skincontract3.getAddress()
console.log("Skincontract3::::",Skincontract3Address)
export const Skincontract4 = await Skinfactory.deploy("https://pic2.zhimg.com/v2-bbbf2f6012663cfbf3749e62d0269141_r.jpg");
const Skincontract4Address = await Skincontract4.getAddress()
console.log("Skincontract4::::",Skincontract4Address)
export const Skincontract5 = await Skinfactory.deploy("https://pic1.zhimg.com/v2-ec013c54a665bb6b38fb0390e2987b80_r.jpg");
const Skincontract5Address = await Skincontract5.getAddress()
console.log("Skincontract5::::",Skincontract5Address)
export const Skincontract6 = await Skinfactory.deploy("https://pic4.zhimg.com/v2-88d520a77351dbbf94eb591261a6e6d3_r.jpg");
const Skincontract6Address = await Skincontract6.getAddress()
console.log("Skincontract6::::",Skincontract6Address)
export const Skincontract7 = await Skinfactory.deploy("https://pic3.zhimg.com/v2-0cc7372362ff95755673557f87149f52_r.jpg");
const Skincontract7Address = await Skincontract7.getAddress()
console.log("Skincontract7::::",Skincontract7Address)
export const Skincontract8 = await Skinfactory.deploy("https://pic2.zhimg.com/v2-3950c56f4dc0a833bece39ec257f8401_r.jpg");
const Skincontract8Address = await Skincontract8.getAddress()
console.log("Skincontract8::::",Skincontract8Address)
export const Skincontract9 = await Skinfactory.deploy("https://pic3.zhimg.com/v2-1e8d062cccd193b461344ab5412277fa_r.jpg");
const Skincontract9Address = await Skincontract9.getAddress()
console.log("Skincontract9::::",Skincontract9Address)
export const Skincontract10 = await Skinfactory.deploy("https://pic1.zhimg.com/v2-45eb5749949e7f90a5c788f9bc5721ef_r.jpg?source=1940ef5c");
const Skincontract10Address = await Skincontract10.getAddress()
console.log("Skincontract10::::",Skincontract10Address)
export const Skincontract11 = await Skinfactory.deploy("https://pica.zhimg.com/v2-ce283e9c89e690a5b53921a62ddaadf9_r.jpg?source=1940ef5c");
const Skincontract11Address = await Skincontract11.getAddress()
console.log("Skincontract11::::",Skincontract11Address)
export const Skincontract12 = await Skinfactory.deploy("https://picx.zhimg.com/v2-6f4064b1e5f5be5d96b78dc22d326669_r.jpg?source=1940ef5c");
const Skincontract12Address = await Skincontract12.getAddress()
console.log("Skincontract12::::",Skincontract12Address)
export const Skincontract14 = await Skinfactory.deploy("https://picx.zhimg.com/v2-caa73a422e047beec1ee16d23c194688_r.jpg?source=1940ef5c");
const Skincontract14Address = await Skincontract14.getAddress()
console.log("Skincontract14::::",Skincontract14Address)
export const Skincontract15 = await Skinfactory.deploy("https://picx.zhimg.com/v2-5bfe7a4a8c35a2dcbfc9dfd356dc42a9_r.jpg?source=1940ef5c");
const Skincontract15Address = await Skincontract15.getAddress()
console.log("Skincontract15::::",Skincontract15Address)
export const Skincontract16 = await Skinfactory.deploy("https://pic1.zhimg.com/v2-1ceb361da223e6db0ccb3fc0c13eb499_r.jpg?source=1940ef5c");
const Skincontract16Address = await Skincontract16.getAddress()
console.log("Skincontract16::::",Skincontract16Address)
export const Skincontract17 = await Skinfactory.deploy("https://picx.zhimg.com/v2-aa48f30ee75fb8f3b84be95075404362_r.jpg?source=1940ef5c");
const Skincontract17Address = await Skincontract17.getAddress()
console.log("Skincontract17::::",Skincontract17Address)
export const Skincontract18 = await Skinfactory.deploy("https://p.qqan.com/up/2021-7/16257943983452527.jpg");
const Skincontract18Address = await Skincontract18.getAddress()
console.log("Skincontract18::::",Skincontract18Address)




