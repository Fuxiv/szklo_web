import React, { useEffect, useState } from "react";
import {
  DataGrid,
  Column,
  MasterDetail,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import { createStore } from "devextreme-aspnet-data-nojquery";
import { BASE_URL } from "../../axios/instance";
import { DetailsColumnPos2 } from "./DetailsColumnPos2";

export const DetailsColumnPos1 = (props: any) => {
  //@ts-ignore

  //@ts-ignore
  const [dataSource, setDataSource] = useState([]);
  let token = localStorage.getItem("token");
  //@ts-ignore
  // console.log('datas',dataSource.data)

  useEffect(() => {
    const x = getMasterDetailGridDataSource(props.data.key);
    //@ts-ignore
    setDataSource(x);
  }, [props.data.key]);

  function getMasterDetailGridDataSource(id: any) {
    return {
      store: createStore({
        loadUrl: `${BASE_URL}order/positions/${id}/1/100000`,
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
    { name: "TP_ID", title: "TP ID" },
    { name: "TP_DCID", title: "TP DCID" },
    { name: "TP_POS", title: "Symbol" },
    { name: "TP_SYMBOL", title: "Symbol" },
    { name: "TP_NAME", title: "Nazwa" },
    { name: "TP_TYPE", title: "Typ produktu" },
    { name: "TP_QNT", title: "Ilość" },
    { name: "TP_STATE", title: "Stan" },
    { name: "TP_G_QNT", title: "Gotowe" },
    { name: "TP_R_QNT", title: "Rozliczone" },
    { name: "TP_T_QNT", title: "Wysł/trans" },
    { name: "TP_W", title: "Szerokość" },
    { name: "TP_H", title: "Wysokość" },
    { name: "TP_SHAPE", title: "Nr kształtu" },
    { name: "TP_IDENT", title: "Identyfikator" },
    { name: "TP_WEIGHT ", title: "Waga" },
    { name: "TP_MUNTINS ", title: "Szprosy" },

  ];

  //@ts-ignore
  const onRowPrepared = React.useCallback((e) => {
    if (e.rowType === "data") {
      if (e.data.TP_STATE === "W") {
        e.rowElement.style.backgroundColor = "#32CD32";
      } else if (e.data.TP_STATE === "O") {
        e.rowElement.style.backgroundColor = "#357EC7";
      } else if (e.data.TP_STATE === "P") {
        e.rowElement.style.backgroundColor = "#ffd500";
      } else if (e.data.TP_STATE === "H") {
        e.rowElement.style.backgroundColor = "#19e5e6";
      } else if (e.data.TP_STATE === "Z") {
        e.rowElement.style.backgroundColor = "#000";
      } else if (e.data.TP_STATE === "C") {
        e.rowElement.style.backgroundColor = "#98D1F8";
      } else if (e.data.TP_STATE === "R") {
        e.rowElement.style.backgroundColor = "#9AE39A";
      } else if (e.data.TP_STATE === "B") {
        e.rowElement.style.backgroundColor = "#118C4F";
      } else if (e.data.TP_STATE === "G") {
        e.rowElement.style.backgroundColor = "#87ceeb";
      } else if (e.data.TP_STATE === "D" || e.data.TP_STATE === "A") {
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
          textOverflow: "ellipsis",
          overflow: "hidden",
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
  const onCellPrepared = (e: any) => {
    e.cellElement.style.background = "trnsparent";
    e.cellElement.style.borderWidth = "1px";
  };
  console.log("props", props);
  return (
    <React.Fragment>
      <DataGrid
        className={"dx-datagrid"}
        dataSource={dataSource}
        keyExpr="TP_ID"
        columnAutoWidth
        showBorders={false}
        //@ts-ignore
        // onCellPrepared={onCellPrepared}
        showRowLines={true}
        showColumnLines={false}
        onRowPrepared={onRowPrepared}
        wordWrapEnabled={true}
        noDataText={"Brak danych"}

      >
        {props.data.data.DC_COMMENTS ? 
        <Toolbar>
          <Item location={"before"}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p
                style={{ fontFamily: "Poppins", fontSize: 13, fontWeight: 800 }}
              >
                Uwagi:
              </p>
              <p style={{ marginLeft: 20 }}>{props.data.data.DC_COMMENTS}</p>
            </div>
          </Item>
        </Toolbar> : null}
        {columnsDetails.map((item) => (
          <Column
           dataType={'string'}
            alignment={
              item.name === "TP_SYMBOL" ||
              item.name === "TP_NAME" ||
              item.name === "TP_ZLEC40" ||
              item.name === "TP_ODBIORCA"
                ? "left"
                : item.name === "TP_STATE"
                ? "center"
                : "right"
            }
            key={item.name}
            dataField={item.name}
            caption={item.title}
            headerCellComponent={renderTitleHeaderDetails}
            cellRender={
              item.name === "TP_SYMBOL" ||
              item.name === "TP_NAME" ||
              item.name === "TP_ZLEC40" ||
              item.name === "TP_ODBIORCA"
                ? customTextLeft
                : item.name === "TP_STATE"
                ? customTextCenter
                : customTextDetails
            }
            cellComponent={CustomCell}
            showInColumnChooser={true}
            visible={
              item.name === "TP_ID" || item.name === "TP_DCID" ? false : true
            }
          />
        ))}
      </DataGrid>
    </React.Fragment>
  );
};
