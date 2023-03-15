import apiConfig from "../config/apiConfig";
import Invoice from "../models/Invoice";
import { plainToClass } from "class-transformer";


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const url = apiConfig.baseUrl;


export default class InvoiceService {
  static async getInvoice (invoiceId: string) {
      console.log("getInvoice received Id: ", invoiceId);
      fetch(`${url}/${invoiceId}/render`, options)
        .then((response) => response.json())
        .then((data) => {
          console.log("getInvoice response: ", data);
          // const invoiceData: Invoice = data;
          // return invoiceData;
          return data;
        })
        .catch((error) => console.log("getInvoice error: ", error));
    };
}