import {
  reactExtension,
  BlockStack,
  View,
  Text,
  Heading,
  Button,
  Divider,
  ProductThumbnail,
  InlineLayout,
  useApi,
  useSettings,
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useState } from "react";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const { query } = useApi();
  const settings = useSettings();

  const [variantData, setVariantData] = useState({
    title: '',
    price: '',
    imageUrl: '',
  });

  const {
    main_title,
    enable_updevider,
    enable_downdevider,
    upsell_variant,
  } = settings;

  useEffect(() => {
    async function fetchVariantData() {
      if (!upsell_variant) return;

      const response = await query(
        `query getVariant($id: ID!) {
          productVariant(id: $id) {
            title
            price {
              amount
              currencyCode
            }
            image {
              url
            }
          }
        }`,
        {
          variables: {
            id: `gid://shopify/ProductVariant/${upsell_variant}`,
          },
        }
      );

      const variant = response.data?.productVariant;

      if (variant) {
        setVariantData({
          title: variant.title,
          price: `${variant.price.amount} ${variant.price.currencyCode}`,
          imageUrl: variant.image?.url || '',
        });
      }
    }

    fetchVariantData();
  }, [upsell_variant]);

  return (
    <BlockStack spacing="base">
      {enable_updevider && <Divider />}

      <Heading inlineAlignment="center" spacing="none">
        {main_title}
      </Heading>

      <InlineLayout
        columns={["18%", "62%", "20%"]}
        spacing="base"
        padding="base"
        border="base"
        borderWidth="base"
        cornerRadius="base"
        background="subdued"
      >
        <View>
          <ProductThumbnail
            source={
              variantData.imageUrl ||
              "https://cdn.shopify.com/s/files/1/0632/0419/6457/files/Kaching-Bundles-1-year-warranty-free-png.webp"
            }
          />
        </View>

        <BlockStack spacing="tight">
          <Text size="large" spacing="none">
            {variantData.title || "Upsell Item"}
          </Text>
          <Text size="small">{variantData.price || "Loading price..."}</Text>
        </BlockStack>

        <Button
          onPress={() => {
            console.log("Upsell item added to cart");
            // Add logic here to add the item to the cart
          }}
        >
          ADD
        </Button>
      </InlineLayout>

      {enable_downdevider && <Divider />}
    </BlockStack>
  );
}
