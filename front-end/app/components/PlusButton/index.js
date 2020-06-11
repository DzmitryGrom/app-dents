import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { PlusButtonBlock } from "./styles";

export const PlusButton = ({ navigate, path, id = null }) => (
  <PlusButtonBlock onPress={() => navigate(path, { id })}>
    <Ionicons name="ios-add" size={32} color="white" />
  </PlusButtonBlock>
);
