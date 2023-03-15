export type InvoiceModel = {
  createdByUserId:     string;
  dateIssued:          Date;
  invoiceNumber:       number;
  clientDetails:       {
    contactId:   string;
    billingName: string;
    contactName: string;
    phone:       string;
    email:       string;
    address:     string;
  },
  paymentTerms:        {
    name:           string;
    description:    string;
    days:           number;
    paymentDueDate: Date;
    discount:       number;
    penalty:        number;
  }[],
  paymentInstructions: {};
  billingPeriodStart:  Date;
  billingPeriodEnd:    Date;
  lineItems:           {
    id?:         string;
    inventoryId: string;
    name:        string;
    description: string;
    price:       number;
    taxRate:     number;
    metadata:    {};
    quantity:    number;
    total:       number;
    serviceDate: Date;
    tags:        string[];
    taxable?:    boolean;
  }[],
  taxRate:             number;
  totalTax:            number;
  subTotal:            number;
  totalDue:            number;
  paymentDueDate:      Date;
  totalDiscount:       number;
  depositAmount:       number;
  depositDate:         Date;
  parentProjectId:     string;
  recurringFrequency:  string;
  status:              string;
  metadata:            Metadata;
  id:                  string;
  payments:            {
    transactionId: string;
    amount:        number;
    date:          Date;
    metadata:      Metadata;
  }[],
  totalPaid:           number;
  totalOutstanding:    number;
}

export type ClientDetails = {
  contactId:   string;
  billingName: string;
  contactName: string;
  phone:       string;
  email:       string;
  address:     string;
}

export type LineItem = {
  id?:         string;
  inventoryId: string;
  name:        string;
  description: string;
  price:       number;
  taxRate:     number;
  metadata:    Metadata;
  quantity:    number;
  total:       number;
  serviceDate: Date;
  tags:        string[];
  taxable?:    boolean;
}

export type Metadata = {
}

export type PaymentTerm = {
  name:           string;
  description:    string;
  days:           number;
  paymentDueDate: Date;
  discount:       number;
  penalty:        number;
}

export type Payment = {
  transactionId: string;
  amount:        number;
  date:          Date;
  metadata:      Metadata;
}

export default Invoice;