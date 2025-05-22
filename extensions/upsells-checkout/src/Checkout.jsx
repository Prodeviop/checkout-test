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

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
const productId = '7531840372841'
const setting = useSettings();
const main_title = setting.main_title;
const upsell_variant = setting.upsell_variant;
  return (
    <BlockStack spacing="base">
      <Divider />
<Heading inlineAlignment="center" Spacing="none">{main_title}</Heading>
        <InlineLayout columns={['18%', '62%' , '20%']} 
         spacing="base"
         padding="base"
      border="base"
      borderWidth="base"
      cornerRadius="base"
      background="subdued">
      <View>
        <ProductThumbnail 
        source="https://cdn.shopify.com/s/files/1/0632/0419/6457/files/Kaching-Bundles-1-year-warranty-free-png.webp"
        />
      </View>
      
         <BlockStack Spacing="tight">
        <Text size="large" Spacing="none">Upsells</Text>
        <Text size="small">GIft Item</Text>
      </BlockStack>
      
      
        <Button
        
      onPress={() => {
        console.log('onPress event');
      }}
    >
      ADD 
    </Button>
    </InlineLayout>
     <Divider />
    </BlockStack>
  );
}