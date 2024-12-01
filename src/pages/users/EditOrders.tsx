import { createStore } from "devextreme-aspnet-data-nojquery";
import { DataGrid, Toast } from "devextreme-react";
import {
  Column,
  Editing,
  Pager,
  Paging,
  Summary,
  Texts,
  TotalItem,
  Button,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../axios/instance";
import { getString } from "../../locales/string";
import EditLeyout from "./components/EditLeyout";
import { exportDataGrid } from "devextreme/excel_exporter";
import { Workbook } from "exceljs";
//@ts-ignore
import saveAs from "file-saver";
import { PopupEdit } from "./components/PopupEdit";
import { ButtonEdit } from "./components/ButtonEdit";
import { ButtonToolbar } from "./components/ButtonToolbar";
import { InputEdit } from "./components/InputEdit";
import axios from "axios";
import { FormArea } from "./components/FormArea";
import { useAppDispatch, useAppSelector } from "../../business/reducer/store";
import { editOrder, editPosition } from "../../business/action/editAction";
import { AttachmentArea } from "./components/AttachmentArea";
import Validator, { RequiredRule } from "devextreme-react/validator";
import {
  customTextCenter,
  customTextDetails,
  customTextLeft,
  renderTitleHeaderDetails,
} from "./components/CustomText";
import { ParametrsArea } from "./components/ParametrsArea";
import ValidationGroup from 'devextreme-react/validation-group';

export const EditOrders = (props: any) => {
  const { state } = useLocation();
  let dropDownListData = localStorage.getItem("listDropDown");
  //@ts-ignore
  const filteredList = JSON.parse(dropDownListData).data?.config?.lists?.filter(
    (item: any) => item.LI_FIELDNAME === "DC_TYPE"
  );
  //@ts-ignore
  const filteredListDelivery = JSON.parse(dropDownListData).data?.config?.lists?.filter(
    (item: any) => item.LI_FIELDNAME === "DC_DELIVERY"
  );
  //@ts-ignore
  const filteredListType = JSON.parse(dropDownListData).data?.config?.lists?.filter((item: any) => item.LI_FIELDNAME === "TP_TYPE");
  const navigate = useNavigate();
  const [dcId, setDcId] = useState(state.data.DC_ID);
  const [numberOrders, setNumberOrders] = useState(state.data.DC_NO);
  const [numberContractor, setNumberContractor] = useState(
    state.data.DC_C_NUMBER
  );
  const [comments, setComments] = useState(state.data.DC_COMMENTS);
  const [adresse, setAdresse] = useState(state.data.DC_ADDRESS);
  const [contact, setContact] = useState(state.data.DC_CONTACT);
  const [type, setType] = useState(
    state.data.DC_TYPE
      ? state.data.DC_TYPE
      : filteredList[0].items
          .filter((item: any) => item.LIL_DEFAULT === "T")
          .map((item: any) => item.LIL_VALUE)[0]
  );
  const [stateOrder, setStateOrder] = useState(state.data.DC_STATE_TEXT);
  const [dateRegister, setDateRegister] = useState(state.data.DC_RTIME);
  const [dateDelivery, setDateDelivery] = useState(state.data.DC_DTIME);
  const [deliveryMethod, setDeliveryMethod] = useState(
    state.data.DC_DELIVERY
      ? state.data.DC_DELIVERY
      : filteredListDelivery[0].items
          .filter((item: any) => item.LIL_DEFAULT === "T")
          .map((item: any) => item.LIL_VALUE)[0]
  );
  const [showToast, setShowToast] = useState(false);
  const [showToastAdd, setShowToastAdd] = useState(false);
  const [activePage, setActivePage] = useState("Pozycje");
  const [tpId, setTpId] = useState("");
  const [tpDcId, setTpDcId] = useState("");
  const [tpGQnt, setTpGQnt] = useState("");
  const [tpIdent, setTpIdent] = useState("");
  const [tpName, setTpName] = useState("");
  const [tpPos, setTpPos] = useState("");
  const [tpQnt, setTpQnt] = useState("");
  const [tpRQnt, setTpRQnt] = useState("");
  const [tpShape, setTpShape] = useState(false);
  const [tpTQnt, setTpTQnt] = useState<number>(0);
  const [tpSymbol, setTpSymbol] = useState("");
  const [tpType, setTpType] = useState("");
  const [tpW, setTpW] = useState<number>();
  const [tpH, setTpH] = useState<number>();
  const [tpMuntins, setTpMuntins] = useState(false);
  const [tpWeight, setTpWeight] = useState<number>(0);
  let totalWeight = tpTQnt * tpWeight;
  const [tpIdRefreshData, setTpIdRefreshData] = useState();
  const [dataSource, setDataSource] = useState([]);
  const dispatch = useAppDispatch();
  let token = localStorage.getItem("token");
  console.log(token);
  const [toastCheckData, setToastCheckData] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  //@ts-ignore
  const data = useAppSelector((state) => state.editParamsOrder.dataEdit);

  const onHiding = () => {
    setShowToast(false);
    setShowToastAdd(false);
    setToastCheckData(false);
  };

  const saveEditingOrder = async () => {
    // validateGroup()
    if (
      deliveryMethod !== undefined &&
      type !== undefined &&
      contact.length > 0
    ) {
      const data = JSON.stringify({
        data: {
          DC_ID: state.data.DC_ID === undefined ? 0 : state.data.DC_ID,
          DC_NO: numberOrders,
          DC_C_NUMBER: numberContractor,
          DC_COMMENTS: comments,
          DC_ADDRESS: adresse,
          DC_DTIME: dateDelivery,
          DC_CONTACT: contact,
          DC_DELIVERY: deliveryMethod,
          DC_TYPE: type,
        },
      });
      const res = await dispatch(
        editOrder(data, dcId !== undefined ? dcId : state.data.DC_ID, token)
      );
      //@ts-ignore
      if (res) {
        if (dcId === undefined) {
          //@ts-ignore
          setNumberOrders(res?.data?.data[0].DC_NO);
          //@ts-ignore
          setDcId(res?.data?.data[0].DC_ID);
          //@ts-ignore
          setDateRegister(res?.data?.data[0].DC_RTIME);
          //@ts-ignore
          setStateOrder(res?.data?.data[0].DC_STATE_TEXT)
          setShowToastAdd(true);
        } else {
          setShowToast(true);
        }
      }
    } else setToastCheckData(true);
  };

  useEffect(() => {
    const id =
      dcId !== undefined
        ? dcId
        : state.data.DC_ID === undefined
        ? 0
        : state.data.DC_ID;
    const x = getMasterDetailGridDataSource(id);
    //@ts-ignore
    setDataSource(x);
    // getListImage();
  }, [tpIdRefreshData]);

  function getMasterDetailGridDataSource(id: any) {
    return {
      store: createStore({
        key: "TP_ID",
        loadUrl: `${BASE_URL}order/positions/${id}/1/100000`,
        deleteUrl: `${BASE_URL}order/positions/${id}/1/100000`,
        deleteMethod: "POST",
        updateMethod: "PUT",
        insertMethod: "PUT",
        onRemoving(key) {
          return fetch(`${BASE_URL}order/position/delete/${key}`, {
            method: "POST",
            //@ts-ignore
            headers: {
              //@ts-ignore
              Authorization: "Bearer " + JSON.parse(token),
              "Access-Control-Allow-Headers":
                "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE",
              "Content-Type": "application/json",
            },
          });
        },
        onBeforeSend: async (e, ajaxOptions) => {
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
        },
        onAjaxError: ({ xhr, error }) => {
          if (error) {
          }
        },
      }),
    };
  }

  const columnsDetails = [
    { name: "TP_ID", title: "TP ID" },
    { name: "TP_DCID", title: "TP DCID" },
    { name: "TP_POS", title: "Pozycja" },
    { name: "TP_SYMBOL", title: "Symbol" },
    { name: "TP_NAME", title: "Nazwa" },
    { name: "TP_TYPE", title: "Typ produktu" },
    { name: "TP_STATE", title: "Stan" },
    { name: "TP_QNT", title: "Ilość" },
    { name: "TP_G_QNT", title: "Gotowe" },
    { name: "TP_R_QNT", title: "Rozliczone" },
    { name: "TP_T_QNT", title: "Wysł/trans" },
    { name: "TP_W", title: "Szerokość" },
    { name: "TP_H", title: "Wysokość" },
    { name: "TP_SHAPE", title: "Nr kształtu" },
    { name: "TP_IDENT", title: "Identyfikator" },
    { name: "TP_WEIGHT", title: "Waga" },
    { name: "TP_MUNTINS", title: "Szprosy" },
  ];

  //@ts-ignore
  const CustomCell = ({ data }) => {
    return (
      <td style={{ backgroundColor: "lightblue" }}>
        <span>{data.id}</span>
        <span>{data.nr_order}</span>
      </td>
    );
  };

  const grid = useRef();
  const onClick = useCallback(() => {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("SheetName");

    exportDataGrid({
      //@ts-ignore
      component: grid?.current?.instance,
      worksheet: worksheet,
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "dataGrid.xlsx"
        );
      });
    });
  }, []);

  const editRow = (e: any) => {
    setTpId(e.row.data.TP_ID === undefined ? 0 : e.row.data.TP_ID);
    setTpDcId(e.row.data.TP_DCID === undefined ? dcId : e.row.data.TP_DCID);
    setTpQnt(e.row.data.TP_QNT);
    setTpGQnt(e.row.data.TP_STATE_TEXT);
    setTpH(e.row.data.TP_H);
    setTpIdent(e.row.data.TP_IDENT);
    setTpName(e.row.data.TP_NAME);
    setTpPos(e.row.data.TP_POS);
    setTpRQnt(e.row.data.TP_R_QNT);
    setTpShape(e.row.data.TP_SHAPE === 0 ? false : true);
    setTpTQnt(e.row.data.TP_QNT);
    setTpSymbol(e.row.data.TP_SYMBOL);
    setTpType(
      e.row.data.TP_TYPE
        ? e.row.data.TP_TYPE
        : filteredListType[0].items
            .filter((item: any) => item.LIL_DEFAULT === "T")
            .map((item: any) => item.LIL_VALUE)[0]
    );
    setTpW(e.row.data.TP_W);
    setTpMuntins(e.row.data.TP_MUNTINS === "T" ? true : false);
    setTpWeight(e.row.data.TP_WEIGHT);
    setShowPopup(true);
  };

  const saveEdit = async () => {
    const data = JSON.stringify({
      data: {
        TP_ID: tpId,
        TP_DCID: dcId,
        DC_NO: dcId,
        TP_POS: tpPos,
        TP_SYMBOL: tpSymbol,
        TP_NAME: tpName,
        TP_TYPE: tpType,
        TP_QNT: tpTQnt,
        TP_G_QNT: tpGQnt,
        TP_R_QNT: tpRQnt,
        TP_T_QNT: tpTQnt,
        TP_W: tpW,
        TP_H: tpH,
        TP_SHAPE: tpShape === true ? "1" : "0",
        TP_IDENT: tpIdent,
        TP_MUNTINS: tpMuntins === true ? "T" : "N",
        TP_WEIGHT: tpWeight,
      },
    });
    const res = await dispatch(editPosition(data, tpId, token));
    //@ts-ignore
    //@ts-ignore
    setTpIdRefreshData(res?.data?.data[0]?.TP_ID);
    setTpId("");
    setTpDcId("");
    setTpQnt("");
    setTpGQnt("");
    setTpH(0);
    setTpIdent("");
    setTpName("");
    setTpPos("");
    setTpRQnt("");
    setTpShape(false);
    setTpTQnt(0);
    setTpSymbol("");
    setTpType("");
    setTpW(0);
    setShowPopup(!showPopup);
    setTpWeight(0);
    setTpMuntins(false);
  };

  const buttonOptions = {
    // type: "back",
    // text: "Back",
    onClick: function (e: any) {
      let result = e.validationGroup.validate();
      setTpDcId(dcId);
      if (
        deliveryMethod !== undefined &&
        type !== undefined &&
        contact !== undefined &&
        numberOrders === undefined
      ) {
        saveEditingOrder();
        setShowPopup(true);
        // setTpId(0);
      } else if (numberOrders !== undefined) {
        setShowPopup(true);
      }
      // console.log("tpid", tpDcId);
      //@ts-ignore
      setTpId(0);
      setTpDcId(numberOrders);
    },
  };

const saveEmptyOrderFromAttachment=(e:any)=>{
  let result = e.validationGroup.validate();
  setTpDcId(dcId);
  if (
    deliveryMethod !== undefined &&
    type !== undefined &&
    contact !== undefined &&
    numberOrders === undefined
  ) {
    saveEditingOrder();
  } 
}

  const closeEdit = () => {
    setTpId("");
    setTpDcId("");
    setTpQnt("");
    setTpGQnt("");
    setTpH(0);
    setTpIdent("");
    setTpName("");
    setTpPos("");
    setTpRQnt("");
    setTpShape(false);
    setTpTQnt(0);
    setTpSymbol("");
    setTpType("");
    setTpW(0);
    setShowPopup(!showPopup);
    setTpWeight(0);
    setTpMuntins(false);
  };

  const handleClickDownload = async () => {
    await axios
      .get(`http://188.123.215.22:8082/order/download?DC_ID=${dcId}`, {
        responseType: "blob",
        // timeout: 50000,
        headers: {
          //@ts-ignore
          Authorization: "Bearer " + JSON.parse(token),
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Origin,Accept,Content-Disposition, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
          // "Access-Control-Allow-Credentials": true,
          // "Access-Control-Allow-Origin": "*",
          // "Content-Type": "application/json",
        },
      })
      .then((res) => {
        try {
          const x = window.URL.createObjectURL(new Blob([res.data]));
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = x;
          const contentDispositionHeader = 'attachment; filename="Z_115.json"';
          const match = contentDispositionHeader.match(
            /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i
          );
          const fileName = match ? match[1].replace(/['"]/g, "") : "unknown";
          // const fileName = res.headers['content-disposition'][0];
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(x);
          a.remove();
        } catch (e) {
          console.error("MessageFile::handleClick:", e);
        }
      });
  };

  const summaryPosition = useCallback((e: any) => {
    return `Ilość: ${e.value}`;
  }, []);
  const summaryQuantity = useCallback((e: any) => {
    return `Ilość: ${e.value}`;
  }, []);

  const summaryWeight = useCallback((e: any) => {
    return `Suma: ${e.value}`;
  }, []);

  const validationGroupRef = useRef(null);

  const validateGroup = () => {
    //@ts-ignore
    validationGroupRef.current.instance.validate();
  };
  return (
    <EditLeyout>
      <Toast
        id={"toastRegister"}
        visible={showToast}
        message={"Zapisano edycję"}
        type={"success"}
        onHiding={onHiding}
        displayTime={1000}
        position={"top center"}
        width={"50%"}
        height={70}
      />
      <Toast
        id={"toastRegister"}
        visible={showToastAdd}
        message={"Dodano zamówienie"}
        type={"success"}
        onHiding={onHiding}
        displayTime={1000}
        position={"top center"}
        width={"50%"}
        height={70}
      />
      <Toast
        id={"toastRegister"}
        visible={toastCheckData}
        message={"Uzupełnij wymagane pola"}
        type={"error"}
        onHiding={onHiding}
        displayTime={1000}
        position={"top center"}
        width={"50%"}
        height={70}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "100vh",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <ButtonEdit
            id={"backArrow"}
            text={getString("buttons", "back")}
            icon={"/icons/arrowBack.svg"}
            onClick={() => navigate(-1)}
            width={"20%"}
            style={{ alignSelf: "left", display: "flex" }}
          />
          <FormArea
            valueNumberOrders={numberOrders}
            onChangeNumberOrders={(v?: any) => setNumberOrders(v.value)}
            valueType={type}
            onChangeType={(v?: any) => setType(v.value)}
            valueNumberContractor={numberContractor}
            onChangeNumberContractor={(v?: any) => setNumberContractor(v.value)}
            valueDateDelivery={dateDelivery}
            onChangeDateDelivery={(v?: any) => setDateDelivery(v.value)}
            valueDeliveryMethod={deliveryMethod}
            onChangeDeliveryMethod={(v?: any) => setDeliveryMethod(v.value)}
            valueComments={comments}
            onChangeComments={(v?: any) => setComments(v.value)}
            valueAdresse={adresse}
            onChangeAdresse={(v?: any) => setAdresse(v.value)}
            valueStateOrder={stateOrder}
            valueDateRegister={dateRegister}
            // valueContact={contact}
            // onChangeContact={(v?: any) => setContact(v.value)}
          />
          <div
            style={{
              width: "80%",
              marginTop: 10,
              paddingBottom: 20,
              marginLeft: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                marginTop: 20,
              }}
            >
              <ButtonToolbar
                id={
                  activePage === "Pozycje"
                    ? "selectbuttonToolbar"
                    : "buttonToolbar"
                }
                text="Pozycje"
                onClick={() => setActivePage("Pozycje")}
                style={{ borderTopLeftRadius: 3, borderBottomLeftRadius: 3 }}
              />
              <ButtonToolbar
                id={
                  activePage === "Parametry"
                    ? "selectbuttonToolbar"
                    : "buttonToolbar"
                }
                text="Parametry"
                onClick={(e: any) => {
                  let result = e.validationGroup.validate();
                  if(dcId===undefined) setToastCheckData(true)
                  if (dcId !== undefined) setActivePage("Parametry");
                  if (
                    deliveryMethod !== undefined &&
                    type !== undefined &&
                    contact !== undefined &&
                    numberOrders === undefined
                  ) {
                    saveEditingOrder().then(() => setActivePage("Parametry"));
                  }
                  // setActivePage("Parametry")
                }}
              />
              <ButtonToolbar
                id={
                  activePage === "Załączniki"
                    ? "selectbuttonToolbar"
                    : "buttonToolbar"
                }
                text="Załączniki"
                onClick={(e: any) => {
                  let result = e.validationGroup.validate();
                  if(dcId===undefined) setToastCheckData(true)
                  if (dcId !== undefined) setActivePage("Załączniki");
                  if (
                    deliveryMethod !== undefined &&
                    type !== undefined &&
                    contact !== undefined &&
                    numberOrders === undefined
                  ) {
                    saveEditingOrder().then(() => setActivePage("Załączniki"));
                  }
                  // setActivePage("Parametry")
                }}
                // onClick={() => {
                //   setActivePage("Załączniki");
                //   // getListImage();
                // }}
                style={{ borderTopRightRadius: 3, borderBottomRightRadius: 3 }}
              />
            </div>
          </div>
          {activePage === "Załączniki" ? (
            <AttachmentArea />
          ) : activePage === "Parametry" ? (
            <ParametrsArea dcId={dcId} />
          ) : (
            <DataGrid
              //@ts-ignore
              ref={grid}
              style={{ marginTop: -20 }}
              className={"dx-datagrid"}
              dataSource={dataSource}
              keyExpr="TP_ID"
              columnAutoWidth
              showBorders={false}
              showRowLines={true}
              showColumnLines={false}
              // onRowPrepared={onRowPrepared}
              wordWrapEnabled={true}
              noDataText={"Brak danych"}
              // scrolling={{showScrollbar:'always',useNative:false}}
            >
              {columnsDetails.map((item) => (
                <Column
                  alignment={
                    item.name === "TP_SYMBOL" || item.name === "TP_NAME"
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
                    item.name === "TP_SYMBOL" || item.name === "TP_NAME"
                      ? customTextLeft
                      : item.name === "TP_STATE"
                      ? customTextCenter
                      : customTextDetails
                  }
                  cellComponent={CustomCell}
                  showInColumnChooser={true}
                  visible={
                    item.name === "TP_ID" || item.name === "TP_DCID"
                      ? false
                      : true
                  }
                />
              ))}

              <Editing
                mode="popup"
                allowUpdating={state.data.DC_STATE > 0 ? false : true}
                allowAdding={true}
                allowDeleting={state.data.DC_STATE > 0 ? false : true}
                useIcons
              >
                <Texts
                  confirmDeleteMessage={"Czy chcesz usunąć tą pozycje?"}
                  cancelRowChanges={"Zamknij"}
                  saveRowChanges={"Zapisz"}
                  confirmDeleteTitle={"Usuń"}
                  editRow={"Edytuj"}
                  deleteRow={"Usuń"}
                />
              </Editing>
              <Column type="buttons" width={110}>
                <Button name="edit" onClick={(e: any) => editRow(e)} />
                <Button name="delete" />
              </Column>
              <Toolbar>
                <Item
                  name="addRowButton"
                  options={buttonOptions}
                  widget="dxButton"
                />
              </Toolbar>
              <Paging defaultPageSize={10} />
              <Pager
                infoText={`Strona {0} z {1} ({2} rekordów)`}
                // showPageSizeSelector={true}
                visible={true}
                allowedPageSizes={10}
                showNavigationButtons={true}
              />
              <Summary recalculateWhileEditing={true}>
                <TotalItem
                  column="Pozycja"
                  summaryType="count"
                  customizeText={summaryPosition}
                />
                <TotalItem
                  column="Ilość"
                  summaryType="sum"
                  customizeText={summaryQuantity}
                />
                <TotalItem
                  column="Waga"
                  summaryType="sum"
                  customizeText={summaryWeight}
                />
              </Summary>
              {/* <Export enabled={true}/> */}
              <Column allowExporting={false} />
            </DataGrid>
          )}
        </div>
        <PopupEdit
          onClick={() => saveEdit()}
          closePopup={closeEdit}
          visible={showPopup}
          onHiding={() => setShowPopup(!showPopup)}
          tpId={tpId}
          tpDcId={tpDcId}
          tpGQnt={tpGQnt}
          tpH={tpH}
          tpIdent={tpIdent}
          tpName={tpName}
          tpPos={tpPos}
          tpQnt={tpQnt}
          tpRQnt={tpRQnt}
          tpShape={tpShape}
          tpSymbol={tpSymbol}
          tpTQnt={tpTQnt}
          tpType={tpType}
          tpW={tpW}
          totalWeight={totalWeight}
          tpMuntins={tpMuntins}
          tpWeight={tpWeight}
          dcNumber={numberOrders}
          dcType={state.data.DC_TYPE}
          dcState={state.data.DC_STATE_TEXT}
          dcRegister={dateRegister}
          onChangeTpId={(v: any) => setTpId(v.value)}
          onChangeTpDcId={(v: any) => setTpDcId(v.value)}
          onChangeTpGQnt={(v: any) => setTpGQnt(v.value)}
          onChangeTpH={(v: any) => setTpH(v.value)}
          onChangeTpIdent={(v: any) => setTpIdent(v.value)}
          onChangeTpName={(v: any) => setTpName(v.value)}
          onChangeTpPos={(v: any) => setTpPos(v.value)}
          onChangeTpQnt={(v: any) => setTpQnt(v.value)}
          onChangeTpRQnt={(v: any) => setTpRQnt(v.value)}
          onChangeTpShape={(v: any) => setTpShape(v.value)}
          onChangeTpSymbol={(v: any) => setTpSymbol(v.value)}
          onChangeTpTQnt={(v: any) => setTpTQnt(v.value)}
          onChangeTpType={(v: any) => setTpType(v.value)}
          onChangeTpW={(v: any) => setTpW(v.value)}
          onChangeTpMuntins={(v: any) => setTpMuntins(v.value)}
          onChangeTpWeight={(v: any) => setTpWeight(v.value)}
          onValueChangedType={(v: any) => setTpType(v.value)}
        />

        <div
          style={{
            width: "95%",
            marginTop: 10,
            paddingBottom: 20,
            marginLeft: 20,
          }}
        >
          {/* {activePage === "Parametry" || activePage === "Załączniki" ? null : ( */}
            <InputEdit
              name={getString("orders", "contact")}
              value={contact}
              onChange={(v: any) => setContact(v.value)}
              width={"50%"}
              marginTop={140}
              disabled={state.data.DC_STATE > 0 ? true : false}
            >
              <Validator>
                <RequiredRule message="Uzupełnij" />
              </Validator>
            </InputEdit>
          {/* )} */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginTop: 20,
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ flexDirection: "row", display: "flex", width: "100%" }}
            >
              <ButtonEdit
                text={getString("buttons", "save")}
                onClick={saveEditingOrder}
                style={{ backgroundColor: "#4CB050", borderColor: "#4CB050" }}
                useSubmitBehavior={true}
                
              />
              {dateDelivery ? (
                <ButtonEdit
                  text={getString("buttons", "export")}
                  style={{
                    marginLeft: 20,
                    backgroundColor: "#3481DD",
                    borderColor: "#3481DD",
                  }}
                  onClick={handleClickDownload}
                />
              ) : null}
              <ButtonEdit
                // onClick={() => setShowPopup(!showPopup)}
                text={getString("buttons", "print")}
                style={{
                  marginLeft: 20,
                  backgroundColor: "#6C4ABF",
                  borderColor: "#6C4ABF",
                }}
              />
              {dateDelivery ? (
                <ButtonEdit
                  text={getString("buttons", "order")}
                  style={{ marginLeft: 20 }}
                />
              ) : null}
            </div>
            <ButtonEdit
              text={getString("buttons", "close")}
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </div>
    </EditLeyout>
  );
};
