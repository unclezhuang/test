import { ethers } from "ethers";
import { ref } from "vue";
export let provider:any;
const url = ref("http://localhost:8545");
// 检查是否安装了 Metamask
if (typeof window.ethereum !== "undefined") {
    try {
        // 创建 Web3Provider 对象
        provider = new ethers.JsonRpcProvider(url.value);
        console.log("Web3Provider successfully created:", provider);
        const signer = await provider.getSigner();
        console.log("签名:   ", signer);
        // 执行您的应用程序逻辑...
    } catch (err) {
        console.error("Failed to create Web3Provider:", err);
    }
} else {
    console.error("Metamask not detected!");
}
export const blockNumber = await provider.getBlockNumber();

