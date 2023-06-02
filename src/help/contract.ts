import { Contract } from "ethers";
import SkinMarket from '../../contracts/abi/SkinMarket.json'
import Skin from '../../contracts/abi/Skin.json'
import SaveFile from '../../contracts/abi/SaveFile.json'
import ft from '../../contracts/abi/FT.json'

export function  FTcontract(signer){
    const FTcontract = new Contract("0x2174fcdBa37b182d2958EF2e3b33438F273Ef950",ft,signer)
    return FTcontract;
    }
export function  SaveFilecontract(signer){
    const SaveFilecontract = new Contract("0x41Ac4058bbd72221D7bdE3e107183643857A5322",SaveFile,signer)
    return SaveFilecontract;
    }
export function  Skincontract(signer){
    const Skincontract = new Contract("0x5db8Ba3c2658A7FF35929fa2Ee3e0a732B0B7778",Skin,signer)
    return Skincontract;
    }
export function  SkinMarketcontract(signer){
    const SkinMarketcontract = new Contract("0xA613dfa1C9fC1b53102cc3015A33170146d2877D",SkinMarket,signer)
    return SkinMarketcontract;
    }