# Solana Dusting and Address Poisoning Research Report



## Understanding Dusting Attacks

Dusting attacks represent a class of malicious activity primarily aimed at compromising the privacy of cryptocurrency users rather than directly stealing funds, although the gathered information can facilitate later, more targeted attacks. The term "dust" refers to minuscule amounts of cryptocurrency, often the smallest divisible unit (like satoshis in Bitcoin or lamports in Solana), that are practically insignificant in value and may even be less than the required transaction fee [1]. Attackers distribute this dust to a large number of wallet addresses simultaneously. The core objective, particularly on UTXO-based blockchains like Bitcoin historically, was to track the transactional activity associated with these dusted addresses [1]. When a user unknowingly includes the dust UTXO (Unspent Transaction Output) in a future transaction, consolidating it with other funds, the attacker can use blockchain analysis techniques to link different addresses belonging to the same user or entity. This process helps deanonymize users, potentially revealing their total holdings and transaction patterns, making them targets for phishing, social engineering, or even extortion [1].

While originating on Bitcoin, the rising transaction fees made large-scale dusting less economical there. Consequently, attackers shifted focus to blockchains with lower transaction costs, including UTXO-based chains like Litecoin and Dogecoin, and also adapted their techniques for account-based blockchains like Ethereum, Solana, and BNB Smart Chain [1]. On these platforms, dusting often takes different forms. Instead of solely tracking UTXOs, attackers might send tiny amounts of native tokens or, more commonly, unsolicited airdrops of worthless or malicious tokens and NFTs [1]. These airdropped assets might contain misleading information, links to phishing websites embedded in transaction memos (observed on chains like XLM and XRP), or even malicious smart contracts [1]. Interacting with these scam tokens or NFTs—attempting to sell, transfer, or approve them for use in a dApp—can trigger malicious code designed to drain the user's wallet of valuable assets [1]. Trezor notes that malicious smart contracts and NFTs now dominate incidents on chains like Ethereum and Solana, where users are tricked into signing transactions (like token approvals) that grant attackers access to their funds [1].

Protection against dusting primarily involves awareness and avoidance. Users should treat any unexpected or unsolicited deposit of tokens or NFTs with extreme suspicion and avoid interacting with them in any way [1, 2]. On UTXO chains, careful coin control can prevent the consolidation of dust UTXOs [1]. On account-based chains like Solana, users should never click links embedded in transaction memos from unknown sources, nor should they attempt to interact with or approve unknown tokens/NFTs that appear in their wallets [1]. Many wallets, including Trezor Suite, are implementing features to hide or flag potentially malicious dust or scam tokens to help users avoid accidental interaction [1, 2].

[1] Trezor. (n.d.). *Dusting attacks & airdrop scam tokens*. Retrieved from https://trezor.io/support/a/dusting-attacks-airdrop-scam-tokens
[2] Trezor. (n.d.). *Address Poisoning Attacks and Trezor*. Retrieved from https://trezor.io/support/a/address-poisoning-attacks


## Understanding Address Poisoning Attacks

Address poisoning, also known as address spoofing, is a deceptive attack vector that exploits user carelessness, particularly the common practice of copying and pasting wallet addresses from transaction history [1, 2]. Unlike dusting attacks that primarily target privacy or use malicious tokens, address poisoning aims directly at tricking users into sending funds to the wrong address, resulting in theft [1].

The mechanism is straightforward but effective [1, 2]:

1.  **Monitoring:** Scammers monitor blockchains (especially those with low transaction fees like Polygon, BSC, and potentially Solana due to its low fees) for active wallets, identifying frequent transaction patterns and recipient addresses.
2.  **Vanity Address Generation:** They algorithmically generate a large number of new wallet addresses until they create one that visually mimics a frequently used recipient address of their target. This "vanity address" often shares the first few and/or last few characters with the legitimate address, making it appear identical at a glance in many wallet interfaces or block explorers.
3.  **Poisoning Transaction:** The scammer sends a minuscule (often zero-value) transaction *from* their lookalike vanity address *to* the target victim's address. This action inserts the scammer's lookalike address into the victim's transaction history.
4.  **The Trap:** The scammer hopes that the victim, when intending to send funds to their legitimate frequent recipient, will carelessly copy the address from their transaction history, accidentally selecting the scammer's lookalike address instead of the correct one.

Chainalysis highlights that address poisoning toolkits are readily available on darknet marketplaces, lowering the barrier to entry for scammers [2]. These toolkits often automate address generation and the sending of poisoning transactions [2].

A high-profile example occurred in May 2024, where a victim nearly lost $68 million in WBTC [2]. The victim sent a test transaction to the correct address (0xd9A1b...) but then, likely copying from their history poisoned by the scammer's lookalike address (0xd9A1c...), sent the main $68M transfer to the scammer [2]. Although the funds were eventually returned after negotiation, the scammer still profited from token appreciation [2]. This case study revealed a large-scale campaign involving over 82,000 seeded lookalike addresses [2].

Analysis of this campaign showed that victims were often experienced users with higher-than-average balances and transaction counts, indicating that vigilance is crucial for everyone, not just newcomers [2]. While the overall success rate per poisoned address was extremely low (0.03% received >$100), the potential ROI was massive due to the high value of successful hits [2]. Scammers often launder the stolen funds through DeFi protocols or centralized exchanges, sometimes using KYC-compliant exchanges in specific regions [2].

Protection against address poisoning relies heavily on user diligence [1, 2]:

*   **Verify Every Character:** Meticulously check the *entire* recipient address before confirming any transaction, especially high-value ones. Do not rely on just the first and last few characters.
*   **Avoid Copying from History:** Make it a habit *not* to copy addresses directly from transaction history. 
*   **Use Address Books/Whitelists:** Utilize trusted address book features within wallets and only send funds to pre-verified, saved addresses.
*   **Test Transactions:** Sending a small test amount before a large transfer remains a valuable (though potentially costly on high-fee networks) verification step.
*   **Wallet Features:** Pay attention to warnings or visual cues provided by wallets (like Trezor Suite's blurring of suspicious transactions) designed to flag potential poisoning attempts [1].

Blockchain intelligence plays a role in identifying large-scale campaigns by detecting patterns like mass address generation and seeding transactions, allowing platforms to potentially warn users or flag associated addresses [2].

[1] Trezor. (n.d.). *Address Poisoning Attacks and Trezor*. Retrieved from https://trezor.io/support/a/address-poisoning-attacks
[2] Chainalysis Team. (2024, October 23). *Anatomy of an Address Poisoning Scam*. Chainalysis Blog. Retrieved from https://www.chainalysis.com/blog/address-poisoning-scam/


## Methodology

This research report was compiled through a systematic review of publicly available information and technical documentation related to cryptocurrency security, specifically focusing on dusting and address poisoning attacks on the Solana blockchain. The methodology involved several key steps:

1.  **Initial Scoping:** The project requirements outlined in the initial prompt (provided as `pasted_content.txt`) defined the core objectives: investigate dusting and address poisoning on Solana, and propose solutions including a research report, detection API, and dashboard.
2.  **Literature Review:** Targeted web searches were conducted using `info_search_web` to gather general definitions, mechanisms, and known instances of dusting and address poisoning attacks across various blockchains. Authoritative sources such as security blogs from hardware wallet providers (Trezor) and blockchain analysis firms (Chainalysis) were prioritized.
3.  **Documentation Analysis:** Specific documentation resources mandated by the project prompt and user instructions were systematically reviewed using browser tools (`browser_navigate`, `browser_scroll_down`, etc.). This included:
    *   Trezor Support Articles on Dusting and Address Poisoning [1, 2]
    *   Chainalysis Blog post on Address Poisoning Anatomy [3]
    *   Flipside Crypto Documentation, focusing on data availability and querying capabilities [4]
    *   Helius Documentation, specifically the Enhanced Transactions API for parsing transaction data [5]
    Information regarding data structures, API endpoints, query languages (SQL), and potential data points relevant to detecting suspicious activities was extracted.
4.  **Synthesis and Drafting:** Information gathered from the literature review and documentation analysis was synthesized to build a comprehensive understanding of the attack vectors. Key findings, definitions, mechanisms, case studies, and mitigation strategies were extracted and organized. The report was drafted section by section, ensuring logical flow and clear explanations. Citations were included throughout the drafting process to maintain source integrity and allow for reproducibility.
5.  **Solana Contextualization:** While general principles were gathered from broader sources, an effort was made to contextualize the findings for the Solana ecosystem, considering its account model, low transaction fees, and specific tooling (e.g., Helius APIs).

This methodology aimed to provide a well-referenced and informative overview based on credible public sources and technical documentation relevant to the Solana ecosystem.

[1] Trezor. (n.d.). *Dusting attacks & airdrop scam tokens*. Retrieved from https://trezor.io/support/a/dusting-attacks-airdrop-scam-tokens
[2] Trezor. (n.d.). *Address Poisoning Attacks and Trezor*. Retrieved from https://trezor.io/support/a/address-poisoning-attacks
[3] Chainalysis Team. (2024, October 23). *Anatomy of an Address Poisoning Scam*. Chainalysis Blog. Retrieved from https://www.chainalysis.com/blog/address-poisoning-scam/
[4] Flipside Crypto. (n.d.). *Data | Flipside Docs*. Retrieved from https://docs.flipsidecrypto.xyz/welcome-to-flipside/data
[5] Helius. (n.d.). *Parse Transaction(s) | Helius Docs*. Retrieved from https://docs.helius.dev/solana-apis/enhanced-transactions-api/parse-transaction-s


## Findings and Data Sources

Based on the reviewed literature and documentation, several key findings emerge regarding dusting and address poisoning attacks, particularly relevant to the Solana ecosystem and the development of detection tools:

**Findings:**

1.  **Prevalence and Evolution:** Both dusting and address poisoning are active threats. Dusting has evolved from primarily a privacy attack on UTXO chains to include malicious token/NFT airdrops and phishing attempts via memos on account-based chains like Solana [1]. Address poisoning leverages user carelessness with transaction history and is facilitated by readily available toolkits, targeting even experienced users [2, 3].
2.  **Solana's Susceptibility:** Solana's low transaction fees make it an economically viable platform for large-scale dusting (via malicious tokens/NFTs) and address poisoning campaigns, similar to other low-fee EVM chains mentioned by Trezor and Chainalysis [1, 2, 3]. The high transaction volume also provides ample data for attackers to monitor potential victims.
3.  **Attack Mechanisms:**
    *   *Dusting (Solana Context):* Primarily involves airdropping malicious SPL tokens or NFTs. Interaction (transfer, sale attempt, approval) triggers malicious smart contracts [1]. Less common might be simple dust amounts of SOL intended for privacy analysis, though less effective than on UTXO chains.
    *   *Address Poisoning (Solana Context):* Involves sending tiny SOL transactions or worthless SPL token transfers *from* a visually similar lookalike address *to* the victim, poisoning their transaction history [2, 3]. The reliance on copy-pasting addresses from explorers (like Solscan) or wallets makes users vulnerable.
4.  **Victim Profile (Address Poisoning):** Contrary to targeting only novices, sophisticated address poisoning campaigns often target active, high-balance users, exploiting routine behavior rather than lack of knowledge [3].
5.  **Detection Challenges:** Attacks are often subtle. Dusting via malicious tokens requires identifying the malicious nature of the token/contract itself. Address poisoning relies on detecting the *intent* behind a seemingly normal, low-value transaction based on address similarity and transaction patterns [3].
6.  **Mitigation:** User education (verifying addresses, avoiding history copy-paste, using address books, test transactions) is crucial but insufficient [1, 2, 3]. Technical solutions involving wallet UI improvements (flagging suspicious transactions/tokens) and backend analysis are necessary [1, 2, 3].

**Data Sources for Detection:**

Developing effective detection tools requires leveraging rich on-chain data and metadata. The specified resources offer potential avenues:

1.  **Solana JSON RPC:** Provides fundamental access to block and transaction data but requires significant processing to extract meaningful insights. It's the base layer upon which other services build.
2.  **Helius Enhanced APIs:** Offers *parsed* transaction data, simplifying the process of understanding transaction types (NFT, Swap, SPL), involved accounts, token transfers, and potential errors [5]. This is highly valuable for identifying specific actions like malicious token transfers or the initial poisoning transaction in an address spoofing attempt. However, Helius notes their V1 parser focuses on NFT/Jupiter/SPL and should not be relied upon for other DeFi protocols [5].
3.  **Flipside Crypto:** Provides curated, indexed blockchain data accessible via SQL [4]. This allows for complex queries across historical data to identify patterns, such as:
    *   Addresses receiving large numbers of low-value transfers (potential dusting).
    *   Addresses sending low-value transactions from newly created wallets with visually similar addresses to recipients' frequent contacts (potential address poisoning seeding).
    *   Tracking fund flows from known malicious campaigns.
    Flipside's structured tables (`transactions`, `token_transfers`, `events`) and community-modeled tables could be instrumental for dashboarding and heuristic development [4].
4.  **Chainalysis/Trezor Insights:** While not direct data APIs for this project, their research provides invaluable context on attack patterns, victim profiles, and laundering techniques, informing the heuristics needed for the detection API and dashboard [1, 2, 3].
5.  **Solscan API / Dune Analytics:** These platforms (mentioned in the prompt but not explicitly provided as links for review) also offer APIs or query engines (like Dune) that provide access to indexed Solana data, similar in function to Helius or Flipside, potentially offering alternative or supplementary data sources.

Combining real-time transaction parsing (Helius) with historical pattern analysis (Flipside/Dune/SQL) appears crucial for building a robust detection suite.

[1] Trezor. (n.d.). *Dusting attacks & airdrop scam tokens*. Retrieved from https://trezor.io/support/a/dusting-attacks-airdrop-scam-tokens
[2] Trezor. (n.d.). *Address Poisoning Attacks and Trezor*. Retrieved from https://trezor.io/support/a/address-poisoning-attacks
[3] Chainalysis Team. (2024, October 23). *Anatomy of an Address Poisoning Scam*. Chainalysis Blog. Retrieved from https://www.chainalysis.com/blog/address-poisoning-scam/
[4] Flipside Crypto. (n.d.). *Data | Flipside Docs*. Retrieved from https://docs.flipsidecrypto.xyz/welcome-to-flipside/data
[5] Helius. (n.d.). *Parse Transaction(s) | Helius Docs*. Retrieved from https://docs.helius.dev/solana-apis/enhanced-transactions-api/parse-transaction-s


## Conclusion and Recommendations

Dusting and address poisoning attacks pose significant, evolving threats to users within the Solana ecosystem. While distinct in their primary goals—privacy compromise versus direct fund theft—both exploit the transparency of the blockchain and common user behaviors. Solana's characteristics, particularly its low transaction fees, make it an attractive environment for attackers deploying these scams at scale.

Our research, drawing upon insights from security experts like Trezor and blockchain intelligence firms like Chainalysis, alongside technical documentation from data providers Helius and Flipside Crypto, highlights several key takeaways. Dusting on Solana often manifests as malicious token/NFT airdrops designed to lure users into interacting with harmful smart contracts. Address poisoning relies on social engineering through transaction history manipulation, preying on users' tendency to copy-paste addresses without full verification. Notably, even experienced users with significant holdings are targeted, underscoring the need for universal vigilance and robust security measures.

Effective mitigation requires a multi-pronged approach:

1.  **User Education:** Continuous efforts are needed to educate users about verifying addresses meticulously, avoiding interactions with unsolicited tokens/NFTs, utilizing address books, and understanding the risks of copying from transaction history.
2.  **Wallet/Explorer UI Enhancements:** Wallets and block explorers should continue to develop features that automatically flag or hide suspicious transactions (e.g., zero-value transfers from lookalike addresses, known scam tokens) to provide users with clear warnings.
3.  **Backend Detection Systems:** Proactive detection is crucial. This involves leveraging rich on-chain data and advanced analytics:
    *   **Real-time Monitoring:** Utilizing APIs like Helius to parse transactions in real-time can help identify immediate threats, such as interactions with known malicious contracts or the initial seeding transaction in an address poisoning attempt.
    *   **Historical Analysis:** Employing data warehousing solutions like Flipside Crypto allows for complex SQL queries to detect broader patterns indicative of scam campaigns (e.g., mass address generation, unusual fund flows, statistical deviations from normal behavior).
    *   **Heuristic Development:** Combining insights from security research (Chainalysis, Trezor) with available data is essential for building effective heuristics to score transactions and addresses for potential malicious intent.

**Recommendations for Project Deliverables:**

*   **Detection API:** Should focus on integrating real-time parsing (e.g., via Helius) with heuristics derived from historical analysis and known scam patterns. It needs to classify transactions, provide confidence scores, and offer explanations, prioritizing low false positives.
*   **Dashboard:** Should leverage historical, indexed data (e.g., via Flipside SQL queries) to visualize trends in dusting and poisoning activities, track attacker infrastructure (wallet clustering), and monitor the prevalence of different attack vectors over time.
*   **Open Source:** All components (API code, dashboard queries/frontend) must be open-sourced with appropriate licensing (MIT/Apache/GPL) to foster community collaboration and adoption by wallets, explorers, and dApps.

By developing and deploying these open-source tools, we can contribute significantly to enhancing the security and trustworthiness of the Solana ecosystem, empowering users and platforms to better defend against these pervasive threats.


## References

[1] Trezor. (n.d.). *Dusting attacks & airdrop scam tokens*. Retrieved from https://trezor.io/support/a/dusting-attacks-airdrop-scam-tokens
[2] Trezor. (n.d.). *Address Poisoning Attacks and Trezor*. Retrieved from https://trezor.io/support/a/address-poisoning-attacks
[3] Chainalysis Team. (2024, October 23). *Anatomy of an Address Poisoning Scam*. Chainalysis Blog. Retrieved from https://www.chainalysis.com/blog/address-poisoning-scam/
[4] Flipside Crypto. (n.d.). *Data | Flipside Docs*. Retrieved from https://docs.flipsidecrypto.xyz/welcome-to-flipside/data
[5] Helius. (n.d.). *Parse Transaction(s) | Helius Docs*. Retrieved from https://docs.helius.dev/solana-apis/enhanced-transactions-api/parse-transaction-s


