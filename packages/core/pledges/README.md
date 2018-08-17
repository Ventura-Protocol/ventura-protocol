## Pledges contract
Purpose: to store amounts against a specific request and aggregate requests under a specific entity.
#### Polygon
The contract is live on Polygon on the address `0x2e912E9e6Db6402037670Ae00b354DE310824D22`
### Pledge
A pledge is just an amount and an eth wallet address that pledges that. Each pledge always belongs to an Ask.

### Ask
Ask is a short textual content (Stored offchain) that asks a creater for a specific NFT.

### Handle
Handle is anyone with a social media account, for example IG:christiano or TW:jack (Prefixes represent platforms)

## addAsk function

This function creates an Ask and a first pledge together.

### addPledge function

This function ads a new pledge to an already existing ask.