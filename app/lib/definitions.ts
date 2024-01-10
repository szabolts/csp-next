export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
};

export type SessionType = {
  user: {
    name: string;
    email: string;
    id: string;
  };
  expires: string;
  userId: string;
};

export type Warehouse = {
  id: string;
  name: string;
  inviteCode: string | null;
  stock: Stock[];
  waste: Waste[];
  cuttingParams: {
    cuttingCost: number;
    kerfWidth: number;
    wasteTreshold: number;
  };
  optSettings: {
    numberOfStocks: number;
    lengthOfStocks: number;
    cuts: number;
    waste: number;
  };
};


export type Stock = {

};

export type Waste = {
  
};