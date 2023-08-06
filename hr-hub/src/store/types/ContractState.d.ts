declare type contractState = {
    tabName: "CONTRACT" | "NFT";
    searchText: string;
    isNewNFT: boolean;
    contracts: Contract[];
    filteredContracts: Contract[];
    NFTs: NFTType[];
    contractDetails: ContractDetails;
    NFTdetails: NFTdetails;

    errorFetchingContractDetails: string;
    errorFetchingContracts: string;
    errorSavingData: string;
};
declare type ContractDetails = {
    file: File | null;
    athlete_id: string;
    name: string;
    description: string;
    contract_amount: string;
    contract_address: string;
    contract_abi: string;
};

declare type NFTdetails = {
    smart_contract: string;
    name: string;
    description: string;
    file: File | null;
    amount: string;
    token_id: string;
};

declare type Contract = {
    id: string;
    /**
     * athlete field is refer as  athlete id
     * @example "648f4753dec07b62724fff07"
     */
    athlete: string;
    name: string;
    description: string;
    /**
     * The image path
     * @example "b7acd059-0619-4c82-8179-0a9ff2fbdd66.png"
     */
    image: string;
    contract_amount: string;
    contract_address: string;
    contract_abi: string;
};
declare type NFTType = {
    id: string;
    smart_contract: string;
    name: string;
    description: string;
    /**
     * The image .
     * @example "655242ad-d719-4689-9d78-3cced03e59d1.png"
     */
    image: string;
    amount: string;
    token_id: string;
};
