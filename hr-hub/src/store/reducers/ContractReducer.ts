import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StoreNames } from "../config";

const initialState: contractState = {
    tabName: "CONTRACT",
    searchText: "",
    isNewNFT: false,
    contracts: [],
    filteredContracts: [],
    NFTs:[],
    contractDetails: {
        athlete_id: "",
        contract_abi: "",
        contract_address: "",
        contract_amount: "",
        description: "",
        file: null,
        name: "",
    },
    NFTdetails: {
        amount: "",
        description: "",
        file: null,
        name: "",
        smart_contract: "",
        token_id: "",
    },

    errorFetchingContractDetails: "",
    errorFetchingContracts: "",
    errorSavingData: "",
};

const contractSlice = createSlice({
    name: StoreNames.CONTRACT,
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState;
        },
        setTabName: (state, action: PayloadAction<"CONTRACT" | "NFT">) => {
            state.tabName = action.payload;
        },
        setSearchText: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;

            // todo: filter contracts
        },
        setContract:(state,action:PayloadAction<ContractDetails>)=>{
            state.contractDetails = action.payload
        },
        setAthleteId: (state, action: PayloadAction<string>) => {
            state.contractDetails.athlete_id = action.payload;
        },
        setContractAbi: (state, action: PayloadAction<string>) => {
            state.contractDetails.contract_abi = action.payload;
        },
        setContractAddress: (state, action: PayloadAction<string>) => {
            state.contractDetails.contract_address = action.payload;
        },
        setContractDescription: (state, action: PayloadAction<string>) => {
            state.contractDetails.description = action.payload;
        },
        setPlayerName: (state, action: PayloadAction<string>) => {
            state.contractDetails.name = action.payload;
        },
        setContractValue: (state, action: PayloadAction<string>) => {
            state.contractDetails.contract_amount = action.payload;
        },
        setContractImage: (state, action: PayloadAction<File | null>) => {
            state.contractDetails.file = action.payload;
        },
        
        setErrorFetchingContractDetails: (
            state,
            action: PayloadAction<string>
        ) => {
            state.errorFetchingContractDetails = action.payload;
        },
        setNFTAmount :(state, action: PayloadAction<string>)=>{
            state.NFTdetails.amount = action.payload
        },
        setNFTDescription :(state, action: PayloadAction<string>)=>{
            state.NFTdetails.description = action.payload
        },
        setNFTFile :(state, action: PayloadAction<File|null>)=>{
            state.NFTdetails.file = action.payload
        },
        setNFTName :(state, action: PayloadAction<string>)=>{
            state.NFTdetails.name = action.payload
        },
        setNFTSmartContract :(state, action: PayloadAction<string>)=>{
            state.NFTdetails.smart_contract = action.payload
        },
        setNFTTokenId :(state, action: PayloadAction<string>)=>{
            state.NFTdetails.token_id = action.payload
        },
        setNFTs : (state, action: PayloadAction<NFTType[]>)=>{
            state.NFTs = action.payload;
        },
        setErrorFetchingContracts: (state, action: PayloadAction<string>) => {
            state.errorFetchingContracts = action.payload;
        },
        setErrorSavingData: (state, action: PayloadAction<string>) => {
            state.errorSavingData = action.payload;
        },
        setIsNewNFT: (state, action: PayloadAction<boolean>) => {
            state.isNewNFT = action.payload;
        },
    },
});
export const {
    reset,
    setTabName,
    setContractValue,
    setContract,
    setSearchText,
    setPlayerName,
    setAthleteId,
    setContractAbi,
    setContractAddress,
    setContractDescription,
    setContractImage,
    setErrorFetchingContracts,
    setErrorFetchingContractDetails,
    setErrorSavingData,
    setIsNewNFT,
    setNFTAmount,
    setNFTDescription,
    setNFTFile,
    setNFTName,
    setNFTSmartContract,
    setNFTTokenId,
    setNFTs
} = contractSlice.actions;

export default contractSlice.reducer;
