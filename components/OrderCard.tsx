import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Card, Icon } from "@rneui/themed";
import { useTailwind } from "tailwind-rn/dist";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";

export type OrdersScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<TabStackParamList, "Orders">, NativeStackNavigationProp<RootStackParamList>>;

type Props = {
  item: Order;
};

const OrderCard = ({ item }: Props) => {
  const tw = useTailwind();
  const navigation = useNavigation<OrdersScreenNavigationProp>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Order", { order: item })}>
      <Card containerStyle={tw("px-5 rounded-lg")}>
        <View style={tw("flex-row justify-between items-center")}>
          <View>
            <Icon name="truck-delivery" color={"#eb6a7c"} type="material-community" />
            <Text style={{ fontSize: 10 }}>{new Date(item.createdAt).toDateString()}</Text>
          </View>

          <View>
            <Text style={{ color: "#9ca3af", fontSize: 10 }}>
              {item.carrier}-{item.trackingId}
            </Text>
            <Text style={(tw("text-xl"), { color: "#6b7280" })}>{item.trackingItems.customer.name}</Text>
          </View>

          <View style={tw("flex-row items-center")}>
            <Text style={[tw("text-sm"), { color: "#eb6a7c" }]}>{item.trackingItems.items.length} x</Text>
            <View style={{ marginLeft: 5 }}>
              <Icon name="box" type="feather" />
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
