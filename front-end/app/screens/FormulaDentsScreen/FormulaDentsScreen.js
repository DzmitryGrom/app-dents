import React, { useState, useEffect } from "react";
import { FormulaDentsWrapper, FormulaDentsImage } from "./styles";

export const FormulaDentsScreen = () => (
  <FormulaDentsWrapper>
    <FormulaDentsImage source={require('../../../assets/dents.png')} />
  </FormulaDentsWrapper>
);
