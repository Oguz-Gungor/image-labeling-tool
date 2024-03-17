import { createContext, useContext, useState } from "react";

const ImageContext = createContext();

export const useImageContext = () => {
  return useContext(ImageContext);
};

export const withImageContext = (Component) => {
  return (props) => {
    const [image, setImage] = useState();
    return (
      <ImageContext.Provider value={{ image, setImage }}>
        <Component {...props} />
      </ImageContext.Provider>
    );
  };
};
