"use server";

import { StateType } from "@/providers/token-form";
import { uploadFile } from "./upload-file";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  mplTokenMetadata,
  createMetadataAccountV3,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey as umiPublicKey,
  none,
} from "@metaplex-foundation/umi";
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  createSetAuthorityInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  AuthorityType,
} from "@solana/spl-token";

import { ENDPOINT } from "@/lib/solana-utils";
import { createFeePayer, validateFeePayment } from "./utils";

interface Props {
  userPublicKeyStr: string;
  metadata: StateType;
  feeSignature: string;
}

export const createToken = async ({
  userPublicKeyStr,
  metadata,
  feeSignature,
}: Props) => {
  try {
    const { logo } = metadata;
    let image: string | null = null;
    if (logo) {
      const formImage = new FormData();
      formImage.append("file", logo, `logo`);
      const { url } = await uploadFile({ data: formImage });
      image = url || null;
    }

    const jsonMetadata = {
      name: metadata.title,
      symbol: metadata.symbol,
      description: metadata.description || null,
      image,
      external_url: metadata.website || null,
      extensions: {
        twitter: metadata.twitter || null,
        discord: metadata.discord || null,
      },
    };

    const formMetadata = new FormData();
    formMetadata.append(
      "file",
      new Blob([JSON.stringify(jsonMetadata)], { type: "application/json" }),
      `metadata`
    );
    const { url: metadataUrl } = await uploadFile({ data: formMetadata });

    console.log({ image, metadataUrl });

    const connection = new Connection(ENDPOINT, "confirmed");

    await validateFeePayment(connection, feeSignature, userPublicKeyStr);

    const feePayer = await createFeePayer();

    const userPublicKey = new PublicKey(userPublicKeyStr);

    const umi = createUmi(connection.rpcEndpoint).use(mplTokenMetadata());

    const feePayerUmiKeypair = umi.eddsa.createKeypairFromSecretKey(
      feePayer.secretKey
    );
    const feePayerSigner = createSignerFromKeypair(umi, feePayerUmiKeypair);
    umi.use(signerIdentity(feePayerSigner));

    const mintKeypair = Keypair.generate();
    const tokenAccount = getAssociatedTokenAddressSync(
      mintKeypair.publicKey,
      userPublicKey
    );

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: feePayer.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: MINT_SIZE,
        lamports: await getMinimumBalanceForRentExemptMint(connection),
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mintKeypair.publicKey,
        metadata.decimals,
        feePayer.publicKey,
        userPublicKey
      ),
      createAssociatedTokenAccountInstruction(
        feePayer.publicKey,
        tokenAccount,
        userPublicKey,
        mintKeypair.publicKey
      ),
      createMintToInstruction(
        mintKeypair.publicKey,
        tokenAccount,
        feePayer.publicKey,
        BigInt(metadata.supply * Math.pow(10, metadata.decimals))
      )
    );

    transaction.feePayer = feePayer.publicKey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    transaction.partialSign(feePayer, mintKeypair);

    const signature = await connection.sendRawTransaction(
      transaction.serialize()
    );

    await connection.confirmTransaction(
      {
        signature,
        ...(await connection.getLatestBlockhash()),
      },
      "finalized"
    );

    if (metadataUrl) {
      try {
        await createMetadataAccountV3(umi, {
          mint: umiPublicKey(mintKeypair.publicKey.toString()),
          mintAuthority: feePayerSigner,
          payer: feePayerSigner,
          updateAuthority: umiPublicKey(userPublicKey.toString()),
          data: {
            name: metadata.title,
            symbol: metadata.symbol,
            uri: metadataUrl,
            sellerFeeBasisPoints: 0,
            creators: none(),
            collection: none(),
            uses: none(),
          },
          isMutable: true,
          collectionDetails: none(),
        }).sendAndConfirm(umi);
      } catch (metadataError) {
        console.error("Metadata creation failed:", metadataError);
      }
    }

    const authorityTransferTransaction = new Transaction().add(
      createSetAuthorityInstruction(
        mintKeypair.publicKey,
        feePayer.publicKey,
        AuthorityType.MintTokens,
        userPublicKey,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    authorityTransferTransaction.feePayer = feePayer.publicKey;
    authorityTransferTransaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    authorityTransferTransaction.partialSign(feePayer);
    const transferSignature = await connection.sendRawTransaction(
      authorityTransferTransaction.serialize()
    );

    await connection.confirmTransaction(
      {
        signature: transferSignature,
        ...(await connection.getLatestBlockhash()),
      },
      "finalized"
    );

    const token = {
      mintAddress: mintKeypair.publicKey.toString(),
      accountAddress: tokenAccount.toString(),
      signature,
    };

    if (!token) {
      throw new Error("Token minting failed");
    }

    return token;
  } catch (error) {
    console.error("Error creating token:", error);
  }
};
