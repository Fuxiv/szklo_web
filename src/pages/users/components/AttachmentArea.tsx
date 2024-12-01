import { Button } from "devextreme-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import { BASE_URL } from "../../../axios/instance";

export const AttachmentArea = ({
  saveEmptyOrder,
  emptyOrder,
}: {
  emptyOrder?: boolean;
  saveEmptyOrder?: any;
}) => {
  const { state } = useLocation();
  let token = localStorage.getItem("token");
  const [status, setStatus] = useState<number>();

  const fileExtensions = [
    ".txt",
    ".csv",
    ".xml",
    ".json",
    ".pdf",
    ".rtf",
    ".html",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".zip",
    ".arj",
    ".rar",
    ".lzh",
    ".dxf",
    ".dwg",
    ".bmp",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ];

  const dropTest = async (e: any) => {
    e.preventDefault();
    console.log(e);
    if (e.dataTransfer.items) {
//      console.log(e.dataTransfer.items[0])
      const file = e.dataTransfer.items[0].getAsFile();
      if (e.dataTransfer.items[0].kind === "file"){
        const res = await fetch(
          `${BASE_URL}order/files/upload/${state.data.DC_ID}`,
          {
            method: "POST",
            body: file,
            //@ts-ignore

            headers: {
              //@ts-ignore
              Authorization: "Bearer " + JSON.parse(token),
              "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE",
              "Content-Type": "multipart/form-data",
              "Content-Disposition": `form-data; name="test"; filename="${file.name}"`,
            },
          },
        );
//       console.log("ressss", res.status);
        setStatus(res.status);
        if (res.status === 201) {
          getListImage();
        }
      }
    }
  }

  const dragOverTest = (e: any) => {
    e.preventDefault();
//    console.log("drag over tested");
  }

  const [file, setFile] = useState<File>();

  const handleFileChange = (e: any) => {
    e.preventDefault();
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log("wysylane pliki" + e.target.files);
    }
  };
  useEffect(() => {
    handleUploadClick();
    // if(status===201){
    //   getListImage();
    // }
  }, [file]);

  useEffect(() => {
    getListImage();
  }, []);

  const [listFiles, setListFiles] = useState([]);
  const getListImage = async () => {
    const res = await axios
      .get(`${BASE_URL}order/files/${state.data.DC_ID}`, {
        //@ts-ignore
        headers: {
          //@ts-ignore
          Authorization: "Bearer " + JSON.parse(token),
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json",
        },
      })
      //@ts-ignore
      .then((res) => {
//        console.log("listfile", res.data.data);
        setListFiles(res.data.data);
      })
      .then((data) => {})
      .catch((err) => console.error(err));
  };

  const handleUploadClick = async () => {
    // getListImage();
    //@ts-ignore
    setFile(null);
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("files", file);
//    console.log('ressss',file)

    const res = await fetch(
      `${BASE_URL}order/files/upload/${state.data.DC_ID}`,
      {
        method: "POST",
        body: file,
        //@ts-ignore

        headers: {
          //@ts-ignore
          Authorization: "Bearer " + JSON.parse(token),
          "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE",
          "Content-Type": "multipart/form-data",
          "Content-Disposition": `form-data; name="test"; filename="${file.name}"`,
        },
      },
    );
//    console.log("ressss", res.status);
    setStatus(res.status);
    if (res.status === 201) {
      getListImage();
    }
  };

  return (
    <div
      style={{
        height: 200,
        width: "90%",
        paddingLeft: 20,
        display: "flex",
        flexDirection: "row",
//        justifyContent:'space-around'
      }}
    >
      <div
          style={{
//            alignSelf: "flex-start", 
//            marginRight: "auto"
          }}
      >
        <p
          style={{
            fontFamily: "Poppins",
            fontSize: 15,
            fontWeight: 800, 
            alignSelf: "flex-start", 
            marginRight: "auto"
          }}
        >
          Lista załączników
        </p>
        <div style={{ marginTop: 10, textAlign: "left",
            fontFamily: "Poppins",
            fontSize: 13
        }}>
          {listFiles
            ? listFiles.map((item: any, index) => {
                return (
                  <p key={index} style={{ color: "white", marginTop: 8 }}>
                    {item.DCF_FILENAME}
                  </p>
                );
              })
            : null}
        </div>
      </div>
      <div
        id="widget-area"
        onDrop={dropTest}
        onDragOver={dragOverTest}
        style={{
          width: "15%",
          borderWidth: 1,
          borderColor: "white",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          marginLeft: 100,
          borderStyle: "dotted",
          borderRadius: 20,
          paddingLeft: 20,
          paddingRight: 20,
          flexDirection: "column",
        }}
      >
        <>
          <label
            htmlFor="filePicker"
            style={{
              background: "white",
              width: 150,
              height: 30,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              borderRadius: 5,
              fontFamily: "Poppins",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Dodaj plik
          </label>
          <input
            type={"file"}
            id="filePicker"
            onChange={handleFileChange}
            style={{ visibility: "hidden" }}
            accept=".txt,
                  .csv,
                  .xml,
                  .json,
                  .pdf,
                  .rtf,
                  .html,
                  .doc,
                  .docx,
                  .xls,
                  .xlsx,
                  .zip,
                  .arj,
                  .rar,
                  .lzh,
                  .dxf,
                  .dwg,
                  .bmp,
                  .jpg,
                  .jpeg,
                  .png,
                  .gif"
          />
        </>

        {/* <div>{file && `${file.name}`}</div>
        {file ? (
          <button
            style={{
              background: "white",
              width: 100,
              height: 30,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              borderRadius: 5,
              fontFamily: "Poppins",
              fontSize: 13,
              borderWidth: 0,
              marginTop: file ? 20 : 0,
              cursor: "pointer",
            }}
            onClick={handleUploadClick}
          >
            Wyślij
          </button>
        ) : null} */}
      </div>
    </div>
  );
};
