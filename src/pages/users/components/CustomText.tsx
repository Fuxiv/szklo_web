//@ts-ignore
export const customTextDetails = (cellData) => {
  return (
    <p
      style={{
        color: "black",
        textAlign: "right",
        paddingTop: 3,
        paddingBottom: 3,
        fontFamily: "Poppins",
        fontSize: 14,
        textOverflow: "ellipsis",
        overflow: "hidden",
      }}
    >
      {cellData.value}
    </p>
  );
};
//@ts-ignore
export const customTextLeft = (cellData) => {
  return (
    <p
      style={{
        color: "black",
        textAlign: "left",
        paddingTop: 3,
        paddingBottom: 3,
        fontFamily: "Poppins",
        fontSize: 14,
        width: "auto",
        display: "flex",
        flexWrap: "wrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
      }}
    >
      {cellData.value}
    </p>
  );
};
//@ts-ignore
export const customTextCenter = (cellData) => {
  return (
    <p
      style={{
        color: "black",
        textAlign: "center",
        paddingTop: 3,
        paddingBottom: 3,
        fontFamily: "Poppins",
        fontSize: 14,
      }}
    >
      {cellData.value}
    </p>
  );
};
export const renderTitleHeaderDetails = ({ data }: { data: any }) => {
    return (
      <p
        style={{
          fontSize: "15px",
          color: "#081733",
          backgroundColor: "transparent",
          // textAlign: "center",
          borderColor: "transparent",
          fontFamily: "Poppins",
          paddingBottom: 5,
          fontWeight: 600,
        }}
      >
        {data.column.caption}
      </p>
    );
  };
