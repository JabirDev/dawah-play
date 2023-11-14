import { Metadata } from "next";

export const staticMetadata = (props: Metadata): Metadata => {
  const { title, description } = props;

  return {
    title: title + " — DawahPlay",
    description: description || "Account center",
    icons: {
      // icon: "/logo.svg",
      apple: "/logo.svg",
    },
  };
};

export const dynamicMetadata = async (props: Metadata): Promise<Metadata> => {
  const { title, description } = props;

  return {
    title: title + " — DawahPlay",
    description: description || "Account center",
    icons: {
      // icon: "/logo.svg",
      apple: "/logo.svg",
    },
  };
};
