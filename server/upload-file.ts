"use server";

import { pinata } from "@/lib/pinata-utils";

interface Props {
  data: FormData;
}

export const uploadFile = async ({ data }: Props) => {
  try {
    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      return { error: "No file provided" };
    }

    const { cid } = await pinata.upload.public.file(file);
    const url = await pinata.gateways.public.convert(cid);

    return { url };
  } catch (e) {
    console.log(e);
    return { error: "Internal Server Error" };
  }
};
