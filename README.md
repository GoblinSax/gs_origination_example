# NFTFI x GoblinSax Orgination Example


NFTFI is a P2P lending protocol that allows borrowers to take out a loan from a lender. Usually a borrower goes onto nftfi.com, approves and lists their nft with their desired terms. Once, lender makes an offer for your nft, borrower can initiate a loan. 

With NFTFI V2 if a borrower has an offer then they can "acceptOffer" with loan term provided by lender and initiate a loan instantly! 

This opens the gates to new nft financialization products to be build on top of NFTFI outside of its primary p2p loan use case such as vaults, derivatives, and much more!

Usually borrower intiates a loan by calling "acceptOffer" with "private offer" that they recieve from a lender after they value borrower's nft. However, now with GS Orgination API, borrower can get offers instantly via an api to initiate a loan!

### What is this Example

This example shows you  how to take out an instant loan on rinkeby (forked hardhat environment) using terms offered by GS Orgination API for MNFT acquired from faucet.paradigm.xyz 

Steps:
- acquire MNFT, ETH, and WETH from faucet.paradigm.xyz for rinkeby
- create `.env` and add following to it
```shell
MACROHACKS_PRI_KEY="your private key with MNFT from faucet"
MACROHACKS_PUB_KEY="your address with MNFT from faucet"
MACROHACKS_NODE_URL="https://rinkeby.infura.io/v3/xxxxx"
ORGINATION_API_BASE_URL="https://sdm6h8zgmd.execute-api.us-east-1.amazonaws.com/prod"
```
- in `test/test.js` change NFT_ID to nft you recieved from facuet
- `npm i` dependencies 
- `npx hardhat test` to see the example code working 

### Resources 
- [NFTFI sdk](https://github.com/NFTfi-Genesis)
- [NFTFI mainnet](https://app.nftfi.com/)
- [NFTFI rinkeby](https://beta.nftfi.com/)
- [NFTFI Discord](https://discord.gg/nftfi)
- [GoblinSax](https://goblinsax.xyz/)
- [GoblinSax Discord](https://discord.gg/GS6rvrvb9B)

