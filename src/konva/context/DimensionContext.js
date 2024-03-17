import { createContext, useContext, useState } from "react";

const DimensionContext = createContext();

export const useDimensionContext = () => {
  return useContext(DimensionContext);
};

export const withDimensionContext = (Component) => {
  return (props) => {
    const [dimensions, setDimensions] = useState();
    return (
      <DimensionContext.Provider
        value={{
          dimensions,
          setDimensions,
        }}
      >
        <Component {...props} />
      </DimensionContext.Provider>
    );
  };
};
