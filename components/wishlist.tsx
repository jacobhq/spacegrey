import { Text, VStack } from "@chakra-ui/react";
import { products } from "../lib/data";
import { WishlistMeta } from "./wishlistMeta";
import { PrismaClient } from '@prisma/client'
import { useUser } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

export default function Wishlist({ wishlist }) {
    return (
        <VStack>
          <Text>{wishlist}</Text>
            {products.map((product) => (
                <WishlistMeta key={product.id} name={product.name} description={product.description} image={product.imageUrl} modal />
            ))}
        </VStack>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const prisma = new PrismaClient()
    const { user, error, isLoading: authLoading } = useUser()
    const wishlist = await prisma.wishlistItem.findMany({
      where: {
        // @ts-expect-error
        auth0Id: user?.sub,
      },
    })
    return { props: { wishlist } }
  }
  