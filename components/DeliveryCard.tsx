import { View, Text } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { Card, Divider, Icon } from "@rneui/themed";
import MapView, { Marker } from "react-native-maps";

type Props = {
  order: Order;
  fullWidth?: boolean;
};

const DeliveryCard = ({ order, fullWidth }: Props) => {
  const tw = useTailwind();
  return (
    <Card containerStyle={[tw(`${fullWidth ? "rounded-none m-0" : "rounded-lg"}  my-2`), { backgroundColor: fullWidth ? "#eb6a7c" : "#59c1cc", padding: 0, paddingTop: 16, shadowColor: "black", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }]}>
      <View style={fullWidth && { height: "100%" }}>
        <Icon name="box" type="entypo" size={50} color="white" />
        <View style={tw("items-start p-5 -mt-3")}>
          <View style={tw("mx-auto")}>
            <Text style={[tw("text-xs text-center uppercase font-bold"), { color: "white" }]}>
              {order.carrier} - {order.trackingId}
            </Text>
            <Text style={[tw("text-center font-bold"), { color: "white", fontSize: 18, lineHeight: 28 }]}>Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}</Text>
            <Divider color="white" />
            <View style={tw("mx-auto pb-10")}>
              <Text style={[tw("text-center font-bold"), { color: "white", fontSize: 16, lineHeight: 24, marginTop: 10 }]}>Address</Text>
              <Text style={[tw("text-sm text-center"), { color: "white" }]}>
                {order.Address}, {order.City}
              </Text>
              <Text style={[tw("text-sm text-center italic"), { color: "white" }]}>Shipping Cost: £{order.shippingCost}</Text>
            </View>
          </View>
        </View>
        <Divider color="white" />

        <View style={tw("p-5")}>
          {order.trackingItems.items.map((item) => (
            <View key={item.item_id} style={[tw("flex-row justify-between items-center")]}>
              <Text style={[tw("text-sm italic"), { color: "white" }]}>{item.name}</Text>
              <Text style={[tw("text-xl"), { color: "white" }]}>x {item.quantity}</Text>
            </View>
          ))}
        </View>

        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={[tw("w-full"), { flexGrow: 1 }, !fullWidth && { height: 200 }]}
        >
          {order.Lat && order.Lng && <Marker coordinate={{ latitude: order.Lat, longitude: order.Lng }} title="Delivery Location" description={order.Address} identifier="destination" />}
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;
