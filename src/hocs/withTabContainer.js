import TextInput from "../components/TextInput/TextInput";

export default function withTabContainer(Component, buttonText) {
  return (props) => {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextInput
          onClick={props?.changeTabName}
          buttonText={buttonText}
        />
        <Component {...props} />
      </div>
    );
  };
}
