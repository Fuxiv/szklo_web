import React, { useEffect, useRef } from "react";
import {
  DataGrid,
  Column,
  ColumnChooser,
  Pager,
  Paging,
  MasterDetail,
  Editing,
  FormItem,
  Texts,
  Item,
  Toolbar,
  Scrolling,
} from "devextreme-react/data-grid";
import GridFiled from "./components/GridFiled";
import { DetailsColumnPos1 } from "./DetailsColumnPos1";
import LeftNavbar from "./components/LeftNavbar";

import { UserLayout } from "./components/UserLayout";
import { useNavigate } from "react-router-dom";
import { Button, SelectBox } from "devextreme-react";

import { OrderDataSource } from "./data/OrderDataSource";
import { useOrderFilterStore } from "./data/OrderStore";
import { dropDownList } from "../../business/action/dropDownListAction";
import { useAppDispatch } from "../../business/reducer/store";


export const OrdersListScreen = () => {
  const allowedPageSizes = [20];

  const navigate = useNavigate();

  const dcStateSymbols = useOrderFilterStore((state) => state.dcStateSymbols);
  const toggleDcStateSymbol = useOrderFilterStore(
    (state) => state.toggleDcStateSymbol
  );

  const dcTypes = useOrderFilterStore((state) => state.dcTypes);
  const toggleDcType = useOrderFilterStore((state) => state.toggleDcType);

  const year = useOrderFilterStore((state) => state.year);
  const setYear = useOrderFilterStore((state) => state.setYear);

  const columns = [
    { name: "DC_ID", title: "DC ID" },
    { name: "DC_GUID", title: "DC GUID" },
    { name: "DC_NO", title: "Nr zamówienia" },
    { name: "DC_TYPE", title: "Typ" },
    { name: "DC_DELIVERY", title: "Sposób dost." }, //
    { name: "DC_ADDRESS", title: "Adres dost." }, //
    { name: "DC_RTIME", title: "Czas rej. w sys." },
    { name: "DC_DTIME", title: "Sug. czas dost." },
    { name: "DC_ATIME", title: "Zaakc. czas dost." },
    { name: "DC_PTIME", title: "Plan. czas dost." },
    { name: "DC_STATE", title: "Stan" },
    { name: "DC_STATE_SYMBOL", title: "Stan symbol" },
    { name: "DC_C_TKID", title: "Id klienta" },
    { name: "DC_C_GUID", title: "Guid klienta" },
    { name: "DC_D_TKID", title: "Id dostawcy" },
    { name: "DC_CANCELLED", title: "Anulowany" },
    { name: "DC_SUSPENDED", title: "Wstrzymany" },
    { name: "DC_YEAR", title: "Rok" },
    { name: "DC_QNT", title: "Ilość prod." },
    { name: "DC_G_QNT", title: "Gotowe" },
    { name: "DC_T_QNT", title: "Wys/Trans" },
    { name: "DC_R_QNT", title: "Rozliczone" },
    { name: "DC_NETTO", title: "Netto" },
    { name: "DC_VAT", title: "VAT" },
    { name: "DC_BRUTTO", title: "Brutto" },
    { name: "DC_C_NUMBER", title: "Nr. zam. u zam." }, //
    { name: "DC_WEIGHT", title: "Ciężar" },
    { name: "DC_CONTACT", title: "Kontakt" }, //
    { name: "DC_COMMENTS", title: "" }, //

  ];


  const gridRef = useRef(null);
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
          paddingBottom: 10,
          fontWeight: 600,
        }}
      >
        {data.column.caption}
      </p>
    );
  };

  //@ts-ignore
  const onCellPrepared = React.useCallback((e) => {
    e.cellElement.style.background = "trnsparent";
    e.cellElement.style.borderWidth = "1px";
  }, []);
  //@ts-ignore
  const onRowPrepared = React.useCallback((e) => {
    if (e.rowType === "data") {
      if (e.data.DC_STATE === "W") {
        e.rowElement.style.backgroundColor = "#32CD32";
      } else if (e.data.DC_STATE === "O") {
        e.rowElement.style.backgroundColor = "#357EC7";
      } else if (e.data.DC_STATE === "P") {
        e.rowElement.style.backgroundColor = "#ffd500";
      } else if (e.data.DC_STATE === "H") {
        e.rowElement.style.backgroundColor = "#19e5e6";
      } else if (e.data.DC_STATE === "Z") {
        e.rowElement.style.backgroundColor = "#000";
      } else if (e.data.DC_STATE === "C") {
        e.rowElement.style.backgroundColor = "#98D1F8";
      } else if (e.data.DC_STATE === "R") {
        e.rowElement.style.backgroundColor = "#9AE39A";
      } else if (e.data.DC_STATE === "B") {
        e.rowElement.style.backgroundColor = "#118C4F";
      } else if (e.data.DC_STATE === "G") {
        e.rowElement.style.backgroundColor = "#87ceeb";
      } else if (e.data.DC_STATE === "D" || e.data.DC_STATE === "A") {
        e.rowElement.style.backgroundColor = "#B4B4B4";
      }
    }
  }, []);

  //@ts-ignore
  const customText = (cellData) => {
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
  const rowData = (e: any) => {
    var data = e.data;
    navigate("/admin/ordersList/edit", { state: { data } });
  };


  const doubleClick=(e: any) => {
    var data = e.data;
    navigate("/admin/ordersList/edit", { state: { data } });
  };
  const handlePropertyChange = (e: any) => {
    if (e.name === "O") {
    }
  };
  //@ts-ignore
  const cellTemplate = (data) => {
    // console.log("data", data.value);
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
        {data.value === 200
          ? "odbiór-stojaki"
          : data.value === 100
          ? "dostawa-stojaki"
          : data.value === 250
          ? "odbiór-luzem"
          : null}
      </p>
      // <img
      //   alt="icon"
      //   src={data.value === "T" ? "/icons/check.svg" : "/icons/warning.svg"}
      // ></img>
    );
  };
  const cellTemplateDetails = (data:any) => {
    // console.log("data", data.value);
    return (
      <>
      {data.value.length >0 ?
      <img
        alt="icon"
        src={ "/icons/warning.svg"}
      ></img> : null}</>
    );
  };

  return (
    <UserLayout>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <div style={{ width: "12%" }}>
          <LeftNavbar />
        </div>

        <div
          style={{
            width: "88%",
            display: "flex",
          }}
        >
          <GridFiled>
            <DataGrid
              ref={gridRef}
              className={"dx-datagrid"}
              dataSource={OrderDataSource}
              keyExpr="DC_ID"
              columnAutoWidth
              showBorders={false}
              //@ts-ignore
              onCellPrepared={onCellPrepared}
              showRowLines={true}
              showColumnLines={false}
              onRowPrepared={onRowPrepared}
              wordWrapEnabled={true}
              onEditingStart={rowData}
              remoteOperations={{
                paging: true,
              }}
              onInitNewRow={rowData}
              repaintChangesOnly={true}
              onOptionChanged={handlePropertyChange}
              onCellDblClick={doubleClick}
            >
              
              {columns.map((item) => (
                <Column
                  dataType={'string'}
                  alignment={
                    item.name === "DC_NUMBER" ||
                    item.name === "DC_DATE" ||
                    item.name === "DC_DDATE" ||
                    item.name === "DC_ZAM_KLIENTA" ||
                    item.name === "DC_SHORT"
                      ? "left"
                      : item.name === "DC_ODBIOR_WLASNY" ||
                        item.name === "DC_STATE"
                      ? "center"
                      : "right"
                  }
                  key={item.name}
                  dataField={item.name}
                  caption={item.title}
                  headerCellComponent={renderTitleHeader}
                  cellRender={
                    item.name === "DC_NUMBER" ||
                    item.name === "DC_DATE" ||
                    item.name === "DC_DDATE" ||
                    item.name === "DC_ZAM_KLIENTA" ||
                    item.name === "DC_SHORT"
                      ? customTextLeft
                      : item.name === "DC_ODBIOR_WLASNY" ||
                        item.name === "DC_STATE"
                      ? customTextCenter
                      : item.name === "DC_DELIVERY"
                      ? cellTemplate 
                      : item.name === "DC_COMMENTS" ? cellTemplateDetails : customText
                  }
                  cellComponent={CustomCell}
                  showInColumnChooser={true}
                  visible={
                    item.name === "DC_ID" ||
                    item.name === "DC_GUID" ||
                    item.name === "DC_ADDRESS" ||
                    item.name === "DC_RTIME" ||
                    item.name === "DC_DTIME" ||
                    item.name === "DC_ATIME" ||
                    item.name === "DC_PTIME" ||
                    item.name === "STATE" ||
                    item.name === "DC_C_TKID" ||
                    item.name === "DC_D_TKID" ||
                    item.name === "DC_C_GUID" ||
                    item.name === "DC_YEAR" ||
                    item.name === "DC_NETTO" ||
                    item.name === "DC_VAT" ||
                    item.name === "DC_BRUTTO" ||
                    item.name === "DC_C_NUMBER" ||
                    item.name === "DC_WEIGHT" ||
                    item.name === "DC_CONTACT" ||
                    item.name === "DC_STATE_SYMBOL" 
                    // item.name === "DC_COMMENTS"
                      ? false
                      : true
                  }
                >
                  
                  <FormItem
                    visible={
                      item.name === "DC_DELIVERY" ||
                      item.name === "DC_ADDRESS" ||
                      item.name === "DC_COMMENTS" ||
                      item.name === "DC_C_NUMBER" ||
                      item.name === "DC_CONTACT"
                        ? true
                        : false
                    }
                  />
                </Column>
              ))}
           <Editing
                mode="popup"
                allowUpdating={true}
                allowAdding={true}
                allowDeleting={true}
                popup={{ width: "100%", height: "100%" }}
                useIcons
                
              >
                <Texts
                  confirmDeleteMessage={"Czy chcesz usunąć tą pozycje?"}
                  editRow={"Edytuj"}
                  deleteRow={"Usuń"}
                />
              </Editing>
        

              <ColumnChooser
                enabled={true}
                mode={"select"}
                title={"Pokaż/ukryj kolumny"}
                height={"100%"}
              />
              <Paging defaultPageSize={15} />
              <Pager
                infoText={`Strona {0} z {1} ({2} rekordów)`}
                // showPageSizeSelector={true}
                visible={true}
                allowedPageSizes={allowedPageSizes}
                showNavigationButtons={true}
              />
              <MasterDetail enabled={true} component={DetailsColumnPos1} />
              <Toolbar>
               
                <Item location="center">
                  <Button
                    id={
                      dcStateSymbols.includes("O")
                        ? "selectButtonFilter"
                        : "buttonFilter"
                    }
                    text="O"
                    onClick={() => toggleDcStateSymbol("O")}
                  />
                  <Button
                    id={
                      dcStateSymbols.includes("Z")
                        ? "selectButtonFilter"
                        : "buttonFilter"
                    }
                    text="Z"
                    onClick={() => toggleDcStateSymbol("Z")}
                  />
                  <Button
                    id={
                      dcStateSymbols.includes("A")
                        ? "selectButtonFilter"
                        : "buttonFilter"
                    }
                    text="A"
                    onClick={() => toggleDcStateSymbol("A")}
                  />
                  <Button
                    id={
                      dcStateSymbols.includes("P")
                        ? "selectButtonFilter"
                        : "buttonFilter"
                    }
                    text="P"
                    onClick={() => toggleDcStateSymbol("P")}
                  />
                  <Button
                    id={
                      dcStateSymbols.includes("G")
                        ? "selectButtonFilter"
                        : "buttonFilter"
                    }
                    text="G"
                    onClick={() => toggleDcStateSymbol("G")}
                  />
                  <Button
                    id={
                      dcStateSymbols.includes("W")
                        ? "selectButtonFilter"
                        : "buttonFilter"
                    }
                    text="W"
                    onClick={() => toggleDcStateSymbol("W")}
                  />
                  <Button
                    id={
                      dcStateSymbols.includes("D")
                        ? "selectButtonFilter"
                        : "buttonFilter"
                    }
                    text="D"
                    onClick={() => toggleDcStateSymbol("D")}
                  />
                  <Button
                    id={
                      dcStateSymbols.includes("X")
                        ? "selectButtonFilter"
                        : "buttonFilter"
                    }
                    text="X"
                    onClick={() => toggleDcStateSymbol("X")}
                  />
                </Item>
                <Item location="center">
                  <div style={{ marginLeft: 20 }}>
                    <Button
                      id={
                        dcTypes.includes("S")
                          ? "selectButtonFilter"
                          : "buttonFilter"
                      }
                      text="S"
                      onClick={() => toggleDcType("S")}
                    />
                    <Button
                      id={
                        dcTypes.includes("V")
                          ? "selectButtonFilter"
                          : "buttonFilter"
                      }
                      text="V"
                      onClick={() => toggleDcType("V")}
                    />
                    <Button
                      id={
                        dcTypes.includes("R")
                          ? "selectButtonFilter"
                          : "buttonFilter"
                      }
                      text="R"
                      onClick={() => toggleDcType("R")}
                    />
                  </div>
                </Item>
                <Item location="center">
                  <SelectBox
                    height={32}
                    style={{ marginLeft: 20 }}
                    dataSource={[
                      undefined,
                      ...Array.from({ length: 100 })
                        .fill(new Date())
                        .map((d: any, i) => d.getFullYear() - i),
                    ]}
                    value={year}
                    onValueChange={setYear}
                    placeholder="Rok"
                  />
                </Item>
                <Item
                  name="addRowButton"
                  // options={buttonOptions}
                  widget="dxButton"
                />
                <Item
                  name="columnChooserButton"
                  // options={buttonOptions}
                  widget="dxButton"
                />
              </Toolbar>
              {/* <HeaderFilter visible={true}  dataSource={headerFilterData}/> */}
            </DataGrid>
          </GridFiled>
        </div>
      </div>
    </UserLayout>
  );
};
