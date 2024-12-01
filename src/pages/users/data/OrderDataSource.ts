import axios from "axios";
import CustomStore from "devextreme/data/custom_store";
import { BASE_URL } from "../../../axios/instance";
import { useOrderFilterStore } from "./OrderStore";

async function getOrders({
  page,
  limit,
  DC_STATE_SYMBOL,
  DC_TYPE,
  DC_YEAR,
}: {
  page: number;
  limit: number;
  DC_STATE_SYMBOL: string[];
  DC_TYPE: string[];
  DC_YEAR: number;
}) {
  // @ts-ignore
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios(`${BASE_URL}orders/${page}/${limit}`, {
    params: {
      page,
      limit,
      DC_STATE_SYMBOL: DC_STATE_SYMBOL.join(","),
      DC_TYPE: DC_TYPE.join(","),
      DC_YEAR,
    },
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  
  return {
    data: res.data.data,
    totalCount: res.data?.meta?.totalCount ?? 1000,
    summary: "",
    groupCount: "",
  };
}

async function removeOrder(orderId: string) {
  // @ts-ignore
  const token = JSON.parse(localStorage.getItem("token"));

  const res = await fetch(`${BASE_URL}order/delete/${orderId}`, {
    method: "POST",
    //@ts-ignore
    headers: {
      //@ts-ignore
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE",
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json);
  }
  return json;
}

function skipIntoPage({ take, skip }: { take?: number; skip?: number }) {
  let page: number;

  if (skip) {
    page = (skip * 2) / (take || 15);
  } else {
    page = 1;
  }
  return {
    page,
    limit: take || 15,
  };
}

export const OrderDataSource = new CustomStore({
  key: "DC_ID",
  load: async (loadOptions) => {
    const { page, limit } = skipIntoPage({
      take: loadOptions.take,
      skip: loadOptions.skip,
    });

    loadOptions.userData["DC_STATE_SYMBOL"] =
      useOrderFilterStore.getState().dcStateSymbols;

    loadOptions.userData["DC_TYPE"] = useOrderFilterStore.getState().dcTypes;

    loadOptions.userData["DC_YEAR"] = useOrderFilterStore.getState().year;
    const data = await getOrders({
      page,
      limit,
      DC_STATE_SYMBOL: loadOptions.userData["DC_STATE_SYMBOL"],
      DC_TYPE: loadOptions.userData["DC_TYPE"],
      DC_YEAR: loadOptions.userData["DC_YEAR"],
    });
    return data;
  },
  remove: async (key) => {},
  onRemoving(key) {
    return removeOrder(key);
  },
});
