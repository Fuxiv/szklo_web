import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../business/reducer/store";
import { DataGrid, Column } from "devextreme-react/data-grid";
import { createStore } from "devextreme-aspnet-data-nojquery";
import { BASE_URL } from "../../axios/instance";

export const DetailsColumnPos2 = (props: any) => {
  let token = localStorage.getItem("token");
  //@ts-ignore
  const [dataSource, setDataSource] = useState(() =>
    getMasterDetailGridDataSource(props.data.key)
  );
  console.log("dataSource in details2", dataSource);
  useEffect(() => {
    const data = getMasterDetailGridDataSource(props.data.key.TP_ID);
    //@ts-ignore
    setDataSource(data.store);
  }, [props.data.key]);
  const memoizedDataSource = useMemo(() => dataSource, [dataSource]);
  function getMasterDetailGridDataSource(id: any) {
    return {
      store: createStore({
        loadUrl: `${BASE_URL}orders/positions/products/${id}/1/1000`,
        onBeforeSend: async (e, ajaxOptions) => {
          // Alter the request to align with the REST interface
          console.log(ajaxOptions);
          ajaxOptions.method = "GET";
          ajaxOptions.headers = {
            //@ts-ignore
            Authorization: "Bearer " + JSON.parse(token),
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE",
            "Content-Type": "application/json",
          };

          ajaxOptions.xhrFields = { withCredentials: false };
          // ajaxOptions.xhrFields={token:`Bearer ${token}`}
        },
        onAjaxError: ({ xhr, error }) => {
          if (error) {
            console.log(error);
          }
        },
      }),
    };
  }

  const columnsDetails = [
    { name: "TI_ID", title: "TI ID" },
    { name: "TI_IDTP", title: "TI_IDTP" },
    { name: "TI_POS", title: "Pozycja" },
    { name: "TI_STATE", title: "Stan" },
    { name: "TI_BARCODE", title: "Kod kreskowy" },
    { name: "TI_STOJAK", title: "Stojak" },
    { name: "TI_ROZLICZONE", title: "Rozliczone" },
  ];

  //@ts-ignore
  const onRowPrepared = React.useCallback((e) => {
    if (e.rowType === "data") {
      if (e.data.TI_STATE === "W") {
        e.rowElement.style.backgroundColor = "#32CD32";
      } else if (e.data.TI_STATE === "O") {
        e.rowElement.style.backgroundColor = "#357EC7";
      } else if (e.data.TI_STATE === "P") {
        e.rowElement.style.backgroundColor = "#ffd500";
      } else if (e.data.TI_STATE === "H") {
        e.rowElement.style.backgroundColor = "#19e5e6";
      } else if (e.data.TI_STATE === "Z") {
        e.rowElement.style.backgroundColor = "#000";
      } else if (e.data.TI_STATE === "C") {
        e.rowElement.style.backgroundColor = "#98D1F8";
      } else if (e.data.TI_STATE === "R") {
        e.rowElement.style.backgroundColor = "#9AE39A";
      } else if (e.data.TI_STATE === "B") {
        e.rowElement.style.backgroundColor = "#118C4F";
      } else if (e.data.TI_STATE === "G") {
        e.rowElement.style.backgroundColor = "#87ceeb";
      } else if (e.data.TI_STATE === "D" || e.data.TI_STATE === "A") {
        e.rowElement.style.backgroundColor = "#B4B4B4";
      }
    }
  }, []);

  //@ts-ignore
  const customTextDetails = (cellData) => {
    return (
      <p
        style={{
          color: "black",
          textAlign: "right",
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
  //@ts-ignore
  const customTextLeft = (cellData) => {
    return (
      <p
        style={{
          color: "black",
          textAlign: "left",
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
  //@ts-ignore
  const customTextCenter = (cellData) => {
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
  //@ts-ignore
  const CustomCell = ({ data }) => {
    return (
      <td style={{ backgroundColor: "lightblue" }}>
        <span>{data.id}</span>
        <span>{data.nr_order}</span>
      </td>
    );
  };

  const renderTitleHeaderDetails = ({ data }: { data: any }) => {
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

  return (
    <React.Fragment>
      <DataGrid
        className={"dx-datagrid"}
        dataSource={memoizedDataSource}
        keyExpr="TI_ID"
        columnAutoWidth
        showBorders={false}
        //@ts-ignore
        // onCellPrepared={onCellPrepared}
        showRowLines={true}
        showColumnLines={false}
        // remoteOperations={true}
        onRowPrepared={onRowPrepared}
        wordWrapEnabled={true}
      >
        {columnsDetails.map((item) => (
          <Column
            dataType={'string'}
            alignment={
              item.name === "TI_ID" ||
              item.name === "TI_IDTP" ||
              item.name === "TI_BARCODE" ||
              item.name === "TI_STOJAK"
                ? "left"
                : item.name === "TI_ROZLICZONE" || item.name === "TI_STATE"
                ? "center"
                : "right"
            }
            key={item.name}
            dataField={item.name}
            caption={item.title}
            headerCellComponent={renderTitleHeaderDetails}
            cellRender={
              item.name === "TI_ID" ||
              item.name === "TI_IDTP" ||
              item.name === "TI_BARCODE" ||
              item.name === "TI_STOJAK"
                ? customTextLeft
                : item.name === "TI_ROZLICZONE" || item.name === "TI_STATE"
                ? customTextCenter
                : customTextDetails
            }
            cellComponent={CustomCell}
            showInColumnChooser={true}
            visible={
              item.name === "TI_IDTP" || item.name === "TI_ID" ? false : true
            }
          />
        ))}
      </DataGrid>
    </React.Fragment>
  );
};
