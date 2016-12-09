export class Business {
  id: number;
  businessId: number;
  name: string;
  description: string;
  addresses: string;
  businessType: string;
}

export class BusinessType {
  static CLIENT: string = "Client";
  static PLABS: string = "Pivotal-Labs";
  static PIVOTAL: string = "Pivotal";
  static VENDOR: string = "Vendor";
  static INSYS: string = "Insys";
}
