import { Box, Button, TextBox, Toast } from "devextreme-react";
import { Item } from "devextreme-react/box";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../business/reducer/store";
import { getString } from "../../locales/string";
import { AuthLayout } from "../auth/components/AuthLayout";
import GuestField from "../auth/components/GuestField";
import ProfileField from "../auth/components/ProfileField";
import { Navigate, useNavigate } from "react-router-dom";
import {
  DataGrid,
  Column,
  Toolbar,
  ColumnChooser,
  Grouping,
  GroupPanel,
} from "devextreme-react/data-grid";
import {
  // Grid,
  // Table,
  TableHeaderRow,
  TableGroupRow,
  TableColumnVisibility,
  // Toolbar,
  // ColumnChooser,
} from "@devexpress/dx-react-grid-material-ui";
import { data } from "../../locales/exampleDataGrid";
// import GridFiled from "../auth/components/GridFiled";
import { green } from "@mui/material/colors";
export const UsersListScreen = ({}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let value = localStorage.getItem("token");
  const token = useAppSelector((state) => state.auth.token);
  const [showToast, setShowToast] = useState(false);

  const columns = [
    { name: "nr_order", title: "Nr zamówienia" },
    { name: "dc_id", title: "DC ID" },
    { name: "date_order", title: "Data" },
    { name: "deadline", title: "Termin" },
    { name: "state_order", title: "Stan" },
    { name: "open", title: "Otwarte" },
    { name: "production", title: "Produkcja" },
    { name: "cutting", title: "Cięcie" },
    { name: "frame", title: "Ramki" },
    { name: "base", title: "Baza" },
    { name: "ready", title: "Gotowe" },
    { name: "sent", title: "Wysłane" },
    { name: "cancelled", title: "Anulowane" },
    { name: "nr_order_contractor", title: "Nr zam. (kontrachent)" },
    { name: "quantity", title: "Ilość" },
    { name: "settled", title: "Rozl." },
    { name: "short", title: "Skrót" },
    { name: "own_collection", title: "Odbiór własny" },
  ];

  const [tableColumnExtensions] = useState([
    { columnName: "gender", width: 100 },
  ]);
  const [hiddenColumnNames, setHiddenColumnNames] = useState([
    "dc_id",
    "open",
    "production",
    "cutting",
    "ready",
    "base",
    "frame",
    "sent",
    "cancelled",
  ]);
  const onHiding = () => {
    setShowToast(false);
  };

  const renderTitleHeader = ({ data }: { data: any }) => {
    return (
      <p
        style={{
          fontSize: "18px",
          color: "#081733",
          backgroundColor: "transparent",
          textAlign: "center",
          borderColor: "transparent",
          fontFamily: "Poppins",
        }}
      >
        {data.column.caption}
      </p>
    );
  };
  //@ts-ignore
  const onCellPrepared = (e) => {
    //e.cellElement.style.background = "linear-gradient(180deg, rgba(78, 119, 224, 0.5) 0%, rgba(94, 204, 255, 0.5) 33.65%, rgba(94, 192, 255, 0.5) 65.42%, rgba(86, 110, 231, 0.5) 100%)"
    e.cellElement.style.borderWidth = "0px";
  };

  //@ts-ignore
  const customText = (cellData) => {
    return (
      <p
        style={{
          color: "white",
          textAlign: "center",
          paddingTop: 15,
          paddingBottom: 15,
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
  return (
    <AuthLayout >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
          height: "100%",
          alignItems:'flex-start',
          marginTop:60
        }}
      >
        <div className="leftNavbar"></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          
          {/* <GridFiled> */}
            <DataGrid
              className={"dx-datagrid"}
              dataSource={data}
              keyExpr="id"
              columnAutoWidth
              showBorders={false}
              //@ts-ignore
              onCellPrepared={onCellPrepared}
            >
              {columns.map((item) => (
                <Column
                  dataField={item.name}
                  caption={item.title}
                  headerCellComponent={renderTitleHeader}
                  cellRender={customText}
                  cellComponent={CustomCell}
                  showInColumnChooser={true}
                  defaultVisible={
                    item.name === "open" ||
                    item.name === "production" ||
                    item.name === "cutting" ||
                    item.name === "frame" ||
                    item.name === "base" ||
                    item.name === "ready" ||
                    item.name === "sent" ||
                    item.name === "cancelled"
                      ? false
                      : true
                  }
                />
              ))}
              <ColumnChooser
                enabled={true}
                mode={"select"}
                title={"Pokaż kolumny"}
                height={350}
              />

              <Toolbar></Toolbar>
            </DataGrid>
            {/* <Grid rows={data} columns={columns}>
              <Table columnExtensions={tableColumnExtensions} />
              <TableHeaderRow />
              <TableColumnVisibility
                hiddenColumnNames={hiddenColumnNames}
                onHiddenColumnNamesChange={setHiddenColumnNames}
              />
              <Toolbar />
              <ColumnChooser />
            </Grid> */}
          {/* </GridFiled> */}
        </div>
      </div>
    </AuthLayout>
  );
};
