require('dotenv').config();
const {
  expect
} = require("chai");
const axios = require('axios');
const address_NFTFI = '0x33e75763f3705252775c5aeed92e5b4987622f44'
const address_NFT = '0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b'
const address_WETH = '0xc778417e063141139fce010982780140aa0cd5ab'
//might want to change this to your nft id that you get from faucet
const NFT_ID = '1535590'

let abi_ERC721 = require('../abi/ERC721.json');
let abi_ERC20 = require('../abi/ERC20.json');
let abi_NFTFI = require('../abi/NFTFI.json');

describe("Example Loan", function () {
  let owner, testContract, walletWithTokens, erc721, nftfi, weth
  before(async () => {
    // Contracts are deployed using the first signer/account by default
    // impersonate your own wallet with paradigm faucet nfts and weth 
    walletWithTokens = await ethers.getImpersonatedSigner(process.env.MACROHACKS_PUB_KEY);
    let signers = await ethers.getSigners();
    owner = signers[0]
    let TestContract = await ethers.getContractFactory("TestContract");
    testContract = await TestContract.deploy();

    erc721 = new ethers.Contract(address_NFT, abi_ERC721, walletWithTokens)
    weth = new ethers.Contract(address_WETH, abi_ERC20, walletWithTokens)
    nftfi = new ethers.Contract(address_NFTFI, abi_NFTFI, walletWithTokens)

  })

  it("Should accept instant loan terms as borrower from goblin sax orgination api", async function () {
    await erc721.setApprovalForAll(address_NFTFI, true)
    let url = `${process.env.ORGINATION_API_BASE_URL}/api/create-offer?address=${address_NFT}&id=${NFT_ID}&duration=30&borrowerAddress=${walletWithTokens.address}&principal=10000000000000000&apr=10`
    let res = await axios.get(url)

    let balanceBeforeLoan = BigInt((await erc721.balanceOf(walletWithTokens.address)).toString())
    console.log('balanceBeforeLoan', balanceBeforeLoan)

    let balanceBeforeLoanWeth = BigInt((await weth.balanceOf(walletWithTokens.address)).toString())
    console.log('balanceBeforeLoanWeth', balanceBeforeLoanWeth)

    let loan = res['data']['body']
    let loan_details = loan['result']['terms']['loan']

    let offer = {
      loanPrincipalAmount: loan_details['principal'],
      maximumRepaymentAmount: loan_details['repayment'],
      nftCollateralId: loan['result']['nft']['id'],
      nftCollateralContract: loan['result']['nft']['address'],
      loanDuration: loan_details['duration'],
      loanAdminFeeInBasisPoints: loan['result']['nftfi']['fee']['bps'],
      loanERC20Denomination: loan_details['currency'],
      referrer: loan['result']['referrer']['address']
    }
    let borrowerSettings = {
      revenueSharePartner: loan['result']['referrer']['address'],
      referralFeeInBasisPoints: 0
    }

    let signature = {
      nonce: loan['result']['lender']['nonce'],
      expiry: loan_details['expiry'],
      signer: loan['result']['lender']['address'],
      signature: loan['result']['signature']
    }

    let acceptOffer = await nftfi.acceptOffer(offer, signature, borrowerSettings)
    
    let balanceAfterLoan = BigInt((await erc721.balanceOf(walletWithTokens.address)).toString())
    console.log('balanceAfterLoan', balanceAfterLoan)
    let balanceAfterLoanWeth = BigInt((await weth.balanceOf(walletWithTokens.address)).toString())
    console.log('balanceAfterLoanWeth', balanceAfterLoanWeth)

    console.log()

    console.log(`nft balance should decrease in borrower wallet`)
    await expect(balanceAfterLoan).to.be.lt(balanceBeforeLoan)
    console.log(`weth balance should increase in borrower wallet`)
    await expect(balanceAfterLoanWeth).to.be.gt(balanceBeforeLoanWeth)


  });

});