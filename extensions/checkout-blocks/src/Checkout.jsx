import {
  reactExtension,
  BlockStack,
  View,
  Heading,
  useApi,
  useSettings,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const { cost } = useApi();
const settings = useSettings();
const label = settings.giftlabel_title;
const giftTimes = settings.gift_number;
  const subtotalAmount = cost.subtotalAmount.current;
  const subtotal = subtotalAmount?.amount || 0;
  const currency = subtotalAmount?.currencyCode || "USD";
  const totalPoints = Math.floor(subtotal * giftTimes);

  return (
    <BlockStack spacing="loose">
      <View inlineAlignment="center"
      inlineSize="fill"
      padding="base"
      border="base"
      borderWidth="base"
      cornerRadius="base"
      background="subdued">
        <Heading level="1">{label} {totalPoints}
        </Heading>
        </View>
    </BlockStack>
  );
}