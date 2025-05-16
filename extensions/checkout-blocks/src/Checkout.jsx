import {
  reactExtension,
  BlockStack,
  View,
  Heading,
  useApi,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const { cost } = useApi();

  const subtotalAmount = cost.subtotalAmount.current;
  const subtotal = subtotalAmount?.amount || 0;
  const currency = subtotalAmount?.currencyCode || "USD";
  const totalPoints = Math.floor(subtotal * 3);

  return (
    <BlockStack spacing="loose">
      <View inlineAlignment="center"
      inlineSize="fill"
      padding="base"
      border="base"
      borderWidth="base"
      cornerRadius="base"
      background="subdued">
        <Heading level="1">ENTRIES EARNED: {totalPoints}
        </Heading>
        </View>
    </BlockStack>
  );
}