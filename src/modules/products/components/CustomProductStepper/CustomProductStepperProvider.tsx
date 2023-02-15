import { useMemo, useReducer } from "react";
import { INITIAL_STEP_BUTTONS_STATE } from "./constants";
import { CustomProductStepperProviderProps } from "./types";
import { buttonStepReducer, CustomProductStepperContext } from "./utils";

export const CustomProductStepperProvider = ({
  children,
}: CustomProductStepperProviderProps) => {
  const [stepperState, stepButtonsDispatch] = useReducer(
    buttonStepReducer,
    INITIAL_STEP_BUTTONS_STATE
  );

  const value = useMemo(
    () => ({ stepperState: { ...stepperState }, stepButtonsDispatch }),
    [stepperState, stepButtonsDispatch]
  );

  return (
    <CustomProductStepperContext.Provider value={value}>
      {children}
    </CustomProductStepperContext.Provider>
  );
};
