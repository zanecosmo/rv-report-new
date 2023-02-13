import { FormCategory, FormRow } from "./types";
import FS from "fs";
import { CustomerInfo } from "./types";

export const database = {
  grabLineItems: () => FS.readFileSync("./db/line-items.txt").toString(),
  grabCustomerInfo: () => JSON.parse(FS.readFileSync("customer-info.json").toString()),
  updateCustomerInfo: (customerInfo: CustomerInfo) => {
    FS.writeFileSync("customer-info.json", JSON.stringify(customerInfo));
  }
};

export const extractForm = (items: string, formType: string) => {

  const categories: string[] = items.split("\r\n\r\n"); // entire category, including line-items and notes

  const categoriesArray: FormCategory[] = [];
  
  for (let i = 0; i < categories.length; i++) {

    const cat = categories[i];

    if (categories[i].split(" ")[0] === "**" && formType !== "motorhome") continue;

    const lineItems = cat.split("\r\n"); // each line item, inlcuding title (first one) and notes

    if (lineItems.length === 0) continue;

    const category = lineItems.shift()!; // title

    const rows: FormRow[] = [];

    for (let i = 0; i < lineItems.length; i++) { // line-items and notes

      if (lineItems[i].split(" ")[0] === "--") {
        let notes = rows[rows.length - 1].notes;
        rows[rows.length - 1].notes = notes ? notes += ` ${lineItems[i]}` : lineItems[i];
      }

      else {
        rows.push({
          lineItem: lineItems[i],
          pass: false,
          fail: false,
          notes: ""
        });
      };
    };

    categoriesArray.push({
      categoryName: category,
      formRows: rows,
      notes: ""
    });
  };

  return categoriesArray;
};